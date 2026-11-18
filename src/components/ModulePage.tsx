import { useState } from 'react'
import { MODULES, BIBLIO } from '../data/modules'
import { byN, imgUrl, SRC_NAME } from '../data/images'
import { AtlasBlock } from './Atlas'
import Quiz from './Quiz'
import Wrist3D, { type Motion } from './Wrist3D'

const ATLAS: Record<string, number[]> = { introduccion: [58, 14], osteologia: [8, 58], superficies: [14], capsula: [14], ligamentos: [19, 20], clinica: [58] }

export default function ModulePage({ id }: { id: string }) {
  const m = MODULES.find(x => x.id === id)!
  const [lb, setLb] = useState<number | null>(null)
  const [mo, setMo] = useState<Motion>('neutro')
  const idx = MODULES.indexOf(m)
  const prev = MODULES[idx - 1], next = MODULES[idx + 1]
  return (
    <main className="page">
      <header className="phead"><p className="eyebrow">Módulo {String(m.n).padStart(2, '0')}</p><h1>{m.titulo}</h1><p className="lead">{m.lema}</p></header>
      {m.id === 'evaluacion' ? <Quiz /> : (
        <>
          <div className="sections">{m.sections.map(s => (
            <section key={s.h} className="sec"><h2>{s.h}</h2>{s.p && <p>{s.p}</p>}{s.li && <ul>{s.li.map(l => <li key={l}>{l}</li>)}</ul>}</section>))}</div>
          {m.id === 'biomecanica' && (
            <section className="block"><h2>Simulador esquemático</h2>
              <div className="viewer3d small"><Wrist3D selected={null} onSelect={() => {}} view="palmar" nonce={0} motion={mo} /></div>
              <div className="tabs">{([['neutro', 'Neutro'], ['flexion', 'Flexión'], ['extension', 'Extensión'], ['radial', 'Desv. radial'], ['ulnar', 'Desv. ulnar']] as [Motion, string][]).map(([k, n]) => <button key={k} className={mo === k ? 'on' : ''} onClick={() => setMo(k)}>{n}</button>)}</div>
              <p className="disclaimer">Animación didáctica del bloque carpiano sobre el antebrazo; las amplitudes son ilustrativas.</p></section>)}
          {ATLAS[m.id] && <AtlasBlock ns={ATLAS[m.id]} />}
          <section className="block"><h2>Galería anatómica</h2>
            <div className="gallery">{m.imgs.map(n => { const im = byN(n); return (
              <button key={n} className="thumb" onClick={() => setLb(n)}><img loading="lazy" src={imgUrl(im.file)} alt={im.cap} /><span>{im.cap}</span><small>{SRC_NAME[im.src]}</small></button>) })}</div></section>
        </>)}
      <nav className="pager">
        {prev ? <a href={`#/m/${prev.id}`}>← {prev.titulo}</a> : <span />}
        {next ? <a href={`#/m/${next.id}`}>{next.titulo} →</a> : <span />}
      </nav>
      <footer className="biblio"><b>Bibliografía de referencia</b><ul>{BIBLIO.map(b => <li key={b}>{b}</li>)}</ul>
        <p>Contenido de síntesis docente; no sustituye la lectura del texto. Las figuras provienen de los libros indicados bajo cada imagen. Material de uso académico privado.</p></footer>
      {lb !== null && <div className="lightbox" onClick={() => setLb(null)}><img src={imgUrl(byN(lb).file)} alt={byN(lb).cap} /><p>{byN(lb).cap} — {SRC_NAME[byN(lb).src]}</p><button>Cerrar</button></div>}
    </main>
  )
}
