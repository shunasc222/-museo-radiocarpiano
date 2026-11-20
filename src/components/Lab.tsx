import { useEffect, useRef, useState } from 'react'
import Wrist3D, { DEFAULT_LAYERS, type Anchor, type ViewKey, type Motion, type FrameMode, type LayerState } from './Wrist3D'
import { ImageViewer, Ficha } from './Atlas'
import { LAB_VIEWS, STRUCTURES, type View } from '../data/structures'
import { LAYERS, MESHES, MOTION, type LayerId } from '../data/model3d'
import { byN, imgUrl } from '../data/images'

const VIEWS: [ViewKey, string][] = [['palmar', 'Palmar'], ['dorsal', 'Dorsal'], ['radial', 'Radial'], ['ulnar', 'Ulnar'], ['proximal', 'Proximal'], ['distal', 'Distal']]
const MOTIONS: [Motion, string][] = [['neutro', 'Neutro'], ['flexion', 'Flexión'], ['extension', 'Extensión'], ['radial', 'Desv. radial'], ['ulnar', 'Desv. ulnar']]
const mesh3d = (sid: string) => MESHES.some(m => m.sid === sid)
type Mode = 'closed' | 'peek' | 'full'

function useMobile() {
  const q = '(max-width: 760px)'
  const [m, setM] = useState(typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => { const mq = window.matchMedia(q), f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f) }, [])
  return m
}
const store = {
  get: (k: string) => { try { return localStorage.getItem(k) } catch { return null } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* sin almacenamiento */ } }
}

