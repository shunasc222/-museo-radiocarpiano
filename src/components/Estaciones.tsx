import { useEffect, useState } from 'react'
import { ImageViewer, Ficha } from './Atlas'
import Wrist3D, { type LayerState } from './Wrist3D'
import { LAB_VIEWS, STRUCTURES, type View } from '../data/structures'
import { MESHES } from '../data/model3d'
import { byN, imgUrl, SRC_NAME } from '../data/images'
import { CONCEPTOS, OBJETIVOS, PLATE_MASKS, PRACTICE_PLATES, REPASO_MODULOS, DISECCION, CASOS, type Caso } from '../data/estaciones'
import { EQUIPO_POR_DEFECTO, type Equipo } from '../data/equipo'

export const ESTACIONES = [
  { n: 1, id: 'estacion-1', titulo: 'Preparación anatómica', corto: 'Preparación', desc: 'Repaso, objetivos y láminas con etiquetas ocultables.' },
  { n: 2, id: 'estacion-2', titulo: 'Disección virtual', corto: 'Disección', desc: 'Recorrido por planos, abordajes palmar y dorsal.' },
  { n: 3, id: 'estacion-3', titulo: 'Aplicación clínica', corto: 'Clínica', desc: 'Dos casos interactivos con decisiones y correlación.' },
  { n: 4, id: 'estacion-4', titulo: 'Autoevaluación', corto: 'Autoevaluación', desc: 'Quiz con retroalimentación inmediata y puntaje.' }
]
const mesh3d = (sid: string) => MESHES.some(m => m.sid === sid)

export function StationBar({ n }: { n: number }) {
  const e = ESTACIONES[n - 1], prev = ESTACIONES[n - 2], next = ESTACIONES[n]
  return (
    <div className="stbar">
      <ol>{ESTACIONES.map(s => <li key={s.n} className={s.n === n ? 'on' : s.n < n ? 'done' : ''}><a href={'#' + s.id}><b>{s.n}</b><span>{s.corto}</span></a></li>)}</ol>
      <p className="eyebrow">Estación {n} de 4 · {e.titulo}</p>
      <div className="stnav">{prev ? <a href={'#' + prev.id}>← {prev.corto}</a> : <span />}{next ? <a href={'#' + next.id}>{next.corto} →</a> : <a href="#lab">Laboratorio libre →</a>}</div>
    </div>)
}

/* ───────────── Estación 1 ───────────── */
function PracticePlate() {
  const [n, setN] = useState(PRACTICE_PLATES[0])
  const [hide, setHide] = useState(true)
  const [shown, setShown] = useState<Record<string, boolean>>({})
  const [sel, setSel] = useState<string | null>(null)
  const view = LAB_VIEWS.find(v => v.n === n)!
  const im = byN(n), masks = PLATE_MASKS[n] ?? []
  const key = (i: number) => n + ':' + i
  const allShown = view.hotspots.every((_, i) => shown[key(i)])
  return (
    <section className="block">
      <h2>Práctica con etiquetas</h2>
      <p className="muted">Oculte las etiquetas impresas, identifique cada punto numerado y revele la respuesta para comprobar. La lámina permanece fija.</p>
      <div className="tabs">{PRACTICE_PLATES.map(k => <button key={k} className={k === n ? 'on' : ''} onClick={() => { setN(k); setSel(null) }}>{LAB_VIEWS.find(v => v.n === k)!.titulo}</button>)}</div>
      <div className="tabs"><button className={hide ? 'on' : ''} onClick={() => setHide(true)}>Etiquetas ocultas</button><button className={!hide ? 'on' : ''} onClick={() => setHide(false)}>Etiquetas visibles</button>
        {hide && <button onClick={() => { const o: Record<string, boolean> = {}; view.hotspots.forEach((_, i) => { o[key(i)] = !allShown }); setShown(s => ({ ...s, ...o })) }}>{allShown ? 'Ocultar respuestas' : 'Revelar todas'}</button>}</div>
      <div className="atlasgrid">
        <figure className="frame">
          <div className={'imgwrap' + (sel ? ' hasSel' : '')}>
            <img src={imgUrl(im.file)} alt={im.cap} draggable={false} />
            {hide && masks.map((m, i) => <span key={i} className="mask" style={{ left: Math.max(0, m[0] - 2.5) + '%', top: Math.max(0, m[1] - 1) + '%', width: m[2] - m[0] + 5.5 + '%', height: m[3] - m[1] + 2 + '%' }} />)}
            {view.hotspots.map((h, i) => (
              <button key={i} className={'hot' + (sel === h.id ? ' on' : '') + (hide ? ' num' : '')} style={{ left: h.x + '%', top: h.y + '%' }} aria-label={hide && !shown[key(i)] ? 'Estructura ' + (i + 1) : h.label}
                onClick={() => { setSel(h.id); if (hide) setShown(s => ({ ...s, [key(i)]: !s[key(i)] })) }}><i>{hide ? i + 1 : ''}</i>
                {hide && shown[key(i)] && <em className="rev">{h.label}</em>}</button>))}
          </div>
          <figcaption><b>{im.cap}</b><span>{SRC_NAME[im.src]}</span></figcaption>
        </figure>
        <Ficha id={sel} onClose={() => setSel(null)} />
      </div>
      {hide && <p className="note">Las etiquetas impresas se cubren con recuadros: los trazos que señalan cada estructura permanecen. Compruebe cada respuesta tocando el punto.</p>}
    </section>)
}

