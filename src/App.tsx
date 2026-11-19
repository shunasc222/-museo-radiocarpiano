import { useEffect, useState } from 'react'
import Home from './components/Home'
import Lab from './components/Lab'
import ModulePage from './components/ModulePage'
import { MODULES } from './data/modules'

export default function App() {
  const [h, setH] = useState(location.hash || '#inicio')
  const [menu, setMenu] = useState(false)
  useEffect(() => { const f = () => { setH(location.hash || '#inicio'); setMenu(false); if (!location.hash.startsWith('#modulos')) window.scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const mod = h.startsWith('#m-') ? h.slice(3) : null
  return (
    <>
      <header className="nav">
        <a href="#inicio" className="brand">Museo Anatómico <em>Radiocarpiano</em></a>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menú">☰</button>
        <nav className={menu ? 'open' : ''}>
          <a href="#lab" className={h === '#lab' ? 'on' : ''}>Laboratorio 2D+3D</a>
          {MODULES.map(m => <a key={m.id} href={`#m-${m.id}`} className={mod === m.id ? 'on' : ''}>{m.n}. {m.titulo}</a>)}
        </nav>
      </header>
      {h === '#lab' ? <Lab /> : mod && MODULES.some(m => m.id === mod) ? <ModulePage key={mod} id={mod} /> : <Home />}
      <footer className="credits">Modelo 3D: huesos de <b>BodyParts3D</b>, © The Database Center for Life Science (DBCLS), licencia CC BY-SA 2.1 JP; procesados (recorte, subdivisión, suavizado) para este museo. Ilustraciones: Moore (9.ª ed.), Latarjet–Ruiz Liard (5.ª ed.) y Rouvière–Delmas (11.ª ed.), uso académico privado.</footer>
    </>
  )
}
