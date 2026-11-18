import { useEffect, useState } from 'react'
import Home from './components/Home'
import Lab from './components/Lab'
import ModulePage from './components/ModulePage'
import { MODULES } from './data/modules'

export default function App() {
  const [h, setH] = useState(location.hash || '#/')
  const [menu, setMenu] = useState(false)
  useEffect(() => { const f = () => { setH(location.hash || '#/'); setMenu(false); if (!location.hash.startsWith('#modulos')) window.scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const mod = h.startsWith('#/m/') ? h.slice(4) : null
  return (
    <>
      <header className="nav">
        <a href="#/" className="brand">Museo Anatómico <em>Radiocarpiano</em></a>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menú">☰</button>
        <nav className={menu ? 'open' : ''}>
          <a href="#/lab" className={h === '#/lab' ? 'on' : ''}>Laboratorio 2D+3D</a>
          {MODULES.map(m => <a key={m.id} href={`#/m/${m.id}`} className={mod === m.id ? 'on' : ''}>{m.n}. {m.titulo}</a>)}
        </nav>
      </header>
      {h === '#/lab' ? <Lab /> : mod && MODULES.some(m => m.id === mod) ? <ModulePage key={mod} id={mod} /> : <Home />}
    </>
  )
}