export default function Lab() {
  const mobile = useMobile()
  const [vi, setVi] = useState(0)
  const [extra, setExtra] = useState<number | null>(null)
  const [sel, setSel] = useState<string | null>(null)
  const [view, setView] = useState<ViewKey>('palmar')
  const [nonce, setNonce] = useState(0)
  const [frame, setFrame] = useState<FrameMode>('muneca')
  const [explode, setExplode] = useState(0)
  const [motion, setMotion] = useState<Motion>('neutro')
  const [focus, setFocus] = useState(true)
  const [zc, setZc] = useState({ n: 0, f: 1 })
  const [fc, setFc] = useState(0)
  const [anc, setAnc] = useState<Anchor | null>(null)
  const [layers, setLayers] = useState<LayerState>(DEFAULT_LAYERS)
  const [showHand, setShowHand] = useState(true)
  const [activeLayer, setActiveLayer] = useState<LayerId>('esqueleto')
  const [lopen, setLopen] = useState(false)
  const [mode, setMode] = useState<Mode>('closed')
  const [zoom2d, setZoom2d] = useState(false)
  const [guide, setGuide] = useState(store.get('museo-guia') !== '1')
  const [here, setHere] = useState<'atlas' | '3d' | ''>('')

  const v: View = extra !== null ? (LAB_VIEWS.find(x => x.n === extra) ?? { n: extra, titulo: byN(extra).cap, hotspots: [] }) : LAB_VIEWS[vi]
  const setL = (id: LayerId, p: Partial<{ on: boolean; op: number }>) => setLayers(s => ({ ...s, [id]: { ...s[id], ...p } }))
  const hs = sel ? v.hotspots.find(h => h.id === sel) : undefined
  const pick = (id: string | null) => {
    setSel(id)
    if (!id) return
    if (mobile) { setMode('peek'); setLopen(false) }
    const mm = MESHES.find(m => m.sid === id); if (mm) setL(mm.layer, { on: true })
    if (!v.hotspots.some(h => h.id === id)) {
      const k = LAB_VIEWS.findIndex(x => x.hotspots.some(h => h.id === id))
      if (k >= 0) { setVi(k); setExtra(null) }
    }
  }
  const reset = () => { setView('palmar'); setNonce(x => x + 1); setFrame('muneca'); setExplode(0); setMotion('neutro'); setSel(null); setLayers(DEFAULT_LAYERS); setShowHand(true); setMode('closed') }
  const mo = MOTION[motion], rcDeg = Math.round(mo.total * mo.rc), mcDeg = mo.total - rcDeg
  const nActive = LAYERS.filter(l => layers[l.id].on).length
  useEffect(() => { try { const id = sessionStorage.getItem('museo-pick'); if (id && STRUCTURES[id]) { sessionStorage.removeItem('museo-pick'); setTimeout(() => pick(id), 300) } } catch { /* sin almacenamiento */ } }, [])
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const toLayers = () => { setLopen(o => !o); if (mobile) setMode('closed') }
  const toInfo = () => { if (mobile) { if (sel) { setLopen(false); setMode('full') } else goto('lab-3d') } else goto('lab-info') }
  const dismissGuide = () => { setGuide(false); store.set('museo-guia', '1') }

  // sección visible (resalta la navegación rápida)
  useEffect(() => {
    const els = ['lab-atlas', 'lab-3d'].map(i => document.getElementById(i)!).filter(Boolean)
    const io = new IntersectionObserver(es => { const e = es.filter(x => x.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (e) setHere(e.target.id === 'lab-atlas' ? 'atlas' : '3d') }, { rootMargin: '-30% 0px -40% 0px', threshold: [0, .2, .5] })
    els.forEach(e => io.observe(e)); return () => io.disconnect()
  }, [])
  useEffect(() => { const h = document.querySelector('.nav') as HTMLElement | null; if (h) document.documentElement.style.setProperty('--navh', h.offsetHeight + 'px') }, [mobile])

  const tip = !sel ? 'Toque un punto dorado del atlas o un hueso del modelo para identificarlo.' : mobile ? 'Deslice la ficha hacia arriba para leer todo. Pulse «Capas anatómicas» para ver tejidos relacionados.' : 'Active «Capas anatómicas» para ver tendones, superficies y arterias.'

  return (
    <main className="page lab">
      <header className="phead"><p className="eyebrow">Exploración radiocarpiana</p><h1>Atlas 2D <em>+</em> Visualización tridimensional</h1></header>
      {guide && (
        <div className="guide" role="note"><ol><li>Elija una vista</li><li>Seleccione una estructura</li><li>Consulte su ficha</li><li>Active capas</li><li>Compare en 3D</li></ol><button onClick={dismissGuide} aria-label="Ocultar guía">Entendido</button></div>)}
      <nav className="quicknav" aria-label="Accesos rápidos">
        <button className={here === 'atlas' && !lopen ? 'on' : ''} onClick={() => goto('lab-atlas')}>Atlas 2D</button>
        <button className={here === '3d' && !lopen ? 'on' : ''} onClick={() => goto('lab-3d')}>Modelo 3D</button>
        <button className={lopen ? 'on' : ''} onClick={() => { goto('lab-3d'); setLopen(true); if (mobile) setMode('closed') }}>Capas{nActive > 1 ? <i>{nActive}</i> : null}</button>
        <button className={mode === 'full' ? 'on' : ''} onClick={toInfo}>Ficha</button>
      </nav>
      <div className="labgrid">
        <section className="pane atlas" id="lab-atlas">
          <div className="phd"><span>Atlas anatómico 2D</span><span className="muted">Láminas de los textos de referencia</span></div>
          <div className="tabs">{LAB_VIEWS.map((x, i) => <button key={x.n} className={extra === null && i === vi ? 'on' : ''} onClick={() => { setVi(i); setExtra(null) }}>{x.titulo}</button>)}</div>
          <p className="tip"><b>1</b> Elija la lámina · <b>2</b> toque un punto dorado para identificar</p>
          <ImageViewer view={v} selected={sel} onPick={pick} />
          {v.hotspots.length === 0 && <p className="note">Lámina 2D sin puntos seleccionables; abra «Capas anatómicas» para ver las fichas de esta capa.</p>}
          {sel && !hs && v.hotspots.length > 0 && <p className="note">«{STRUCTURES[sel]?.nombre}» no está señalada en esta lámina; cambie de lámina para localizarla.</p>}
        </section>
        <section className="pane" id="lab-3d">
          <div className="phd"><span>Visualización tridimensional</span><span className="muted">BodyParts3D · mano derecha</span></div>
          <div className="viewer3d"><Wrist3D selected={sel} onSelect={id => id ? pick(id) : setSel(null)} layers={layers} showHand={showHand} explode={explode} motion={motion}
              focus={focus} view={view} nonce={nonce} frame={frame} zoomCmd={zc} focusCmd={fc} onAnchor={setAnc} />
            <Callout id={sel && mesh3d(sel) ? sel : null} a={anc} />
            <div className="hint"><b>Visualización 3D</b><span>Arrastre para rotar · pellizque para acercar</span></div>
            <button className="layerbtn" onClick={toLayers} aria-expanded={lopen}><span>Capas anatómicas</span><i>{nActive}</i></button>
            <div className="zoom"><button aria-label="Acercar" onClick={() => setZc(z => ({ n: z.n + 1, f: 0.8 }))}>+</button><button aria-label="Alejar" onClick={() => setZc(z => ({ n: z.n + 1, f: 1.25 }))}>−</button></div>
            <div className="hud">{sel && mesh3d(sel) ? 'Estructura identificada' : 'Toque una estructura para identificarla'}</div>
            {lopen && (
              <div className="lpop" role="dialog" aria-label="Capas anatómicas">
                <div className="lphead"><span>Capas anatómicas</span><small>{nActive} activas</small><button onClick={() => setLopen(false)} aria-label="Cerrar capas">×</button></div>
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
                            <div className="plates">{l.plates.map(n => <button key={n} className={'pthumb' + (extra === n || (extra === null && v.n === n) ? ' on' : '')} onClick={() => { const k = LAB_VIEWS.findIndex(x => x.n === n); if (k >= 0) { setVi(k); setExtra(null) } else setExtra(n); if (mobile) { setLopen(false); goto('lab-atlas') } }} title={byN(n).cap}>{byN(n).cap}</button>)}</div>
                          </div>)}
                      </div>)
                  })}
                </div>
              </div>)}
          </div>
          <p className="tip"><b>2</b> {tip}</p>
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
          <p className="disclaimer">Huesos, músculos, retináculo flexor, membrana interósea y arterias parciales: mallas reales de BodyParts3D (© DBCLS, CC BY-SA 2.1 JP), baja resolución, un individuo de referencia. Zonas articulares: <b>derivadas por proximidad</b> (aproximación). Disco articular: <b>marcador esquemático</b> de alambre. No existen mallas de cápsula, sinovial, cartílago, ligamentos ni nervios: se muestran en 2D. El movimiento es una rotación rígida ilustrativa.</p>
        </section>
        <aside className="side" id="lab-info"><Ficha id={sel} onClose={() => setSel(null)} />
          {sel && (mesh3d(sel) || hs) && <div className="zbtns">{mesh3d(sel) && <button className="chip" onClick={() => { goto('lab-3d'); setFc(n => n + 1) }}>Ampliar en 3D</button>}{hs && <button className="chip" onClick={() => setZoom2d(true)}>Ampliar en la lámina</button>}</div>}
        </aside>
      </div>
      {mobile && sel && <Sheet id={sel} mode={mode} setMode={setMode} can3d={mesh3d(sel)} can2d={!!hs}
        on3d={() => { setFc(n => n + 1); setMode('peek'); goto('lab-3d') }} on2d={() => setZoom2d(true)} />}
      {mobile && sel && mode === 'closed' && <button className="reopen" onClick={() => setMode('peek')}><i /> Ficha · {STRUCTURES[sel].nombre.replace(/ \(.*\)/, '')}</button>}
      {zoom2d && hs && <ZoomModal view={v} x={hs.x} y={hs.y} label={STRUCTURES[sel!].nombre} onClose={() => setZoom2d(false)} />}
    </main>
  )
}

