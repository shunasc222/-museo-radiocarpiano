import { lazy, Suspense, useMemo, useState } from 'react'
import { AlertTriangle, ArrowRight, Eye, EyeOff, Layers, Move3d, RotateCcw, Tag } from 'lucide-react'
import { Badge, Button, Card, SectionHeader, Toggle } from '../components/ui/ui'
import { StructureCard } from '../components/ui/InfoCard'
import { BONE3D_GROUP, BONE3D_NAME, BONE3D_ORDER, bone3DInfo, type Bone3DId } from '../data/bones3d'
import { webglAvailable, type ViewName } from '../components/viewer3d/webgl'
import type { SectionId } from '../lib/nav'
import { cn } from '../lib/utils'

const Wrist3D = lazy(() => import('../components/viewer3d/Wrist3D'))

const VIEW_BUTTONS: { id: ViewName; label: string }[] = [
  { id: 'palmar', label: 'Vista palmar' }, { id: 'dorsal', label: 'Vista dorsal' },
  { id: 'radial', label: 'Vista radial' }, { id: 'ulnar', label: 'Vista ulnar' },
]

const ALL_VISIBLE = Object.fromEntries(BONE3D_ORDER.map((b) => [b, true])) as Record<Bone3DId, boolean>

export default function Explorer3D({ go }: { go: (id: SectionId) => void }) {
  const [ok] = useState(() => webglAvailable())
  const [selected, setSelected] = useState<Bone3DId | null>(null)
  const [visibility, setVisibility] = useState<Record<Bone3DId, boolean>>(ALL_VISIBLE)
  const [view, setView] = useState<{ name: ViewName; nonce: number }>({ name: 'inicial', nonce: 0 })
  const [labels, setLabels] = useState(true)
  const [surfaces, setSurfaces] = useState(false)
  const [dim, setDim] = useState(false)
  const [explode, setExplode] = useState(0)

  const setBone = (id: Bone3DId, v: boolean) => {
    setVisibility((s) => ({ ...s, [id]: v }))
    if (!v && selected === id) setSelected(null)
  }
  const setGroup = (g: 'proximal' | 'distal' | 'antebrazo', v: boolean) => {
    setVisibility((s) => {
      const next = { ...s }
      BONE3D_ORDER.filter((b) => BONE3D_GROUP[b] === g).forEach((b) => { next[b] = v })
      return next
    })
    if (!v && selected && BONE3D_GROUP[selected] === g) setSelected(null)
  }
  const goView = (name: ViewName) => setView((v) => ({ name, nonce: v.nonce + 1 }))
  const reset = () => { goView('inicial'); setSelected(null); setVisibility(ALL_VISIBLE); setExplode(0); setDim(false); setSurfaces(false); setLabels(true) }
  const info = useMemo(() => (selected ? bone3DInfo(selected) : null), [selected])
  const groups: { id: 'antebrazo' | 'proximal' | 'distal'; label: string }[] = [
    { id: 'antebrazo', label: 'Antebrazo distal' }, { id: 'proximal', label: 'Primera fila del carpo' }, { id: 'distal', label: 'Segunda fila del carpo' },
  ]

  return (
    <div>
      <SectionHeader n={3} eyebrow="Explorador anatómico 3D" title="La región radiocarpiana en tres dimensiones"
        lead="Gira con el ratón o con un dedo, acerca con la rueda o pellizcando, y toca un hueso para seleccionarlo." />

      <div role="note" className="mb-5 flex gap-3 rounded-2xl border border-lilac bg-lilac/15 p-4 text-sm leading-relaxed text-ink">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-lilac-deep" aria-hidden />
        <p><strong>Modelo geométrico simplificado.</strong> Los huesos se representan con formas básicas (elipsoides y cilindros) colocadas según las relaciones espaciales descritas en los textos de anatomía. Las proporciones y la forma ósea son aproximadas: <em>no es una reconstrucción validada ni una malla escaneada</em>. Para la morfología exacta de cada superficie usa el{' '}
          <button type="button" className="font-semibold text-deep underline underline-offset-2" onClick={() => go('atlas')}>Atlas anatómico</button>.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="min-w-0 space-y-4">
          <Card className="relative overflow-hidden !p-0">
            {ok ? (
              <div className="h-[58dvh] min-h-[360px] max-h-[620px] w-full bg-gradient-to-b from-white to-cream" data-testid="canvas-wrap">
                <Suspense fallback={<div className="grid h-full place-items-center text-sm text-ink-soft" role="status">Cargando visor 3D…</div>}>
                  <Wrist3D selected={selected} visibility={visibility} dim={dim} surfaces={surfaces} explode={explode} labels={labels} onPick={setSelected} view={view} />
                </Suspense>
              </div>
            ) : (
              <div className="grid min-h-72 place-items-center p-8 text-center" role="alert">
                <div>
                  <p className="font-serif text-2xl text-deep-700">Tu dispositivo no puede mostrar gráficos 3D (WebGL)</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">Usa la alternativa 2D fiel: el atlas interactivo contiene las mismas estructuras con fichas anatómicas completas.</p>
                  <Button variant="primary" className="mt-4" onClick={() => go('atlas')} icon={<ArrowRight className="size-4" />}>Abrir el atlas 2D</Button>
                </div>
              </div>
            )}
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[11px] text-ink-soft backdrop-blur">
              Palmar al frente · radio a la izquierda · mano derecha
            </p>
          </Card>

          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Vistas del modelo">
            {VIEW_BUTTONS.map((v) => (
              <Button key={v.id} variant="soft" size="sm" onClick={() => goView(v.id)} aria-label={v.label}>{v.label}</Button>
            ))}
            <Button variant="outline" size="sm" onClick={reset} icon={<RotateCcw className="size-4" />}>Restablecer vista</Button>
          </div>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Opciones de visualización">
            <Toggle pressed={labels} onClick={() => setLabels((v) => !v)} icon={<Tag className="size-4" />}>Etiquetas</Toggle>
            <Toggle pressed={surfaces} onClick={() => setSurfaces((v) => !v)} tone="rose" icon={<Layers className="size-4" />}>Resaltar superficies articulares</Toggle>
            <Toggle pressed={dim} onClick={() => setDim((v) => !v)} tone="lilac" icon={<Move3d className="size-4" />} title="Atenúa los huesos no seleccionados">Atenuar el resto</Toggle>
          </div>
          <label className="flex max-w-md items-center gap-3 rounded-2xl border border-line bg-warm px-4 py-3 text-sm font-medium text-deep-700">
            Separar huesos
            <input type="range" min={0} max={100} value={Math.round(explode * 100)} onChange={(e) => setExplode(Number(e.target.value) / 100)} className="h-8 flex-1 accent-[#536b5a]" aria-label="Separar huesos" />
          </label>
        </div>

        <div className="min-w-0 space-y-4">
          <StructureCard s={info} />
          <Card className="!p-5">
            <h2 className="mb-3 text-2xl">Mostrar / ocultar huesos</h2>
            <div className="space-y-4">
              {groups.map((g) => (
                <div key={g.id}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge tone={g.id === 'antebrazo' ? 'sage' : g.id === 'proximal' ? 'rose' : 'steel'}>{g.label}</Badge>
                    <span className="flex gap-1">
                      <button type="button" className="min-h-9 rounded-full px-3 text-xs font-medium text-deep hover:bg-sage/20" onClick={() => setGroup(g.id, true)}>Mostrar</button>
                      <button type="button" className="min-h-9 rounded-full px-3 text-xs font-medium text-deep hover:bg-sage/20" onClick={() => setGroup(g.id, false)}>Ocultar</button>
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {BONE3D_ORDER.filter((b) => BONE3D_GROUP[b] === g.id).map((b) => (
                      <li key={b} className="flex overflow-hidden rounded-full border border-line bg-warm">
                        <button type="button" aria-pressed={selected === b} onClick={() => { setBone(b, true); setSelected(b) }} className={cn('min-h-11 px-3 text-sm', selected === b ? 'bg-deep text-white' : 'hover:bg-cream')}>{BONE3D_NAME[b]}</button>
                        <button type="button" aria-label={`${visibility[b] ? 'Ocultar' : 'Mostrar'} ${BONE3D_NAME[b]}`} aria-pressed={!visibility[b]} onClick={() => setBone(b, !visibility[b])} className="grid min-h-11 w-11 place-items-center border-l border-line text-ink-soft hover:bg-cream">
                          {visibility[b] ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
