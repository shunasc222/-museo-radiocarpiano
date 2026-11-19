import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Outlines, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'

export type ViewKey = 'palmar' | 'dorsal' | 'radial' | 'ulnar' | 'proximal' | 'distal'
export type Motion = 'neutro' | 'flexion' | 'extension' | 'radial' | 'ulnar'
export interface Anchor { x: number; y: number; w: number; h: number }

// Malla: BodyParts3D (DBCLS), CC BY-SA 2.1 JP — huesos derechos radio, ulna y 8 carpianos,
// recortados (~7,5 cm proximales de radio y ulna), subdivididos y suavizados. Escala 1 u = 1 cm.
const URL_GLB = `${import.meta.env.BASE_URL}models/muneca_bodyparts3d.glb`
const TARGET = new THREE.Vector3(0.6, 2.6, 0)
const DIRS: Record<ViewKey, [number, number, number]> = {
  palmar: [0, 0, 1], dorsal: [0, 0, -1], radial: [-1, 0, 0], ulnar: [1, 0, 0], proximal: [0, 1, 0.08], distal: [0, -1, 0.08]
}
const DIST = 15
const HAND = ['escafoides', 'semilunar', 'piramidal', 'pisiforme', 'trapecio', 'trapezoide', 'grande', 'ganchoso']
const FORE = ['radio', 'ulna']
const ALL = [...FORE, ...HAND]
const CYAN = '#7fe3ff'

function fadeMaterial(color: string) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.02, transparent: true, side: THREE.DoubleSide })
  m.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vPy;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvPy = position.y;')
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vPy;').replace('#include <dithering_fragment>', '#include <dithering_fragment>\ngl_FragColor.a *= 1.0 - smoothstep(5.0, 7.6, vPy);')
  }
  return m
}

