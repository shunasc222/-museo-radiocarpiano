import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type ViewKey = 'palmar' | 'dorsal' | 'radial' | 'ulnar' | 'proximal' | 'distal'
export const VIEW_POS: Record<ViewKey, [number, number, number]> = {
  palmar: [0, -0.6, 15], dorsal: [0, -0.6, -15], radial: [-15, -0.6, 0.01], ulnar: [15, -0.6, 0.01],
  proximal: [0.01, 16, 1], distal: [0.01, -16, 1]
}
export type Motion = 'neutro' | 'flexion' | 'extension' | 'radial' | 'ulnar'

interface Part { mesh: string; pos: [number, number, number]; r: [number, number, number]; rot?: [number, number, number]; seed: number; group: 'fore' | 'hand'; sel?: boolean }

// Geometría DIDÁCTICA: elipsoides deformadas ubicadas con relaciones espaciales
// aproximadas. No es una reconstrucción anatómica exacta ni procede de una malla escaneada.
const PARTS: Part[] = [
  { mesh: 'radio', pos: [-0.95, 2.2, 0], r: [0.55, 1.9, 0.42], seed: 1, group: 'fore' },
  { mesh: 'radio', pos: [-0.95, 0.35, 0], r: [1.05, 0.55, 0.62], seed: 2, group: 'fore' },
  { mesh: 'radio', pos: [-1.75, 0.0, 0], r: [0.28, 0.42, 0.28], rot: [0, 0, 0.35], seed: 3, group: 'fore' },
  { mesh: 'radio', pos: [-0.95, 0.5, -0.58], r: [0.16, 0.3, 0.16], seed: 4, group: 'fore' },
  { mesh: 'ulna', pos: [1.0, 2.4, -0.05], r: [0.38, 2.0, 0.38], seed: 5, group: 'fore' },
  { mesh: 'ulna', pos: [1.0, 0.7, -0.05], r: [0.5, 0.42, 0.5], seed: 6, group: 'fore' },
  { mesh: 'ulna', pos: [1.45, 0.42, -0.15], r: [0.17, 0.3, 0.17], rot: [0, 0, -0.25], seed: 7, group: 'fore' },
  { mesh: 'disco', pos: [0.72, 0.13, 0], r: [0.7, 0.07, 0.55], seed: 8, group: 'fore' },
  { mesh: 'escafoides', pos: [-1.0, -0.62, 0.22], r: [0.64, 0.34, 0.36], rot: [0, 0, 0.6], seed: 9, group: 'hand' },
  { mesh: 'semilunar', pos: [-0.05, -0.62, 0], r: [0.5, 0.4, 0.4], seed: 10, group: 'hand' },
  { mesh: 'piramidal', pos: [0.92, -0.72, -0.05], r: [0.45, 0.38, 0.38], seed: 11, group: 'hand' },
  { mesh: 'pisiforme', pos: [1.18, -0.9, 0.5], r: [0.22, 0.22, 0.22], seed: 12, group: 'hand' },
  { mesh: 'trapecio', pos: [-1.6, -1.72, 0.2], r: [0.42, 0.42, 0.42], seed: 13, group: 'hand' },
  { mesh: 'trapezoide', pos: [-0.9, -1.85, 0], r: [0.32, 0.36, 0.33], seed: 14, group: 'hand' },
  { mesh: 'grande', pos: [-0.05, -1.68, 0], r: [0.42, 0.64, 0.42], seed: 15, group: 'hand' },
  { mesh: 'ganchoso', pos: [0.92, -1.82, 0], r: [0.45, 0.45, 0.4], seed: 16, group: 'hand' },
  { mesh: 'ganchoso', pos: [0.92, -1.9, 0.45], r: [0.12, 0.22, 0.14], seed: 17, group: 'hand' },
  ...[-1.95, -0.95, -0.05, 0.9, 1.6].map((x, i): Part => ({ mesh: 'meta' + i, pos: [x, -3.6, 0], r: [0.24, 1.2, 0.24], seed: 20 + i, group: 'hand', sel: false }))
]

const CENTER = new THREE.Vector3(0, -0.8, 0)
const PIVOT = new THREE.Vector3(-0.05, -1.3, 0)

function blob(r: [number, number, number], seed: number) {
  const g = new THREE.IcosahedronGeometry(1, 4)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    const n = Math.sin(v.x * 3.1 + seed) * Math.cos(v.y * 2.7 + seed * 1.3) * Math.sin(v.z * 3.3 + seed * 0.7)
    const k = 1 + 0.07 * n
    p.setXYZ(i, v.x * r[0] * k, v.y * r[1] * k, v.z * r[2] * k)
  }
  g.computeVertexNormals()
  return g
}

