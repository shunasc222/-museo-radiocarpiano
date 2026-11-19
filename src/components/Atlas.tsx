import { useState } from 'react'
import { STRUCTURES, LAB_VIEWS, type View } from '../data/structures'
import { byN, imgUrl, SRC_NAME } from '../data/images'

// Imagen inmóvil: sin zoom, sin transformaciones. Los puntos se posicionan en % de la imagen.
export function ImageViewer({ view, selected, onPick }: { view: View; selected: string | null; onPick: (id: string) => void }) {
  const im = byN(view.n)
  return (
    <figure className="frame">
      <div className={"imgwrap" + (selected && view.hotspots.some(h => h.id === selected) ? " hasSel" : "")}>
        <img src={imgUrl(im.file)} alt={im.cap} draggable={false} />
        {view.hotspots.map(h => (
          <button key={h.id + h.x} className={'hot' + (selected === h.id ? ' on' : '')} style={{ left: h.x + '%', top: h.y + '%' }}
            aria-label={h.label} onClick={() => onPick(h.id)}><i /></button>
        ))}
      </div>
      <figcaption><b>{im.cap}</b><span>{SRC_NAME[im.src]}</span></figcaption>
    </figure>
  )
}

export function Ficha({ id, onClose }: { id: string | null; onClose?: () => void }) {
  const s = id ? STRUCTURES[id] : null
  if (!s) return <div className="ficha empty"><p className="eyebrow">Análisis anatómico</p><p>Seleccione una estructura en el atlas o en el modelo 3D para identificarla.</p></div>
  const rows: [string, string | undefined][] = [
    ['Localización', s.ubicacion], ['Relaciones anatómicas', s.relaciones], ['Función', s.funcion],
    ['Importancia biomecánica', s.biomecanica], ['Correlación clínica', s.clinica],
    ['Descripción morfológica', s.morfologia], ['Inserciones', s.inserciones]]
  return (
    <div className="ficha live" key={s.id}>
      <div className="fhead"><div><p className="eyebrow cyan">Análisis anatómico · estructura identificada</p><h3>{s.nombre}</h3><span className="tag">{s.tipo}</span></div>{onClose && <button className="x" onClick={onClose} aria-label="Cerrar">×</button>}</div>
      {rows.filter(r => r[1]).map(([k, v], i) => (
        <details key={k} open={i < 3}><summary>{k}</summary><p>{v}</p></details>))}
    </div>
  )
}

export function AtlasBlock({ ns }: { ns: number[] }) {
  const views = LAB_VIEWS.filter(v => ns.includes(v.n))
  const [vi, setVi] = useState(0)
  const [sel, setSel] = useState<string | null>(null)
  if (!views.length) return null
  return (
    <section className="block">
      <h2>Atlas interactivo</h2>
      <p className="muted">Toque un punto dorado para abrir la ficha. La imagen permanece fija.</p>
      {views.length > 1 && <div className="tabs">{views.map((v, i) => <button key={v.n} className={i === vi ? 'on' : ''} onClick={() => setVi(i)}>{v.titulo}</button>)}</div>}
      <div className="atlasgrid"><ImageViewer view={views[vi]} selected={sel} onPick={setSel} /><Ficha id={sel} /></div>
    </section>
  )
}
