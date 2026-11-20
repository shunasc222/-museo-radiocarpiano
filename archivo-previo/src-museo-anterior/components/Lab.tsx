import { useState } from 'react'
import Wrist3D, { type ViewKey, type Motion } from './Wrist3D'
import { ImageViewer, Ficha } from './Atlas'
import { LAB_VIEWS, MESH_IDS, STRUCTURES } from '../data/structures'

const VIEWS: [ViewKey, string][] = [['palmar', 'Palmar'], ['dorsal', 'Dorsal'], ['radial', 'Radial'], ['ulnar', 'Ulnar'], ['proximal', 'Proximal'], ['distal', 'Distal']]
const MOTIONS: [Motion, string][] = [['neutro', 'Neutro'], ['flexion', 'Flexión'], ['extension', 'Extensión'], ['radial', 'Desv. radial'], ['ulnar', 'Desv. ulnar']]

export default function Lab() {
  const [vi, setVi] = useState(0)
  const [sel, setSel] = useState<string | null>(null)
  const [view, setView] = useState<ViewKey>('palmar')
  const [nonce, setNonce] = useState(0)
  const [explode, setExplode] = useState(0)
  const [motion, setMotion] = useState<Motion>('neutro')
  const [focus, setFocus] = useState(true)
  const [sheet, setSheet] = useState(true)
  const v = LAB_VIEWS[vi]
  const pick = (id: string | null) => { setSel(id); if (id) setSheet(true) }
  const inView = sel ? v.hotspots.some(h => h.id === sel) : true
  const has3d = sel ? MESH_IDS.includes(sel) : true
  return (
    <main className="page lab">
      <header className="phead"><p className="eyebrow">Laboratorio comparativo</p><h1>Atlas 2D <em>+</em> Recreación 3D</h1>
        <p className="lead">Seleccione una estructura en cualquiera de los dos visores: ambos se sincronizan. La imagen 2D permanece fija; el modelo 3D se gira deliberadamente con el dedo o el ratón.</p></header>
      <div className="labgrid">
        <section className="pane">
          <div className="phd"><span>Atlas anatómico 2D</span><span className="muted">Imágenes de los textos de referencia</span></div>
          <div className="tabs">{LAB_VIEWS.map((x, i) => <button key={x.n} className={i === vi ? 'on' : ''} onClick={() => setVi(i)}>{x.titulo}</button>)}</div>
          <ImageViewer view={v} selected={sel} onPick={pick} />
          {sel && !inView && <p className="note">«{STRUCTURES[sel]?.nombre}» no está señalada en esta vista; cambie de vista para localizarla.</p>}
        </section>
        <section className="pane">
          <div className="phd"><span>Recreación anatómica 3D</span><span className="muted">Geometría didáctica</span></div>
          <div className="viewer3d"><Wrist3D selected={sel} onSelect={id => id ? pick(id) : setSel(null)} explode={explode} motion={motion} focus={focus} view={view} nonce={nonce} />
            <div className="hud">{sel && MESH_IDS.includes(sel) ? STRUCTURES[sel].nombre : 'Toque un hueso'}</div></div>
          <div className="ctrl"><span className="lbl">Orientación</span><div className="tabs">{VIEWS.map(([k, n]) => <button key={k} className={view === k ? 'on' : ''} onClick={() => { setView(k); setNonce(x => x + 1) }}>{n}</button>)}</div></div>
          <div className="ctrl"><span className="lbl">Movimiento (esquemático)</span><div className="tabs">{MOTIONS.map(([k, n]) => <button key={k} className={motion === k ? 'on' : ''} onClick={() => setMotion(k)}>{n}</button>)}</div></div>
          <div className="ctrl row"><label className="lbl">Explosión<input type="range" min={0} max={1} step={0.02} value={explode} onChange={e => setExplode(+e.target.value)} /></label>
            <button className={'chip' + (focus ? ' on' : '')} onClick={() => setFocus(!focus)}>Atenuar resto</button>
            <button className="chip" onClick={() => { setView('palmar'); setNonce(x => x + 1); setExplode(0); setMotion('neutro'); setSel(null) }}>Reiniciar</button></div>
          {sel && !has3d && <p className="note">«{STRUCTURES[sel]?.nombre}» es un ligamento: no está modelado en 3D. Se muestra su ficha y su ubicación en el atlas.</p>}
          <p className="disclaimer">Modelo didáctico: elipsoides deformadas con posiciones aproximadas. No es una reconstrucción anatómica exacta ni procede de una malla escaneada; las formas reales deben verificarse en el atlas. Ligamentos y tendones no están modelados.</p>
        </section>
        <aside className={'side' + (sel && sheet ? ' open' : '')}>
          {sel && <button className="sheetbar" onClick={() => setSheet(!sheet)}>{STRUCTURES[sel].nombre}<span>{sheet ? 'Ocultar' : 'Ver ficha'}</span></button>}
          <Ficha id={sel} onClose={() => setSel(null)} />
        </aside>
      </div>
    </main>
  )
}
