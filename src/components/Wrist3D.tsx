import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Outlines, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { MESHES, MOTION, type LayerId, type Motion, type MeshDef } from '../data/model3d'

export type { Motion }
export type ViewKey = 'palmar' | 'dorsal' | 'radial' | 'ulnar' | 'proximal' | 'distal'
export type FrameMode = 'muneca' | 'mano'
export interface Anchor { x: number; y: number; w: number; h: number }
export type LayerState = Record<LayerId, { on: boolean; op: number }>
export const DEFAULT_LAYERS: LayerState = {
  esqueleto: { on: true, op: 1 }, superficies: { on: false, op: 0.9 }, capsula: { on: false, op: 0.6 }, lig_rc: { on: false, op: 0.7 },
  intercarpianos: { on: false, op: 0.7 }, tfcc: { on: false, op: 0.8 }, tendones: { on: false, op: 0.7 }, vasc: { on: false, op: 0.9 }
}

// Mallas: BodyParts3D (DBCLS, CC BY-SA 2.1 JP), mano derecha. 1 u = 1 cm; origen en el centro del hueso grande.
// Ejes: x radial(−)→ulnar(+), y proximal(+), z palmar(+).
const B = import.meta.env.BASE_URL
const URLS = [`${B}models/muneca_bodyparts3d.glb`, `${B}models/mano.glb`, `${B}models/capas.glb`]
const FR = { muneca: { t: new THREE.Vector3(0.6, 0.6, 0), d: 19 }, mano: { t: new THREE.Vector3(0, -5.5, 0), d: 38 } }
const DIRS: Record<ViewKey, [number, number, number]> = { palmar: [0, 0, 1], dorsal: [0, 0, -1], radial: [-1, 0, 0], ulnar: [1, 0, 0], proximal: [0, 1, 0.08], distal: [0, -1, 0.08] }
const CYAN = '#7fe3ff'
const REF = new THREE.Vector3(0.2, 1.0, 0)

function fadeMaterial(color: string, fade: boolean) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.02, transparent: true, side: THREE.DoubleSide })
  if (fade) m.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vPy;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvPy = position.y;')
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vPy;').replace('#include <dithering_fragment>', '#include <dithering_fragment>\ngl_FragColor.a *= 1.0 - smoothstep(5.0, 7.6, vPy);')
  }
  return m
}
type Part = { geo: THREE.BufferGeometry; center: THREE.Vector3; size: THREE.Vector3 }

