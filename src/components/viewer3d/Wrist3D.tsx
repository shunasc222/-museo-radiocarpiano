import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { BONE3D_NAME, type Bone3DId } from '../../data/bones3d'

import type { ViewName } from './webgl'

const VIEWS: Record<ViewName, [number, number, number]> = {
  inicial: [9, 5, 26],
  palmar: [0, 1.5, 27],
  dorsal: [0, 1.5, -27],
  radial: [-27, 1.5, 0],
  ulnar: [27, 1.5, 0],
}
const TARGET = new THREE.Vector3(-0.3, 0.6, 0)

const COLORS: Record<Bone3DId, string> = {
  radio: '#efe8da', ulna: '#efe8da', disco: '#b7cadb', escafoides: '#f2d6df', semilunar: '#ddd1ea', piramidal: '#cfdeea', pisiforme: '#efe6d0',
  trapecio: '#e6e1d4', trapezoide: '#e6e1d4', hueso_grande: '#e6e1d4', ganchoso: '#e6e1d4',
}

/** Desplazamiento (modo «separar») de cada hueso respecto de su posición anatómica. */
const EXPLODE: Record<Bone3DId, [number, number, number]> = {
  radio: [-1.2, 1.2, 0], ulna: [1.2, 1.2, 0], disco: [0.6, 0.8, 0],
  escafoides: [-1.4, -0.3, 0.8], semilunar: [-0.2, -0.5, 0.0], piramidal: [1.2, -0.3, -0.4], pisiforme: [1.4, -0.8, 1.6],
  trapecio: [-1.6, -1.6, 0.6], trapezoide: [-0.8, -1.8, 0], hueso_grande: [-0.1, -2.0, 0], ganchoso: [1.0, -1.8, 0.3],
}

interface BoneProps { id: Bone3DId; selected: Bone3DId | null; visible: boolean; dim: boolean; surfaces: boolean; explode: number; onPick: (id: Bone3DId) => void; labels: boolean }

function Bone({ id, selected, visible, dim, surfaces, explode, onPick, labels, children, center }: BoneProps & { children: React.ReactNode; center: [number, number, number] }) {
  const g = useRef<THREE.Group>(null)
  const isSel = selected === id
  const [ex, ey, ez] = EXPLODE[id]
  useFrame(() => {
    if (!g.current) return
    const k = 0.18
    g.current.position.x += (ex * explode - g.current.position.x) * k
    g.current.position.y += (ey * explode - g.current.position.y) * k
    g.current.position.z += (ez * explode - g.current.position.z) * k
  })
  const opacity = !visible ? 0 : dim && !isSel ? 0.22 : id === 'disco' ? 0.8 : 1
  const emissive = isSel ? '#7a64a3' : surfaces && (id === 'escafoides' || id === 'semilunar' || id === 'piramidal') ? '#4f7391' : surfaces && id === 'disco' ? '#a8587a' : '#000000'
  const emissiveIntensity = isSel ? 0.55 : surfaces && emissive !== '#000000' ? 0.45 : 0
  return (
    <group
      ref={g} visible={visible}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); if (visible) onPick(id) }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      <BoneMaterialContext.Provider value={{ color: COLORS[id], opacity, emissive, emissiveIntensity }}>{children}</BoneMaterialContext.Provider>
      {labels && visible && <LabelSprite text={BONE3D_NAME[id]} position={center} active={isSel} />}
    </group>
  )
}

function LabelSprite({ text, position, active }: { text: string; position: [number, number, number]; active: boolean }) {
  const { texture, aspect } = useMemo(() => {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')!
    const font = '600 40px system-ui, sans-serif'
    ctx.font = font
    const w = Math.ceil(ctx.measureText(text).width) + 40
    c.width = w; c.height = 68
    ctx.font = font
    ctx.fillStyle = active ? '#536b5a' : 'rgba(255,255,255,0.94)'
    ctx.strokeStyle = '#a9b89a'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.roundRect(2, 2, w - 4, 64, 32); ctx.fill(); ctx.stroke()
    ctx.fillStyle = active ? '#ffffff' : '#303542'
    ctx.textBaseline = 'middle'; ctx.fillText(text, 20, 36)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return { texture: t, aspect: w / 68 }
  }, [text, active])
  useEffect(() => () => texture.dispose(), [texture])
  return (
    <sprite position={position} scale={[aspect * 0.55, 0.55, 1]} renderOrder={10}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  )
}

