import { MODULES } from '../data/modules'
import { byN, imgUrl, SRC_NAME } from '../data/images'
import { ESTACIONES } from './Estaciones'

export default function Home() {
  const fig = byN(26)
  return (
    <>
      <section className="hero2">
        <figure className="plate" aria-label={fig.cap}>
          <div className="plateimg"><img src={imgUrl(fig.file)} alt={fig.cap} /></div>
          <figcaption>Lámina · {fig.cap}<br />{SRC_NAME[fig.src]}</figcaption>
        </figure>
        <div className="herotext2">
          <p className="eyebrow">Pontificia Universidad Católica del Ecuador · Sede Santo Domingo</p>
          <h1>Articulación<br /><em>radiocarpiana</em></h1>
          <p className="kicker">Museo anatómico interactivo</p>
          <p className="lead">Atlas auténtico, recreación tridimensional y fichas de estudio de la muñeca. Carrera de Medicina · Morfofunción Osteomuscular.</p>
          <div className="cta"><a className="btn gold" href="#estacion-1">Iniciar exploración</a><a className="btn ghost" href="#modulos">Explorar módulos</a></div>
          <p className="facts"><span><b>4</b> estaciones</span><span><b>10</b> módulos</span><span><b>64</b> láminas</span><span><b>2D + 3D</b> sincronizados</span></p>
        </div>
      </section>
      <section id="estaciones" className="modsec stsec">
        <div className="modhead"><p className="eyebrow">Laboratorio de práctica</p><h2 className="big">Cuatro estaciones <em>en secuencia</em></h2></div>
        <ol className="modlist stlist">{ESTACIONES.map(s => (
          <li key={s.id}><a href={'#' + s.id}><span className="num">{s.n}</span><b>{s.titulo}</b><small>{s.desc}</small><i aria-hidden>→</i></a></li>))}</ol>
      </section>
      <section id="modulos" className="modsec">
        <div className="modhead"><p className="eyebrow">Recorrido</p><h2 className="big">Diez módulos <em>de estudio</em></h2></div>
        <ol className="modlist">{MODULES.map(m => (
          <li key={m.id}><a href={`#m-${m.id}`}><span className="num">{String(m.n).padStart(2, '0')}</span><b>{m.titulo}</b><small>{m.lema}</small><i aria-hidden>→</i></a></li>))}</ol>
        <a className="labband" href="#lab"><span className="eyebrow">Función central</span><b>Laboratorio comparativo <em>2D + 3D</em></b><small>Atlas a la izquierda, modelo tridimensional a la derecha, ficha sincronizada.</small></a>
      </section>
    </>
  )
}