function Model(p: { selected: string | null; onSelect: (id: string | null) => void; layers: LayerState; showHand: boolean; explode: number; motion: Motion; focus: boolean; onAnchor?: (a: Anchor | null) => void }) {
  const gltfs = useGLTF(URLS) as any[]
  const { camera, size } = useThree()
  const g1 = useRef<THREE.Group>(null), g2 = useRef<THREE.Group>(null), ring = useRef<THREE.Mesh>(null)
  const refs = useRef<Record<string, THREE.Mesh | null>>({})
  const ang = useRef({ r: 0, m: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const last = useRef({ x: -1, y: -1 }), t0 = useRef(0)
  const st = useRef(p); st.current = p; const hov = useRef<string | null>(null); hov.current = hover

  const parts = useMemo(() => {
    const out: Record<string, Part> = {}
    const byNode: Record<string, Part> = {}
    gltfs.forEach((g, i) => g.scene.traverse((o: THREE.Object3D) => {
      const m = o as THREE.Mesh
      if (m.isMesh) { const geo = m.geometry as THREE.BufferGeometry; geo.computeBoundingBox(); const bb = geo.boundingBox!
        byNode[i + ':' + m.name] = { geo, center: bb.getCenter(new THREE.Vector3()), size: bb.getSize(new THREE.Vector3()) } }
    }))
    for (const d of MESHES) { const f = d.file === 'bones' ? 0 : d.file === 'hand' ? 1 : d.file === 'capas' ? 2 : -1; if (f >= 0 && byNode[f + ':' + d.node]) out[d.id] = byNode[f + ':' + d.node] }
    return out
  }, [gltfs])

  const piv = useMemo(() => {
    const lu = parts.semilunar, ca = parts.grande
    const P1 = lu ? lu.center.clone() : new THREE.Vector3(), P2 = ca ? ca.center.clone().add(new THREE.Vector3(0, ca.size.y * 0.25, 0)) : new THREE.Vector3()
    return { P1, P2, rel: P2.clone().sub(P1) }
  }, [parts])

  // Marcador ESQUEMÁTICO del disco articular (no procede de ninguna malla)
  const disc = useMemo(() => {
    const u = parts.ulna, r = parts.radio; if (!u || !r) return null
    const uMin = u.center.y - u.size.y / 2, xr = r.center.x + r.size.x / 2, xu = u.center.x + u.size.x / 2
    return { pos: new THREE.Vector3((xr + xu) / 2, uMin - 0.12, u.center.z + 0.2), rx: Math.max(0.9, (xu - xr) / 2 + 0.3), rz: 0.8 }
  }, [parts])

  const mats = useMemo(() => { const o: Record<string, THREE.MeshStandardMaterial> = {}; MESHES.forEach(d => { o[d.id] = fadeMaterial(d.color, !!d.fade) }); return o }, [])
  const discMat = useMemo(() => new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.6 }), [])
  const baseRay = useMemo(() => THREE.Mesh.prototype.raycast, [])
  useEffect(() => { t0.current = performance.now() }, [p.selected])

  const offOf = (d: MeshDef) => {
    if (!p.explode || d.layer === 'tendones' || d.layer === 'vasc') return new THREE.Vector3()
    const src = parts[d.parent ?? d.id]; if (!src) return new THREE.Vector3()
    const v = src.center.clone().sub(REF); v.y *= 0.5
    return v.normalize().multiplyScalar(p.explode * 2.4)
  }

  useFrame(() => {
    const s = st.current
    const mo = MOTION[s.motion]; const sign = s.motion === 'radial' ? -1 : 1
    const tr = THREE.MathUtils.degToRad(mo.total * mo.rc), tm = THREE.MathUtils.degToRad(mo.total * (1 - mo.rc))
    ang.current.r += (tr - ang.current.r) * 0.1; ang.current.m += (tm - ang.current.m) * 0.1
    if (g1.current && g2.current) {
      if (mo.axis === 'x') { g1.current.rotation.set(-ang.current.r, 0, 0); g2.current.rotation.set(-ang.current.m, 0, 0) }
      else { g1.current.rotation.set(0, 0, sign * ang.current.r); g2.current.rotation.set(0, 0, sign * ang.current.m) }
    }
    // visibilidad / opacidad / realce por capa
    let selMesh: THREE.Mesh | null = null
    for (const d of MESHES) {
      const m = refs.current[d.id]; if (!m) continue
      const L = s.layers[d.layer]; const on = L.on && (!d.hand || s.showHand)
      m.visible = on; if (!on) continue
      const isSel = s.selected === d.sid, mat = mats[d.id]
      let op = L.op
      if (s.selected && s.focus && !isSel) op *= 0.3
      if (isSel) { op = Math.max(op, 0.95); selMesh = m }
      mat.opacity = op; mat.depthWrite = op > 0.9
      m.raycast = op < 0.08 ? () => {} : baseRay
      if (isSel) { mat.color.set('#cfeefa'); mat.emissive.set('#2a8fb4'); mat.emissiveIntensity = 0.6 }
      else { mat.color.set(d.color); const h = hov.current === d.sid; mat.emissive.set(h ? '#4a3d22' : d.layer === 'superficies' ? '#1d6f86' : '#000'); mat.emissiveIntensity = h ? 0.5 : d.layer === 'superficies' ? 0.5 : 0 }
    }
    const dm = refs.current['disco']; if (dm) { const L = s.layers.tfcc; dm.visible = L.on; discMat.opacity = s.selected === 'disco' ? 1 : s.selected && s.focus ? 0.12 : L.op * 0.75; if (s.selected === 'disco') selMesh = dm }
    if (selMesh && ring.current) {
      const box = new THREE.Box3().setFromObject(selMesh); const c = box.getCenter(new THREE.Vector3()), sz = box.getSize(new THREE.Vector3())
      ring.current.visible = true; ring.current.position.copy(c); ring.current.quaternion.copy(camera.quaternion)
      const k = (performance.now() - t0.current) / 900
      ring.current.scale.setScalar(Math.min(6, Math.max(sz.x, sz.y, sz.z)) * (0.7 + Math.min(k, 1) * 0.9))
      ;(ring.current.material as THREE.MeshBasicMaterial).opacity = k < 1 ? 0.9 * (1 - k) : 0
      const v = c.clone().project(camera), x = (v.x * 0.5 + 0.5) * size.width, y = (-v.y * 0.5 + 0.5) * size.height
      if (Math.abs(x - last.current.x) > 1 || Math.abs(y - last.current.y) > 1) { last.current = { x, y }; s.onAnchor?.({ x, y, w: size.width, h: size.height }) }
    } else {
      if (ring.current) ring.current.visible = false
      if (last.current.x !== -1) { last.current = { x: -1, y: -1 }; s.onAnchor?.(null) }
    }
  })

  const mesh = (d: MeshDef, base: THREE.Vector3) => {
    const part = parts[d.id]; if (!part) return null
    const o = offOf(d)
    return (
      <mesh key={d.id} ref={el => { refs.current[d.id] = el }} geometry={part.geo} material={mats[d.id]} position={[o.x - base.x, o.y - base.y, o.z - base.z]}
        onClick={e => { if (e.delta > 6) return; e.stopPropagation(); p.onSelect(d.sid) }}
        onPointerOver={e => { e.stopPropagation(); setHover(d.sid); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(null); document.body.style.cursor = '' }}>
        {p.selected === d.sid && d.layer !== 'tendones' && <Outlines thickness={0.03} color={CYAN} />}
      </mesh>)
  }
  const Z = new THREE.Vector3()
  return (
    <>
      <group>
        {MESHES.filter(d => d.frame === 'fore' || d.frame === 'static').map(d => mesh(d, Z))}
        {disc && (
          <mesh ref={el => { refs.current['disco'] = el }} material={discMat} position={disc.pos} scale={[disc.rx, 0.1, disc.rz]}
            onClick={e => { if (e.delta > 6) return; e.stopPropagation(); p.onSelect('disco') }}
            onPointerOver={e => { e.stopPropagation(); setHover('disco'); document.body.style.cursor = 'pointer' }} onPointerOut={() => { setHover(null); document.body.style.cursor = '' }}>
            <sphereGeometry args={[1, 28, 10]} />
          </mesh>)}
      </group>
      <group ref={g1} position={piv.P1}>
        {MESHES.filter(d => d.frame === 'prox').map(d => mesh(d, piv.P1))}
        <group ref={g2} position={piv.rel}>{MESHES.filter(d => d.frame === 'dist').map(d => mesh(d, piv.P2))}</group>
      </group>
      <mesh ref={ring} visible={false}><ringGeometry args={[0.92, 1, 64]} /><meshBasicMaterial color={CYAN} transparent opacity={0} depthTest={false} side={THREE.DoubleSide} /></mesh>
    </>
  )
}

