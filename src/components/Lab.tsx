import { useState } from 'react'
import Wrist3D, { DEFAULT_LAYERS, type Anchor, type ViewKey, type Motion, type FrameMode, type LayerState } from './Wrist3D'
import { ImageViewer, Ficha } from './Atlas'
import { LAB_VIEWS, STRUCTURES, type View } from '../data/structures'
import { LAYERS, MESHES, MOTION, type LayerId } from '../data/model3d'
import { byN } from '../data/images'

const VIEWS: [ViewKey, string][] = [['palmar', 'Palmar'], ['dorsal', 'Dorsal'], ['radial', 'Radial'], ['ulnar', 'Ulnar'], ['proximal', 'Proximal'], ['distal', 'Distal']]
const MOTIONS: [Motion, string][] = [['neutro', 'Neutro'], ['flexion', 'Flexión'], ['extension', 'Extensión'], ['radial', 'Desv. radial'], ['ulnar', 'Desv. ulnar']]
const mesh3d = (sid: string) => MESHES.some(m => m.sid === sid)

export default function Lab() {
  const [vi, setVi] = useState(0)
  const [extra, setExtra] = useState<number | null>(null)
  const [sel, setSel] = useState<string | null>(null)
  const [view, setView] = useState<ViewKey>('palmar')
  const [nonce, setNonce] = useState(0)
  const [frame, setFrame] = useState<FrameMode>('muneca')
  const [explode, setExplode] = useState(0)
  const [motion, setMotion] = useState<Motion>('neutro')
  const [focus, setFocus] = useState(true)
  const [sheet, setSheet] = useState(true)
  const [zc, setZc] = useState({ n: 0, f: 1 })
  const [anc, setAnc] = useState<Anchor | null>(null)
  const [layers, setLayers] = useState<LayerState>(DEFAULT_LAYERS)
  const [showHand, setShowHand] = useState(true)
  const [activeLayer, setActiveLayer] = useState<LayerId>('esqueleto')
  const [open, setOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 1100)

  const v: View = extra !== null ? (LAB_VIEWS.find(x => x.n === extra) ?? { n: extra, titulo: byN(extra).cap, hotspots: [] }) : LAB_VIEWS[vi]
  const setL = (id: LayerId, p: Partial<{ on: boolean; op: number }>) => setLayers(s => ({ ...s, [id]: { ...s[id], ...p } }))
  const pick = (id: string | null) => {
    setSel(id)
    if (!id) return
    setSheet(window.innerWidth >= 760)
    const mm = MESHES.find(m => m.sid === id); if (mm) setL(mm.layer, { on: true })
    // si la vista actual del atlas no señala la estructura, saltar a la primera lámina que sí
    if (!v.hotspots.some(h => h.id === id)) {
      const k = LAB_VIEWS.findIndex(x => x.hotspots.some(h => h.id === id))
      if (k >= 0) { setVi(k); setExtra(null) }
    }
  }
  const inView = sel ? v.hotspots.some(h => h.id === sel) : true
  const reset = () => { setView('palmar'); setNonce(x => x + 1); setFrame('muneca'); setExplode(0); setMotion('neutro'); setSel(null); setLayers(DEFAULT_LAYERS); setShowHand(true) }
  const mo = MOTION[motion], rcDeg = Math.round(mo.total * mo.rc), mcDeg = mo.total - rcDeg
  const L = LAYERS.find(l => l.id === activeLayer)!

  return (
    <main className="page lab">
      <header className="phead"><p className="eyebrow">Exploración radiocarpiana</p><h1>Atlas 2D <em>+</em> Visualización tridimensional</h1>
        <p className="lead">Seleccione una estructura en el atlas, en el modelo o en las capas anatómicas: todo se sincroniza. La imagen 2D permanece fija; el modelo 3D se gira deliberadamente.</p></header>
      <div className="labgrid">
        <section className="pane atlas">
          <div className="phd"><span>Atlas anatómico 2D</span><span className="muted">Láminas de los textos de referencia</span></div>
          <div className="tabs">{LAB_VIEWS.map((x, i) => <button key={x.n} className={extra === null && i === vi ? 'on' : ''} onClick={() => { setVi(i); setExtra(null) }}>{x.titulo}</button>)}</div>
          <ImageViewer view={v} selected={sel} onPick={pick} />
          {v.hotspots.length === 0 && <p className="note">Lámina 2D sin puntos seleccionables; consulte las fichas de la capa en el panel de capas.</p>}
          {sel && !inView && v.hotspots.length > 0 && <p className="note">«{STRUCTURES[sel]?.nombre}» no está señalada en esta lámina; cambie de lámina para localizarla.</p>}
        </section>
        <section className="pane">
          <div className="phd"><span>Visualización tridimensional</span><span className="muted">BodyParts3D · mano derecha</span></div>
          <div className="viewer3d"><Wrist3D selected={sel} onSelect={id => id ? pick(id) : setSel(null)} layers={layers} showHand={showHand} explode={explode} motion={motion}
              focus={focus} view={view} nonce={nonce} frame={frame} zoomCmd={zc} onAnchor={setAnc} />
            <Callout id={sel && mesh3d(sel) ? sel : null} a={anc} />
            <div className="hint"><b>Visualización 3D</b><span>Arrastre para rotar · pellizque para acercar</span></div>
            <div className="zoom"><button aria-label="Acercar" onClick={() => setZc(z => ({ n: z.n + 1, f: 0.8 }))}>+</button><button aria-label="Alejar" onClick={() => setZc(z => ({ n: z.n + 1, f: 1.25 }))}>−</button></div>
            <div className="hud">{sel && mesh3d(sel) ? 'Estructura identificada' : 'Toque una estructura para identificarla'}</div></div>
          <div className="ctrl"><span className="lbl">Orientación</span><div className="tabs">{VIEWS.map(([k, n]) => <button key={k} className={view === k ? 'on' : ''} onClick={() => { setView(k); setNonce(x => x + 1) }}>{n}</button>)}</div></div>
          <div className="ctrl"><span className="lbl">Encuadre</span><div className="tabs">
            <button className={frame === 'muneca' ? 'on' : ''} onClick={() => { setFrame('muneca'); setNonce(x => x + 1) }}>Muñeca</button>
            <button className={frame === 'mano' ? 'on' : ''} onClick={() => { setFrame('mano'); setNonce(x => x + 1) }}>Mano completa</button></div></div>
          <div className="ctrl"><span className="lbl">Biomecánica (ilustrativa)</span><div className="tabs">{MOTIONS.map(([k, n]) => <button key={k} className={motion === k ? 'on' : ''} onClick={() => setMotion(k)}>{n}</button>)}</div>
            {motion !== 'neutro' && <p className="readout">Radiocarpiana <b>{rcDeg}°</b> · Mediocarpiana <b>{mcDeg}°</b> · Total {mo.total}° <span>(reparto didáctico)</span></p>}</div>
          <div className="ctrl row"><label className="lbl">Exploración por separación<input type="range" min={0} max={1} step={0.02} value={explode} onChange={e => setExplode(+e.target.value)} /></label>
            <button className={'chip' + (focus ? ' on' : '')} onClick={() => setFocus(!focus)}>Atenuar resto</button>
            <button className="chip" onClick={reset}>Restablecer visualización</button></div>
          {sel && !mesh3d(sel) && <p className="note">«{STRUCTURES[sel]?.nombre}» no tiene malla 3D verificada: se muestra su ficha y su ubicación en el atlas 2D.</p>}
          
        </section>
        <section className="layers">
          <button className="lhead" onClick={() => setOpen(!open)} aria-expanded={open}><span><i>Capas anatómicas</i><small>{LAYERS.filter(l => layers[l.id].on).length} activas</small></span><em>{open ? 'Ocultar' : 'Mostrar'}</em></button>
          {open && (
            <div className="lbody">
              <div className="lpresets"><button className="chip" onClick={() => { setLayers(DEFAULT_LAYERS); setShowHand(true) }}>Solo esqueleto</button>
                <button className="chip" onClick={() => setLayers(s => ({ ...s, esqueleto: { on: true, op: 0.35 }, tendones: { on: true, op: 0.8 }, vasc: { on: true, op: 0.9 }, tfcc: { on: true, op: 0.8 }, superficies: { on: true, op: 0.9 } }))}>Huesos transparentes + estructuras</button>
                <button className="chip" onClick={() => setLayers(s => ({ ...s, superficies: { on: true, op: 0.9 }, esqueleto: { on: true, op: 1 } }))}>Huesos + superficies</button></div>
              {LAYERS.map(l => {
                const st = layers[l.id], is3d = l.badge !== '2D'
                return (
                  <div key={l.id} className={'lrow' + (activeLayer === l.id ? ' act' : '')}>
                    <div className="lline">
                      {is3d ? <label className="sw"><input type="checkbox" checked={st.on} onChange={e => setL(l.id, { on: e.target.checked })} aria-label={'Mostrar ' + l.titulo} /><i /></label> : <span className="sw off" title="Solo 2D">2D</span>}
                      <button className="ltitle" onClick={() => { setActiveLayer(l.id); setExtra(null) }}><span>{l.n}. {l.titulo}</span><small className={'bd b' + l.badge.replace(/\W/g, '')}>{l.badge}</small></button>
                    </div>
                    {activeLayer === l.id && (
                      <div className="lopen">
                        <p className="lnote">{l.nota}</p>
                        {is3d && <label className="lbl op">Transparencia<input type="range" min={0.1} max={1} step={0.05} value={st.op} onChange={e => setL(l.id, { op: +e.target.value })} /></label>}
                        {l.id === 'esqueleto' && <label className="chk"><input type="checkbox" checked={showHand} onChange={e => setShowHand(e.target.checked)} /> Mano completa (metacarpianos y falanges)</label>}
                        <div className="chips">{l.items.filter(id => STRUCTURES[id]).map(id => <button key={id} className={'chip sm' + (sel === id ? ' on' : '')} onClick={() => pick(id)}>{STRUCTURES[id].nombre.replace(/ \(.*\)/, '')}{mesh3d(id) ? '' : ' · 2D'}</button>)}</div>
                        <p className="lbl">Láminas 2D de la capa</p>
                        <div className="plates">{l.plates.map(n => <button key={n} className={'pthumb' + (extra === n || (extra === null && v.n === n) ? ' on' : '')} onClick={() => { const k = LAB_VIEWS.findIndex(x => x.n === n); if (k >= 0) { setVi(k); setExtra(null) } else setExtra(n) }} title={byN(n).cap}>{byN(n).cap}</button>)}</div>
                      </div>)}
                  </div>)
              })}
            </div>)}
          <p className="disclaimer">Huesos, músculos, retináculo flexor, membrana interósea y arterias parciales: mallas reales de BodyParts3D (© DBCLS, CC BY-SA 2.1 JP), baja resolución, un individuo de referencia. Zonas articulares: <b>derivadas por proximidad</b> (aproximación). Disco articular: <b>marcador esquemático</b> de alambre. No existen mallas de cápsula, sinovial, cartílago, ligamentos ni nervios: se muestran en 2D. El movimiento es una rotación rígida ilustrativa.</p>
        </section>
        <aside className={'side' + (sel ? ' has' : '') + (sheet ? ' open' : '')}>
          {sel && <button className="sheetbar" onClick={() => setSheet(!sheet)}>{STRUCTURES[sel].nombre}<span>{sheet ? 'Ocultar' : 'Ver ficha'}</span></button>}
          <Ficha id={sel} onClose={() => setSel(null)} />
        </aside>
      </div>
    </main>
  )
}

function Callout({ id, a }: { id: string | null; a: Anchor | null }) {
  if (!id || !a) return null
  const s = STRUCTURES[id]
  const right = a.x < a.w * 0.5
  const bx = right ? Math.min(a.x + 70, a.w - 190) : Math.max(a.x - 70 - 180, 8)
  const by = Math.max(60, Math.min(a.y - 90, a.h - 130))
  const ex = right ? bx : bx + 180, ey = by + 28
  return (
    <>
      <svg className="conn" width={a.w} height={a.h} key={id}><line x1={a.x} y1={a.y} x2={ex} y2={ey} /><circle cx={a.x} cy={a.y} r="4" /></svg>
      <div className="callout" key={id + 'c'} style={{ left: bx, top: by }}>
        <span>Estructura identificada</span><b>{s.nombre.replace(/ \(.*\)/, '')}</b><small>{s.tipo}{s.disp ? ' · ' + s.disp : ''}</small>
      </div>
    </>
  )
}
