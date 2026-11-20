import { useEffect, useState } from 'react'
import Home from './components/Home'
import Lab from './components/Lab'
import ModulePage from './components/ModulePage'
import Quiz from './components/Quiz'
import { Station1, Station2, Station3, Credits, ESTACIONES, loadEquipo, StationBar } from './components/Estaciones'
import { MODULES } from './data/modules'

function Station4() {
  return (
    <main className="page">
      <StationBar n={4} />
      <header className="phead"><p className="eyebrow">Estación 4</p><h1>Autoevaluación</h1><p className="lead">Compruebe lo aprendido con retroalimentación inmediata y puntaje por área.</p></header>
      <Quiz />
    </main>)
}

export default function App() {
  const [h, setH] = useState(location.hash || '#inicio')
  const [menu, setMenu] = useState(false)
  useEffect(() => { const f = () => { setH(location.hash || '#inicio'); setMenu(false); if (!location.hash.startsWith('#modulos')) window.scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const mod = h.startsWith('#m-') ? h.slice(3) : null
  const eq = loadEquipo()
  const page = h === '#lab' ? <Lab /> : h === '#estacion-1' ? <Station1 /> : h === '#estacion-2' ? <Station2 /> : h === '#estacion-3' ? <Station3 /> : h === '#estacion-4' ? <Station4 /> : h === '#creditos' ? <Credits />
    : mod && MODULES.some(m => m.id === mod) ? <ModulePage key={mod} id={mod} /> : <Home />
  return (
    <>
      <header className="nav">
        <a href="#inicio" className="brand">Museo Anatómico <em>Radiocarpiano</em></a>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menú" aria-expanded={menu}>☰</button>
        <nav className={menu ? 'open' : ''}>
          {ESTACIONES.map(s => <a key={s.id} href={'#' + s.id} className={'st' + (h === '#' + s.id ? ' on' : '')}><b>E{s.n}</b> {s.corto}</a>)}
          <a href="#lab" className={h === '#lab' ? 'on' : ''}>Laboratorio 2D+3D</a>
          <details className="mods"><summary>Módulos</summary><div>{MODULES.map(m => <a key={m.id} href={`#m-${m.id}`} className={mod === m.id ? 'on' : ''}>{m.n}. {m.titulo}</a>)}</div></details>
        </nav>
      </header>
      {page}
      <footer className="credits">
        <p><a href="#creditos">Créditos y equipo</a> · {eq.curso} · {eq.docente} · {eq.integrantes.map(i => i.nombre).join(', ')}</p>
        <p>Modelo 3D: huesos de <b>BodyParts3D</b>, © The Database Center for Life Science (DBCLS), licencia CC BY-SA 2.1 JP; procesados (recorte, subdivisión, suavizado) para este museo. Ilustraciones: Moore (9.ª ed.), Latarjet–Ruiz Liard (5.ª ed.) y Rouvière–Delmas (11.ª ed.), uso académico privado.</p>
      </footer>
    </>
  )
}