function CamRig({ view, nonce, frame, ctl, zoomCmd }: { view: ViewKey; nonce: number; frame: FrameMode; ctl: React.RefObject<any>; zoomCmd?: { n: number; f: number } }) {
  const { camera, size } = useThree()
  const asp = size.width / size.height
  const target = useRef<THREE.Vector3 | null>(null)
  const T = FR[frame]
  const dist = T.d * Math.max(1, 1.0 / asp)
  useEffect(() => { ctl.current?.target.copy(T.t); target.current = new THREE.Vector3(...DIRS[view]).normalize().multiplyScalar(dist).add(T.t) }, [view, nonce, dist, frame])
  useEffect(() => {
    if (!zoomCmd || !zoomCmd.n) return
    const rel = camera.position.clone().sub(T.t).multiplyScalar(zoomCmd.f); const l = rel.length()
    if (l > 4 && l < 60) { camera.position.copy(rel.add(T.t)); ctl.current?.update() }
  }, [zoomCmd?.n])
  useFrame(() => {
    if (!target.current) return
    camera.position.lerp(target.current, 0.12); camera.lookAt(T.t); ctl.current?.update()
    if (camera.position.distanceTo(target.current) < 0.02) target.current = null
  })
  return null
}

export function Loader() {
  const { active, progress } = useProgress()
  if (!active) return null
  return <div className="loader">Cargando modelo anatómico · {Math.round(progress)} %</div>
}

export default function Wrist3D(props: {
  selected: string | null; onSelect: (id: string | null) => void; layers?: LayerState; showHand?: boolean; explode?: number; motion?: Motion
  focus?: boolean; view: ViewKey; nonce: number; frame?: FrameMode; autoRotate?: boolean; zoom?: boolean
  zoomCmd?: { n: number; f: number }; onAnchor?: (a: Anchor | null) => void
}) {
  const ctl = useRef<any>(null)
  return (
    <>
      <Canvas camera={{ position: [0.6, 1, 17], fov: 36, near: 0.5, far: 150 }} dpr={[1, 2]} onPointerMissed={() => props.onSelect(null)} style={{ touchAction: 'none' }}>
        <color attach="background" args={['#06101b']} />
        <hemisphereLight args={['#a9d3ea', '#1a1410', 0.85]} />
        <directionalLight position={[5, 8, 9]} intensity={2.1} color="#fff1d6" />
        <directionalLight position={[-7, 3, -6]} intensity={1.3} color="#5fb8d8" />
        <directionalLight position={[0, -6, 5]} intensity={0.5} color="#c5a774" />
        <Suspense fallback={null}>
          <Model selected={props.selected} onSelect={props.onSelect} layers={props.layers ?? DEFAULT_LAYERS} showHand={props.showHand ?? true}
            explode={props.explode ?? 0} motion={props.motion ?? 'neutro'} focus={props.focus ?? false} onAnchor={props.onAnchor} />
        </Suspense>
        <OrbitControls ref={ctl} enablePan={false} enableZoom={props.zoom ?? true} autoRotate={props.autoRotate} autoRotateSpeed={0.6}
          enableDamping dampingFactor={0.1} minDistance={4} maxDistance={60} target={FR.muneca.t.toArray()} />
        <CamRig view={props.view} nonce={props.nonce} frame={props.frame ?? 'muneca'} ctl={ctl} zoomCmd={props.zoomCmd} />
      </Canvas>
      <Loader />
    </>
  )
}
useGLTF.preload(URLS)