function CamRig({ view, nonce, ctl }: { view: ViewKey; nonce: number; ctl: React.RefObject<any> }) {
  const { camera } = useThree()
  const target = useRef<THREE.Vector3 | null>(null)
  useEffect(() => { target.current = new THREE.Vector3(...VIEW_POS[view]) }, [view, nonce])
  useFrame(() => {
    if (!target.current) return
    camera.position.lerp(target.current, 0.12)
    camera.lookAt(0, -0.8, 0)
    ctl.current?.update()
    if (camera.position.distanceTo(target.current) < 0.02) target.current = null
  })
  return null
}

function Scene({ selected, onSelect, explode, motion, focus, hover, setHover }: {
  selected: string | null; onSelect: (id: string | null) => void; explode: number; motion: Motion; focus: boolean
  hover: string | null; setHover: (h: string | null) => void
}) {
  const geoms = useMemo(() => PARTS.map(p => blob(p.r, p.seed)), [])
  const hand = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const ang = useRef({ x: 0, z: 0 })
  useFrame(() => {
    const tx = motion === 'flexion' ? 0.9 : motion === 'extension' ? -0.8 : 0
    const tz = motion === 'radial' ? 0.3 : motion === 'ulnar' ? -0.55 : 0
    ang.current.x += (tx - ang.current.x) * 0.1
    ang.current.z += (tz - ang.current.z) * 0.1
    if (hand.current) {
      // Rotación alrededor de la cabeza del hueso grande (eje didáctico de la mediocarpiana).
      hand.current.position.copy(PIVOT)
      hand.current.rotation.set(ang.current.x, 0, ang.current.z)
      hand.current.position.set(PIVOT.x, PIVOT.y, PIVOT.z)
    }
    PARTS.forEach((p, i) => {
      const m = refs.current[i]; if (!m) return
      const base = new THREE.Vector3(...p.pos)
      const dir = base.clone().sub(CENTER).normalize()
      const off = dir.multiplyScalar(explode * 1.4)
      const local = p.group === 'hand' ? base.clone().sub(PIVOT) : base.clone()
      m.position.copy(local.add(p.group === 'hand' ? off : off))
    })
  })
  const color = (p: Part) => (p.sel === false ? '#6f7a86' : p.mesh === 'disco' ? '#6fb3c0' : '#e6dcc3')
  const mk = (g: 'fore' | 'hand') => PARTS.map((p, i) => p.group !== g ? null : (
    <mesh key={i} ref={el => { refs.current[i] = el }} geometry={geoms[i]} rotation={p.rot}
      onClick={e => { if (p.sel === false) return; if (e.delta > 6) return; e.stopPropagation(); onSelect(p.mesh) }}
      onPointerOver={e => { if (p.sel === false) return; e.stopPropagation(); setHover(p.mesh); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHover(null); document.body.style.cursor = '' }}>
      <meshStandardMaterial color={selected === p.mesh ? '#e4c27c' : color(p)} roughness={0.55} metalness={0.05}
        emissive={selected === p.mesh ? '#c5a774' : hover === p.mesh ? '#4a3d22' : '#000'} emissiveIntensity={selected === p.mesh ? 0.55 : 0.5}
        transparent opacity={p.sel === false ? 0.35 : focus && selected && selected !== p.mesh ? 0.3 : p.mesh === 'disco' ? 0.8 : 1} />
    </mesh>))
  return (
    <>
      <group>{mk('fore')}</group>
      <group ref={hand}>{mk('hand')}</group>
    </>
  )
}

export default function Wrist3D(props: {
  selected: string | null; onSelect: (id: string | null) => void; explode?: number; motion?: Motion
  focus?: boolean; view: ViewKey; nonce: number; resetKey?: number; autoRotate?: boolean; zoom?: boolean
}) {
  const ctl = useRef<any>(null)
  const [hover, setHover] = useState<string | null>(null)
  return (
    <Canvas camera={{ position: VIEW_POS.palmar, fov: 38 }} dpr={[1, 2]} onPointerMissed={() => props.onSelect(null)}
      style={{ touchAction: 'none' }}>
      <color attach="background" args={['#07111d']} />
      <hemisphereLight args={['#bcd6e8', '#1a1410', 0.9]} />
      <directionalLight position={[5, 6, 8]} intensity={2.2} color="#fff1d6" />
      <directionalLight position={[-6, 2, -6]} intensity={1.2} color="#5fa8b8" />
      <directionalLight position={[0, -6, 4]} intensity={0.5} color="#c5a774" />
      <Scene selected={props.selected} onSelect={props.onSelect} explode={props.explode ?? 0} motion={props.motion ?? 'neutro'}
        focus={props.focus ?? false} hover={hover} setHover={setHover} />
      <OrbitControls ref={ctl} enablePan={false} enableZoom={props.zoom ?? true} autoRotate={props.autoRotate} autoRotateSpeed={0.6} enableDamping dampingFactor={0.1} minDistance={5} maxDistance={26} target={[0, -0.8, 0]} />
      <CamRig view={props.view} nonce={props.nonce + (props.resetKey ?? 0)} ctl={ctl} />
    </Canvas>
  )
}