export function Station1() {
  return (
    <main className="page">
      <StationBar n={1} />
      <header className="phead"><p className="eyebrow">Estación 1</p><h1>Preparación anatómica</h1><p className="lead">Antes de entrar al laboratorio, repase la articulación radiocarpiana y practique la identificación en láminas auténticas.</p></header>
      <div className="sections">
        <section className="sec"><h2>Objetivos de aprendizaje</h2><ul>{OBJETIVOS.map(o => <li key={o}>{o}</li>)}</ul></section>
        <section className="sec"><h2>Conceptos esenciales</h2><dl className="dl">{CONCEPTOS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></section>
      </div>
      <PracticePlate />
      <section className="block"><h2>Ruta de repaso</h2><p className="muted">Osteología, superficies articulares, cápsula, ligamentos y relaciones regionales. Cada módulo conserva su atlas interactivo y galería.</p>
        <ol className="modlist">{REPASO_MODULOS.map(([id, t, d], i) => <li key={id}><a href={'#m-' + id}><span className="num">{i + 1}</span><b>{t}</b><small>{d}</small><i aria-hidden>→</i></a></li>)}</ol>
        <p className="cta"><a className="btn" href="#lab">Abrir atlas + modelo 3D</a><a className="btn gold" href="#estacion-2">Continuar a la Estación 2 →</a></p></section>
    </main>)
}

/* ───────────── Estación 2 ───────────── */
const OFF: LayerState = { esqueleto: { on: false, op: 1 }, superficies: { on: false, op: 1 }, capsula: { on: false, op: 1 }, lig_rc: { on: false, op: 1 }, intercarpianos: { on: false, op: 1 }, tfcc: { on: false, op: 1 }, tendones: { on: false, op: 1 }, vasc: { on: false, op: 1 } }

export function Station2() {
  const [ab, setAb] = useState<'palmar' | 'dorsal'>('palmar')
  const [step, setStep] = useState(0)
  const [seen, setSeen] = useState<Record<string, boolean>>({})
  const [sel, setSel] = useState<string | null>(null)
  const [tab, setTab] = useState<'3d' | number>('3d')
  const [pista, setPista] = useState<string | null>(null)
  const pasos = DISECCION[ab], p = pasos[step]
  const k = (i: number, j: number) => ab + i + ':' + j
  const total = pasos.reduce((a, s) => a + s.identificar.length, 0)
  const nSeen = pasos.reduce((a, s, i) => a + s.identificar.filter((_, j) => seen[k(i, j)]).length, 0)
  useEffect(() => { setTab(p.modelo ? '3d' : p.placas[0]); setSel(null); setPista(null) }, [ab, step])
  const layers: LayerState = { ...OFF, ...(p.modelo?.layers ?? {}) } as LayerState
  const plate = typeof tab === 'number' ? tab : null
  const pv: View | null = plate ? (LAB_VIEWS.find(v => v.n === plate) ?? { n: plate, titulo: '', hotspots: [] }) : null
  const mark = (i: number, j: number) => setSeen(s => ({ ...s, [k(i, j)]: true }))
  return (
    <main className="page">
      <StationBar n={2} />
      <header className="phead compact"><h1>Disección virtual guiada</h1>
        <p className="lead">Planos de superficial a profundo, con capas 3D reales cuando existen y láminas 2D cuando no: <b>no es una disección simulada</b>.</p></header>
      <div className="tabs ab"><span className="lbl">Abordaje</span>{(['palmar', 'dorsal'] as const).map(a => <button key={a} className={ab === a ? 'on' : ''} onClick={() => { setAb(a); setStep(0) }}>{a === 'palmar' ? 'Palmar (anterior)' : 'Dorsal (posterior)'}</button>)}</div>
      <div className="dprog"><div className="progress"><span style={{ width: ((step + 1) / pasos.length) * 100 + '%' }} /></div>
        <p>Paso <b>{step + 1}</b> de {pasos.length} · {p.plano} · estructuras revisadas {nSeen}/{total}</p>
        <ol className="dots">{pasos.map((s, i) => <li key={i}><button className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setStep(i)} aria-label={'Paso ' + (i + 1) + ': ' + s.titulo}>{i + 1}</button></li>)}</ol></div>
      <div className="dgrid">
        <section className="dview">
          <div className="tabs">{p.modelo && <button className={tab === '3d' ? 'on' : ''} onClick={() => setTab('3d')}>Modelo 3D</button>}{p.placas.map((n, i) => <button key={n} className={tab === n ? 'on' : ''} onClick={() => setTab(n)} title={byN(n).cap}>Lámina 2D {i + 1}</button>)}</div>
          {tab === '3d' && p.modelo ? (
            <>
              <div className="viewer3d dv"><Wrist3D selected={sel} onSelect={setSel} layers={layers} showHand={p.modelo.hand} view={p.modelo.view} nonce={step + (ab === 'dorsal' ? 100 : 0)} focus />
                <div className="hint"><b>Visualización 3D</b><span>{p.modelo.view === 'palmar' ? 'Vista palmar' : 'Vista dorsal'} · arrastre para rotar</span></div></div>
              <p className="note">{p.modelo.nota3d}</p>
            </>
          ) : pv ? (
            <>{pv.hotspots.length ? <ImageViewer view={pv} selected={sel} onPick={setSel} /> : (
              <figure className="frame"><div className="imgwrap"><img src={imgUrl(byN(pv.n).file)} alt={byN(pv.n).cap} draggable={false} /></div><figcaption><b>{byN(pv.n).cap}</b><span>{SRC_NAME[byN(pv.n).src]}</span></figcaption></figure>)}
              {!p.modelo && <p className="note">Plano sin malla 3D verificada: se estudia con ilustraciones 2D auténticas.</p>}</>
          ) : null}
        </section>
        <section className="dinfo">
          <p className="eyebrow cyan">{p.plano}</p><h2>{p.titulo}</h2>
          <p className="obj"><b>Objetivo anatómico</b>{p.objetivo}</p>
          <p className="lbl">Estructuras que debe identificar</p>
          <ul className="ident">{p.identificar.map((it, j) => (
            <li key={j}><label><input type="checkbox" checked={!!seen[k(step, j)]} onChange={e => setSeen(s => ({ ...s, [k(step, j)]: e.target.checked }))} aria-label={'Revisada: ' + it.nombre} /></label>
              <button className={sel === it.id && it.id ? 'on' : ''} onClick={() => { mark(step, j); if (it.id) { setSel(it.id); setPista(null) } else setPista(pista === it.nombre ? null : it.nombre) }}>{it.nombre}{it.id && !mesh3d(it.id) ? <small> · 2D</small> : null}</button></li>))}</ul>
          {pista && <p className="note">{p.identificar.find(i => i.nombre === pista)?.pista ?? 'Sin ficha: estructura descrita en la lámina.'}</p>}
          {!pista && !sel && p.identificar.some(i => i.pista) && <p className="muted tinyhint">Toque una estructura para ver su ficha o una pista.</p>}
          <div className="rel"><b>Relaciones anatómicas</b><p>{p.relaciones}</p></div>
          {p.limit && <p className="note">{p.limit}</p>}
        </section>
      </div>
      {sel && STRUCTURES[sel] && <div className="dficha"><Ficha id={sel} onClose={() => setSel(null)} /></div>}
      <div className="dnav">
        <button className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}>← Anterior</button>
        {step < pasos.length - 1 ? <button className="btn gold" onClick={() => setStep(step + 1)}>Siguiente →</button>
          : <a className="btn gold" href="#estacion-3">Terminar y pasar a la Estación 3 →</a>}
      </div>
    </main>)
}