function Model(p: { selected: string | null; onSelect: (id: string | null) => void; explode: number; motion: Motion; focus: boolean; onAnchor?: (a: Anchor | null) => void }) {
  const gltf = useGLTF(URL_GLB)
  const { camera, size } = useThree()
  const hand = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  const ang = useRef({ x: 0, z: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const last = useRef({ x: -1, y: -1 })
  const t0 = useRef(0)

  const parts = useMemo(() => {
    const out: Record<string, { geo: THREE.BufferGeometry; center: THREE.Vector3; size: THREE.Vector3 }> = {}
    gltf.scene.traverse(o => {
      const m = o as THREE.Mesh
      if (m.isMesh && ALL.includes(m.name)) {
        const g = m.geometry as THREE.BufferGeometry
        g.computeBoundingBox()
        const bb = g.boundingBox!
        out[m.name] = { geo: g, center: bb.getCenter(new THREE.Vector3()), size: bb.getSize(new THREE.Vector3()) }
      }
    })
    return out
  }, [gltf])

  // Disco articular: figura ESQUEMÁTICA (no procede de la malla) situada entre la cabeza ulnar y el carpo.
  const disc = useMemo(() => {
    const u = parts.ulna, r = parts.radio
    if (!u || !r) return null
    const uMin = u.center.y - u.size.y / 2
    const xr = r.center.x + r.size.x / 2
    const xu = u.center.x + u.size.x / 2
    const cx = (xr + xu) / 2
    return { pos: new THREE.Vector3(cx, uMin - 0.12, u.center.z + 0.2), rx: Math.max(0.9, (xu - xr) / 2 + 0.3), rz: 0.8 }
  }, [parts])

  const mats = useMemo(() => {
    const bone = fadeMaterial('#e7dcc4'), dim = fadeMaterial('#5d7183'), sel = fadeMaterial('#cfeefa'), hov = fadeMaterial('#efe3c5')
    sel.emissive = new THREE.Color('#2a8fb4'); sel.emissiveIntensity = 0.55
    hov.emissive = new THREE.Color('#4a3d22'); hov.emissiveIntensity = 0.5
    dim.opacity = 0.55
    return { bone, dim, sel, hov }
  }, [])

  useEffect(() => { t0.current = performance.now() }, [p.selected])

  useFrame(() => {
    const tx = p.motion === 'flexion' ? 0.9 : p.motion === 'extension' ? -0.8 : 0
    const tz = p.motion === 'radial' ? 0.3 : p.motion === 'ulnar' ? -0.55 : 0
    ang.current.x += (tx - ang.current.x) * 0.1
    ang.current.z += (tz - ang.current.z) * 0.1
    // Rotación didáctica alrededor de la cabeza del hueso grande (origen del modelo).
    if (hand.current) hand.current.rotation.set(-ang.current.x, 0, -ang.current.z)
    // Ring de "análisis" y anclaje 2D para la ficha flotante
    const s = p.selected && parts[p.selected]
    if (s && ring.current) {
      const c = s.center.clone()
      if (HAND.includes(p.selected!) && hand.current) { c.applyEuler(hand.current.rotation) }
      const off = explodeOffset(p.selected!, parts, p.explode)
      c.add(off)
      ring.current.visible = true
      ring.current.position.copy(c)
      ring.current.quaternion.copy(camera.quaternion)
      const k = ((performance.now() - t0.current) / 900)
      const sc = Math.max(s.size.x, s.size.y, s.size.z) * (0.7 + Math.min(k, 1) * 0.9)
      ring.current.scale.setScalar(sc)
      const mat = ring.current.material as THREE.MeshBasicMaterial
      mat.opacity = k < 1 ? 0.9 * (1 - k) : 0
      const v = c.clone().project(camera)
      const x = (v.x * 0.5 + 0.5) * size.width, y = (-v.y * 0.5 + 0.5) * size.height
      if (Math.abs(x - last.current.x) > 1 || Math.abs(y - last.current.y) > 1) {
        last.current = { x, y }
        p.onAnchor?.({ x, y, w: size.width, h: size.height })
      }
    } else if (ring.current) {
      ring.current.visible = false
      if (last.current.x !== -1) { last.current = { x: -1, y: -1 }; p.onAnchor?.(null) }
    }
  })

  const matFor = (id: string) => p.selected === id ? mats.sel : p.focus && p.selected ? mats.dim : hover === id ? mats.hov : mats.bone
  const mesh = (id: string) => {
    const part = parts[id]; if (!part) return null
    const off = explodeOffset(id, parts, p.explode)
    return (
      <mesh key={id} geometry={part.geo} material={matFor(id)} position={off}
        onClick={e => { if (e.delta > 6) return; e.stopPropagation(); p.onSelect(id) }}
        onPointerOver={e => { e.stopPropagation(); setHover(id); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(null); document.body.style.cursor = '' }}>
        {p.selected === id && <Outlines thickness={0.035} color={CYAN} />}
      </mesh>)
  }
  const discSel = p.selected === 'disco'
  return (
    <>
      <group>{FORE.map(mesh)}
        {disc && (
          <mesh position={disc.pos.clone().add(new THREE.Vector3(0, -p.explode * 0.5, 0))} scale={[disc.rx, 0.07, disc.rz]}
            onClick={e => { if (e.delta > 6) return; e.stopPropagation(); p.onSelect('disco') }}
            onPointerOver={e => { e.stopPropagation(); setHover('disco'); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { setHover(null); document.body.style.cursor = '' }}>
            <sphereGeometry args={[1, 32, 12]} />
            <meshStandardMaterial color={discSel ? CYAN : '#4aa3b8'} transparent opacity={p.focus && p.selected && !discSel ? 0.15 : 0.55} emissive={discSel ? '#2a8fb4' : '#0c3a4a'} />
            {discSel && <Outlines thickness={0.04} color={CYAN} />}
          </mesh>)}
      </group>
      <group ref={hand}>{HAND.map(mesh)}</group>
      <mesh ref={ring} visible={false}><ringGeometry args={[0.92, 1, 64]} /><meshBasicMaterial color={CYAN} transparent opacity={0} depthTest={false} side={THREE.DoubleSide} /></mesh>
    </>
  )
}

function explodeOffset(id: string, parts: Record<string, { center: THREE.Vector3 }>, k: number) {
  const c = parts[id].center
  const d = c.clone().sub(new THREE.Vector3(0.2, 1.8, 0)); d.y *= 0.4
  return d.normalize().multiplyScalar(k * 2.2)
}

function CamRig({ view, nonce, ctl, zoomCmd }: { view: ViewKey; nonce: number; ctl: React.RefObject<any>; zoomCmd?: { n: number; f: number } }) {
  const { camera, size } = useThree()
  const dist = DIST * Math.max(1, 1.0 / (size.width / size.height))
  const target = useRef<THREE.Vector3 | null>(null)
  useEffect(() => { target.current = new THREE.Vector3(...DIRS[view]).normalize().multiplyScalar(dist).add(TARGET) }, [view, nonce, dist])
  useEffect(() => {
    if (!zoomCmd || !zoomCmd.n) return
    const rel = camera.position.clone().sub(TARGET).multiplyScalar(zoomCmd.f)
    const l = rel.length(); if (l > 4 && l < 28) { camera.position.copy(rel.add(TARGET)); ctl.current?.update() }
  }, [zoomCmd?.n])
  useFrame(() => {
    if (!target.current) return
    camera.position.lerp(target.current, 0.12)
    camera.lookAt(TARGET)
    ctl.current?.update()
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
  selected: string | null; onSelect: (id: string | null) => void; explode?: number; motion?: Motion
  focus?: boolean; view: ViewKey; nonce: number; resetKey?: number; autoRotate?: boolean; zoom?: boolean
  zoomCmd?: { n: number; f: number }; onAnchor?: (a: Anchor | null) => void
}) {
  const ctl = useRef<any>(null)
  return (
    <>
      <Canvas camera={{ position: [0, 2.6, DIST + 2.6], fov: 36, near: 0.5, far: 80 }} dpr={[1, 2]} onPointerMissed={() => props.onSelect(null)} style={{ touchAction: 'none' }}>
        <color attach="background" args={['#06101b']} />
        <hemisphereLight args={['#a9d3ea', '#1a1410', 0.8]} />
        <directionalLight position={[5, 8, 9]} intensity={2.1} color="#fff1d6" />
        <directionalLight position={[-7, 3, -6]} intensity={1.3} color="#5fb8d8" />
        <directionalLight position={[0, -6, 5]} intensity={0.5} color="#c5a774" />
        <Suspense fallback={null}>
          <Model selected={props.selected} onSelect={props.onSelect} explode={props.explode ?? 0} motion={props.motion ?? 'neutro'}
            focus={props.focus ?? false} onAnchor={props.onAnchor} />
        </Suspense>
        <OrbitControls ref={ctl} enablePan={false} enableZoom={props.zoom ?? true} autoRotate={props.autoRotate} autoRotateSpeed={0.6}
          enableDamping dampingFactor={0.1} minDistance={5} maxDistance={26} target={TARGET.toArray()} />
        <CamRig view={props.view} nonce={props.nonce + (props.resetKey ?? 0)} ctl={ctl} zoomCmd={props.zoomCmd} />
      </Canvas>
      <Loader />
    </>
  )
}
useGLTF.preload(URL_GLB)