const BoneMaterialContext = createContext({ color: '#fff', opacity: 1, emissive: '#000', emissiveIntensity: 0 })

function Mat({ extra }: { extra?: Partial<{ color: string; opacity: number }> }) {
  const m = useContext(BoneMaterialContext)
  const opacity = extra?.opacity ?? m.opacity
  return <meshStandardMaterial color={extra?.color ?? m.color} roughness={0.55} metalness={0.02} transparent={opacity < 1} opacity={opacity} emissive={m.emissive} emissiveIntensity={m.emissiveIntensity} depthWrite={opacity >= 0.9} />
}

type V3 = [number, number, number]
function Ell({ p, s, r = [0, 0, 0] }: { p: V3; s: V3; r?: V3 }) {
  return <mesh position={p} scale={s} rotation={r}><sphereGeometry args={[1, 36, 28]} /><Mat /></mesh>
}

function Cyl({ p, rt, rb, h, s = [1, 1, 1], r = [0, 0, 0], seg = 32 }: { p: V3; rt: number; rb: number; h: number; s?: V3; r?: V3; seg?: number }) {
  return <mesh position={p} scale={s} rotation={r}><cylinderGeometry args={[rt, rb, h, seg]} /><Mat /></mesh>
}

function Scene(props: {
  selected: Bone3DId | null; visibility: Record<Bone3DId, boolean>; dim: boolean; surfaces: boolean; explode: number; labels: boolean
  onPick: (id: Bone3DId) => void; view: { name: ViewName; nonce: number }
}) {
  const { selected, visibility, dim, surfaces, explode, labels, onPick } = props
  const common = (id: Bone3DId) => ({ id, selected, visible: visibility[id], dim: dim && selected !== null, surfaces, explode, onPick, labels })

  return (
    <>
      <CameraRig view={props.view} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#ffffff', '#c7b5da', 0.5]} />
      <directionalLight position={[6, 10, 12]} intensity={1.6} />
      <directionalLight position={[-8, -4, -10]} intensity={0.6} />

      {/* Radio distal (centro del conjunto en x ≈ −1,6) */}
      <Bone {...common('radio')} center={[-3.9, 2.5, 0]}>
        <Cyl p={[-1.6, 3.9, 0]} rt={0.6} rb={0.8} h={4} s={[1.15, 1, 0.85]} />
        <Cyl p={[-1.6, 0.95, 0]} rt={0.8} rb={1.5} h={2.1} s={[1, 1, 0.64]} />
        <mesh position={[-2.75, -0.4, 0]} rotation={[Math.PI, 0, 0.12]}><coneGeometry args={[0.55, 1.1, 24]} /><Mat /></mesh>
        <Ell p={[-1.7, 1.0, -0.95]} s={[0.22, 0.4, 0.2]} />
        {/* fositas articulares (cartílago) */}
        <mesh position={[-2.25, -0.13, 0]} rotation={[0, 0, -0.18]} scale={[0.72, 0.05, 0.55]}><cylinderGeometry args={[1, 1, 1, 32]} /><Mat extra={{ color: surfaces ? '#e7a7bf' : '#cfe0d8' }} /></mesh>
        <mesh position={[-0.85, -0.1, 0]} rotation={[0, 0, -0.1]} scale={[0.68, 0.05, 0.55]}><cylinderGeometry args={[1, 1, 1, 32]} /><Mat extra={{ color: surfaces ? '#e7a7bf' : '#cfe0d8' }} /></mesh>
      </Bone>

      {/* Ulna distal */}
      <Bone {...common('ulna')} center={[2.7, 2.6, 0]}>
        <Cyl p={[0.95, 3.4, 0]} rt={0.45} rb={0.55} h={4.6} />
        <Ell p={[0.8, 0.85, 0]} s={[0.9, 0.78, 0.9]} />
        <mesh position={[1.45, -0.05, -0.35]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.28, 0.75, 20]} /><Mat /></mesh>
      </Bone>

      {/* Disco articular */}
      <Bone {...common('disco')} center={[0.8, -0.2, 1.2]}>
        <Cyl p={[0.8, -0.02, 0]} rt={1} rb={1} h={0.24} s={[0.98, 1, 0.78]} />
      </Bone>

      {/* Fila proximal */}
      <Bone {...common('escafoides')} center={[-2.7, -1.5, 1.0]}>
        <Ell p={[-2.05, -1.45, 0.15]} s={[0.55, 1.3, 0.55]} r={[-0.45, 0, -0.75]} />
      </Bone>
      <Bone {...common('semilunar')} center={[-0.55, -1.0, 1.0]}>
        <Ell p={[-0.55, -1.0, 0]} s={[0.8, 0.75, 0.68]} />
      </Bone>
      <Bone {...common('piramidal')} center={[1.0, -1.3, -0.9]}>
        <Ell p={[0.95, -1.35, -0.1]} s={[0.78, 0.7, 0.66]} />
      </Bone>
      <Bone {...common('pisiforme')} center={[1.5, -1.85, 1.4]}>
        <Ell p={[1.4, -1.85, 0.85]} s={[0.42, 0.42, 0.42]} />
      </Bone>

      {/* Fila distal */}
      <Bone {...common('trapecio')} center={[-3.3, -3.4, 1.1]}>
        <Ell p={[-3.15, -3.35, 0.35]} s={[0.75, 0.65, 0.7]} />
      </Bone>
      <Bone {...common('trapezoide')} center={[-1.95, -3.05, 0.9]}>
        <Ell p={[-1.95, -3.05, 0]} s={[0.55, 0.6, 0.6]} />
      </Bone>
      <Bone {...common('hueso_grande')} center={[-0.55, -2.85, 0.9]}>
        <Ell p={[-0.55, -2.85, 0]} s={[0.65, 0.95, 0.6]} />
      </Bone>
      <Bone {...common('ganchoso')} center={[1.1, -3.1, 1.2]}>
        <Ell p={[1.05, -3.0, 0.05]} s={[0.8, 0.8, 0.65]} />
        <mesh position={[1.0, -3.3, 0.75]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.22, 0.6, 16]} /><Mat /></mesh>
      </Bone>
    </>
  )
}