function Sheet({ id, mode, setMode, can3d, can2d, on3d, on2d }: { id: string; mode: Mode; setMode: (m: Mode) => void; can3d: boolean; can2d: boolean; on3d: () => void; on2d: () => void }) {
  const s = STRUCTURES[id]
  const y0 = useRef<number | null>(null)
  const [dy, setDy] = useState(0)
  const down = (e: React.PointerEvent) => { y0.current = e.clientY; (e.target as HTMLElement).setPointerCapture(e.pointerId) }
  const move = (e: React.PointerEvent) => { if (y0.current !== null) setDy(e.clientY - y0.current) }
  const up = () => {
    if (y0.current === null) return
    if (dy > 70) setMode(mode === 'full' ? 'peek' : 'closed'); else if (dy < -50) setMode('full'); else if (Math.abs(dy) < 6) setMode(mode === 'peek' ? 'full' : 'peek')
    y0.current = null; setDy(0)
  }
  return (
    <div className={'sheet ' + mode} style={dy && mode !== 'closed' ? { transform: `translateY(${Math.max(dy, -40)}px)`, transition: 'none' } : undefined} role="dialog" aria-label={'Ficha: ' + s.nombre} aria-hidden={mode === 'closed'}>
      <div className="grab" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}><i /></div>
      {mode === 'peek' ? (
        <div className="speek">
          <p className="eyebrow cyan">Estructura identificada</p>
          <h3>{s.nombre}</h3>
          <div><span className="tag">{s.tipo}</span>{s.disp && <span className="tag disp">{s.disp}</span>}</div>
          {s.term && <p className="term">{s.term}</p>}
          {(s.definicion || s.ubicacion) && <p className="ess"><b>{s.definicion ? 'Definición' : 'Ubicación'}</b>{s.definicion ?? s.ubicacion}</p>}
          {s.funcion && <p className="ess"><b>Función</b>{s.funcion}</p>}
          <div className="sact"><button className="chip on" onClick={() => setMode('full')}>Ficha completa</button>{can3d && <button className="chip" onClick={on3d}>Ampliar en 3D</button>}{can2d && <button className="chip" onClick={on2d}>Ampliar en la lámina</button>}<button className="chip" onClick={() => setMode('closed')}>Cerrar</button></div>
        </div>
      ) : mode === 'full' ? (
        <div className="sfull"><div className="sact top">{can3d && <button className="chip" onClick={on3d}>Ampliar en 3D</button>}{can2d && <button className="chip" onClick={on2d}>Ampliar en la lámina</button>}<button className="chip" onClick={() => setMode('closed')}>Cerrar</button></div><Ficha id={id} /></div>
      ) : null}
    </div>
  )
}

