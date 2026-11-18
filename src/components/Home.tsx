import Wrist3D from './Wrist3D'
import { MODULES } from '../data/modules'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="herocanvas"><Wrist3D selected={null} onSelect={() => {}} view="palmar" nonce={0} autoRotate zoom={false} /></div>
        <div className="herotext">
          <p className="eyebrow">Pontificia Universidad Católica del Ecuador · Sede Santo Domingo</p>
          <h1>Museo Anatómico <em>Interactivo</em></h1>
          <h2>Articulación radiocarpiana</h2>
          <p className="lead">Un recorrido por la muñeca: atlas anatómico auténtico, recreación tridimensional y fichas de estudio para la carrera de Medicina — Morfofunción Osteomuscular.</p>
          <div className="cta"><a className="btn gold" href="#/lab">Iniciar exploración</a><a className="btn" href="#modulos">Explorar módulos</a></div>
        </div>
      </section>
      <section id="modulos" className="modsec">
        <p className="eyebrow">Recorrido</p><h2 className="big">Diez módulos</h2>
        <div className="modgrid">{MODULES.map(m => (
          <a key={m.id} href={`#/m/${m.id}`} className="mod"><span className="num">{String(m.n).padStart(2, '0')}</span><b>{m.titulo}</b><small>{m.lema}</small></a>))}</div>
        <a className="labcard" href="#/lab"><span className="eyebrow">Función central</span><b>Laboratorio comparativo 2D + 3D</b><small>Atlas auténtico a la izquierda, modelo tridimensional a la derecha, ficha anatómica sincronizada.</small></a>
      </section>
    </>
  )
}