/** Gira la cámara alrededor del modelo hacia la vista pedida (esférica) y luego deja el control al usuario. */
function CameraRig({ view }: { view: { name: ViewName; nonce: number } }) {
  const { camera, controls } = useThree()
  const goal = useRef<THREE.Vector3 | null>(null)
  useEffect(() => {
    const [x, y, z] = VIEWS[view.name]
    goal.current = new THREE.Vector3(x, y, z).sub(TARGET)
  }, [view.nonce, view.name])
  useFrame((_, dt) => {
    const g = goal.current
    if (!g) return
    const f = 1 - Math.exp(-dt * 7)
    const o = camera.position.clone().sub(TARGET)
    const r = o.length()
    const rg = g.length()
    const q = new THREE.Quaternion().setFromUnitVectors(o.clone().normalize(), g.clone().normalize())
    const step = new THREE.Quaternion().slerp(q, f)
    o.applyQuaternion(step).setLength(r + (rg - r) * f)
    camera.position.copy(TARGET).add(o)
    camera.lookAt(TARGET)
    const c = controls as unknown as { target?: THREE.Vector3; update?: () => void } | null
    if (c?.target) { c.target.copy(TARGET); c.update?.() }
    if (q.angleTo(new THREE.Quaternion()) < 0.004 && Math.abs(rg - r) < 0.05) { camera.position.copy(TARGET).add(g); camera.lookAt(TARGET); goal.current = null }
  })
  return null
}

export default function Wrist3D(props: {
  selected: Bone3DId | null; visibility: Record<Bone3DId, boolean>; dim: boolean; surfaces: boolean; explode: number; labels: boolean
  onPick: (id: Bone3DId | null) => void; view: { name: ViewName; nonce: number }
}) {
  const initial = useMemo(() => VIEWS.inicial, [])
  return (
    <Canvas
      camera={{ position: initial, fov: 32, near: 0.1, far: 100 }}
      dpr={[1, 2]} gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'none' }}
      onPointerMissed={() => props.onPick(null)}
      aria-label="Modelo 3D geométrico simplificado de la región radiocarpiana"
    >
      <Scene {...props} onPick={props.onPick} />
      <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.12} minDistance={12} maxDistance={48} target={[TARGET.x, TARGET.y, TARGET.z]} rotateSpeed={0.9} />
    </Canvas>
  )
}