function ZoomModal({ view, x, y, label, onClose }: { view: View; x: number; y: number; label: string; onClose: () => void }) {
  const Z = 2.6, im = byN(view.n)
  const [ar, setAr] = useState(1.5)
  const cl = (t: number, o: number) => Math.min((Z - 1) * o, Math.max(100 - o - Z * (100 - o), t))
  const tx = cl(50 - x, x), ty = cl(50 - y, y)
  return (
    <div className="zmodal" onClick={onClose} role="dialog" aria-label={'Región ampliada: ' + label}>
      <div className="zbox" onClick={e => e.stopPropagation()}>
        <div className="zwrap" style={{ aspectRatio: String(ar), width: `min(94vw, 900px, calc(68vh * ${ar}))` }}><div className="zin" style={{ transformOrigin: `${x}% ${y}%`, transform: `translate(${tx}%, ${ty}%) scale(${Z})` }}>
          <img src={imgUrl(im.file)} alt={im.cap} draggable={false} onLoad={e => setAr(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} /><span className="zdot" style={{ left: x + '%', top: y + '%', transform: `translate(-50%,-50%) scale(${1 / Z})` }} /></div></div>
        <p><b>{label}</b> · región ampliada de la lámina (la lámina original no se modifica)</p>
        <button className="btn gold" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

function Callout({ id, a }: { id: string | null; a: Anchor | null }) {
  if (!id || !a) return null
  const s = STRUCTURES[id]
  const right = a.x < a.w * 0.5
  const bx = right ? Math.min(a.x + 70, a.w - 190) : Math.max(a.x - 70 - 180, 8)
  const by = Math.max(80, Math.min(a.y - 90, a.h - 130))
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