/* ───────────── Estación 3 ───────────── */
const shuf = (n: number) => { const a = Array.from({ length: n }, (_, k) => k); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
function CaseRunner({ c }: { c: Caso }) {
  const [order] = useState(() => c.preguntas.map(q => shuf(q.op.length)))
  const [i, setI] = useState(0)
  const [ans, setAns] = useState<(number | null)[]>(c.preguntas.map(() => null))
  const [sel, setSel] = useState<string | null>(null)
  const done = i >= c.preguntas.length
  const score = ans.filter((a, j) => a !== null && c.preguntas[j].op[a].ok).length
  const q = c.preguntas[i]
  const goLab = (id: string) => { try { sessionStorage.setItem('museo-pick', id) } catch { /* sin almacenamiento */ } location.hash = '#lab' }
  return (
    <article className="case">
      <header><p className="eyebrow cyan">Caso clínico · {c.tema}</p><h2>{c.titulo}</h2></header>
      <div className="cpres"><div><b>Presentación</b>{c.presentacion.map(t => <p key={t}>{t}</p>)}</div><div><b>Examen y estudios</b><ul>{c.hallazgos.map(t => <li key={t}>{t}</li>)}</ul></div></div>
      {!done ? (
        <div className="cq">
          <div className="progress"><span style={{ width: (i / c.preguntas.length) * 100 + '%' }} /></div>
          <p className="eyebrow">Pregunta {i + 1} de {c.preguntas.length} · {q.cat}</p><h3>{q.q}</h3>
          <div className="opts">{order[i].map(k => { const o = q.op[k]; return (
            <button key={k} disabled={ans[i] !== null} className={ans[i] !== null ? (o.ok ? 'ok' : ans[i] === k ? 'bad' : '') : ''} onClick={() => setAns(a => a.map((v, j) => j === i ? k : v))}>{o.t}</button>) })}</div>
          {ans[i] !== null && <p className={'fb ' + (q.op[ans[i]!].ok ? 'ok' : 'bad')}>{q.op[ans[i]!].fb} <br /><b>Explicación:</b> {q.porque}</p>}
          <button className="btn gold" disabled={ans[i] === null} onClick={() => setI(i + 1)}>{i === c.preguntas.length - 1 ? 'Ver resumen del caso' : 'Siguiente'}</button>
        </div>
      ) : (
        <div className="cres">
          <h3>Resumen · {score}/{c.preguntas.length} decisiones correctas</h3>
          <p>{c.resumen}</p>
          <p className="lbl">Correlación con el atlas · toque una estructura</p>
          <div className="chips">{c.estructuras.filter(id => STRUCTURES[id]).map(id => <button key={id} className={'chip sm' + (sel === id ? ' on' : '')} onClick={() => setSel(id)}>{STRUCTURES[id].nombre.replace(/ \(.*\)/, '')}</button>)}</div>
          {sel && <><Ficha id={sel} onClose={() => setSel(null)} /><p className="cta"><button className="btn" onClick={() => goLab(sel)}>Ver «{STRUCTURES[sel].nombre.replace(/ \(.*\)/, '')}» en el laboratorio</button></p></>}
          <p className="lbl">Láminas relacionadas</p>
          <div className="gallery">{c.placas.map(n => <a key={n} className="thumb" href={imgUrl(byN(n).file)} target="_blank" rel="noreferrer"><img loading="lazy" src={imgUrl(byN(n).file)} alt={byN(n).cap} /><span>{byN(n).cap}</span><small>{SRC_NAME[byN(n).src]}</small></a>)}</div>
          <p className="cta"><button className="btn" onClick={() => { setI(0); setAns(c.preguntas.map(() => null)); setSel(null) }}>Repetir el caso</button></p>
        </div>)}
    </article>)
}
export function Station3() {
  const [id, setId] = useState(CASOS[0].id)
  const c = CASOS.find(x => x.id === id)!
  return (
    <main className="page">
      <StationBar n={3} />
      <header className="phead"><p className="eyebrow">Estación 3</p><h1>Aplicación clínica</h1><p className="lead">Razone cada caso paso a paso, tome decisiones y vincule la clínica con las estructuras del atlas. Material docente: no sustituye la valoración clínica.</p></header>
      <div className="tabs">{CASOS.map((x, n) => <button key={x.id} className={x.id === id ? 'on' : ''} onClick={() => setId(x.id)}>Caso {n + 1} · {x.tema}</button>)}</div>
      <CaseRunner key={c.id} c={c} />
      <p className="cta"><a className="btn gold" href="#estacion-4">Continuar a la Estación 4 →</a></p>
    </main>)
}

/* ───────────── Créditos editables ───────────── */
const KEY = 'museo-equipo'
export function loadEquipo(): Equipo {
  try { const r = localStorage.getItem(KEY); if (r) return { ...EQUIPO_POR_DEFECTO, ...JSON.parse(r) } } catch { /* usar valores por defecto */ }
  return EQUIPO_POR_DEFECTO
}
export function Credits() {
  const [e, setE] = useState<Equipo>(loadEquipo)
  const [ok, setOk] = useState(false)
  const upd = (p: Partial<Equipo>) => { setE(x => ({ ...x, ...p })); setOk(false) }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(e)); setOk(true) } catch { setOk(false) } }
  const reset = () => { try { localStorage.removeItem(KEY) } catch { /* nada */ } setE(EQUIPO_POR_DEFECTO); setOk(false) }
  return (
    <main className="page credpage">
      <header className="phead"><p className="eyebrow">Presentación y colaboración</p><h1>Créditos y equipo</h1><p className="lead">Documente aquí la participación del equipo. Los cambios se guardan en este navegador; para dejarlos fijos en el proyecto, edite <code>src/data/equipo.ts</code>.</p></header>
      <div className="cform">
        <label>Curso<input value={e.curso} onChange={x => upd({ curso: x.target.value })} /></label>
        <label>Docente<input value={e.docente} onChange={x => upd({ docente: x.target.value })} /></label>
        <label>Fecha<input value={e.fecha} onChange={x => upd({ fecha: x.target.value })} /></label>
        <h2>Integrantes y contribución</h2>
        {e.integrantes.map((m, i) => (
          <div className="mrow" key={i}>
            <input aria-label={'Nombre ' + (i + 1)} value={m.nombre} onChange={x => upd({ integrantes: e.integrantes.map((y, j) => j === i ? { ...y, nombre: x.target.value } : y) })} />
            <input aria-label={'Contribución ' + (i + 1)} value={m.rol} onChange={x => upd({ integrantes: e.integrantes.map((y, j) => j === i ? { ...y, rol: x.target.value } : y) })} />
            <button className="chip" onClick={() => upd({ integrantes: e.integrantes.filter((_, j) => j !== i) })} aria-label="Quitar integrante">Quitar</button>
          </div>))}
        <div className="sact"><button className="chip" onClick={() => upd({ integrantes: [...e.integrantes, { nombre: 'Nuevo integrante', rol: 'Contribución' }] })}>Agregar integrante</button>
          <button className="btn gold" onClick={save}>Guardar</button><button className="btn" onClick={reset}>Restablecer</button>{ok && <span className="muted">Guardado en este navegador.</span>}</div>
      </div>
      <section className="block"><h2>Fuentes y licencias</h2>
        <ul className="sec"><li>Modelo 3D: BodyParts3D © DBCLS, CC BY-SA 2.1 JP (procesado para este museo).</li><li>Ilustraciones: Moore (9.ª ed.), Latarjet–Ruiz Liard (5.ª ed.), Rouvière–Delmas (11.ª ed.), uso académico privado.</li><li>Textos de las fichas: síntesis docente sin citas de página; deben ser revisados por el docente.</li></ul></section>
    </main>)
}
