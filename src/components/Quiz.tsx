import { useMemo, useState } from 'react'
import Wrist3D from './Wrist3D'
import { QUIZ, ID_TASKS, type Cat } from '../data/quiz'
import { STRUCTURES } from '../data/structures'

type Item = { kind: 'id'; target: string; cat: string } | { kind: 'mcq'; i: number; cat: string }
const ID_CAT = 'Identificación visual (3D)'
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }
const pool = (c: Cat): Item[] => QUIZ.map((q, i) => ({ q, i })).filter(x => x.q.cat === c).map(x => ({ kind: 'mcq', i: x.i, cat: c }))
const ids = (): Item[] => ID_TASKS.map(t => ({ kind: 'id', target: t, cat: ID_CAT }))
const build = (full: boolean): Item[] => full
  ? [...shuffle(ids()), ...shuffle(QUIZ.map((q, i): Item => ({ kind: 'mcq', i, cat: q.cat ?? 'Razonamiento clínico' })))]
  : [...shuffle(ids()).slice(0, 3), ...shuffle(pool('Osteología y superficies')).slice(0, 1), ...shuffle(pool('Ligamentos y relaciones')).slice(0, 2), ...shuffle(pool('Biomecánica')).slice(0, 2), ...shuffle(pool('Razonamiento clínico')).slice(0, 2)]

export default function Quiz() {
  const [items, setItems] = useState<Item[] | null>(null)
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState<(string | number | null)[]>([])
  const [mark, setMark] = useState<(boolean | null)[]>([])
  const [pickedId, setPickedId] = useState<string | null>(null)
  const start = (full: boolean) => { const it = build(full); setItems(it); setStep(0); setAns(it.map(() => null)); setMark(it.map(() => null)); setPickedId(null) }
  const orders = useMemo(() => (items ?? []).map(it => it.kind === 'mcq' ? shuffle(QUIZ[it.i].o.map((_, k) => k)) : []), [items])
  const nQ = useMemo(() => ({ quick: 10, full: ID_TASKS.length + QUIZ.length }), [])
  if (!items) return (
    <div className="quiz">
      <p className="eyebrow">Estación 4 · Autoevaluación</p>
      <h3>Elija el tipo de práctica</h3>
      <p className="muted">Incluye identificación visual en el modelo 3D, relaciones ligamentarias, biomecánica y razonamiento clínico. Cada respuesta recibe retroalimentación inmediata; al final verá su puntuación por área y podrá repetir.</p>
      <div className="opts"><button onClick={() => start(false)}><b>Práctica rápida · {nQ.quick} preguntas</b><br /><small>3 identificaciones 3D, 1 osteología, 2 ligamentos, 2 biomecánica, 2 clínica (se sortean en cada intento)</small></button>
        <button onClick={() => start(true)}><b>Examen completo · {nQ.full} preguntas</b><br /><small>Todas las identificaciones y preguntas, en orden aleatorio</small></button></div>
    </div>)
  const done = step >= items.length
  const it = items[step]
  const record = (a: string | number, ok: boolean) => {
    if (mark[step] !== null) return
    setAns(x => x.map((v, i) => i === step ? a : v)); setMark(x => x.map((v, i) => i === step ? ok : v))
  }
  if (done) {
    const ok = mark.filter(Boolean).length, pct = Math.round(ok / items.length * 100)
    const cats = [...new Set(items.map(i => i.cat))].map(c => { const ix = items.map((x, i) => x.cat === c ? i : -1).filter(i => i >= 0); return [c, ix.filter(i => mark[i]).length, ix.length] as [string, number, number] })
    return (
      <div className="result">
        <p className="eyebrow">Resultado</p><h2>{ok} / {items.length}</h2><p className="lead">{pct} % de aciertos — {pct >= 80 ? 'Excelente dominio de la región.' : pct >= 60 ? 'Buen avance; repase las áreas con menor puntaje.' : 'Conviene repasar las Estaciones 1 y 2 antes de reintentar.'}</p>
        <ul className="bycat">{cats.map(([c, a, n]) => <li key={c}><span>{c}</span><b>{a}/{n}</b><i style={{ width: (a / n) * 100 + '%' }} /></li>)}</ul>
        <ul className="review">{items.map((x, i) => (
          <li key={i} className={mark[i] ? 'ok' : 'bad'}>
            <b>{mark[i] ? 'Correcta' : 'Incorrecta'}</b> <em>{x.cat}</em>{' '}
            {x.kind === 'id' ? `Identificar: ${STRUCTURES[x.target].nombre}` : QUIZ[x.i].q}
            {!mark[i] && <small>{x.kind === 'id' ? 'Ubicación: ' + STRUCTURES[x.target].ubicacion : QUIZ[x.i].fb}</small>}
          </li>))}</ul>
        <div className="sact"><button className="btn gold" onClick={() => start(items.length > 10)}>Repetir</button><button className="btn" onClick={() => setItems(null)}>Cambiar de práctica</button></div>
      </div>)
  }
  const answered = mark[step] !== null
  return (
    <div className="quiz">
      <div className="progress"><span style={{ width: (step / items.length) * 100 + '%' }} /></div>
      <p className="eyebrow">{it.cat}{it.kind === 'mcq' && QUIZ[it.i].caso ? ' · caso' : ''} · {step + 1}/{items.length}</p>
      {it.kind === 'id' ? (
        <>
          <h3>Seleccione en el modelo: <em>{STRUCTURES[it.target].nombre.replace(/ \(.*\)/, '')}</em></h3>
          <div className="viewer3d small"><Wrist3D selected={pickedId} view="palmar" nonce={0} showHand={false}
            onSelect={id => { if (!id || answered) return; setPickedId(id); record(id, id === it.target) }} /></div>
          {answered && <p className={'fb ' + (mark[step] ? 'ok' : 'bad')}>{mark[step] ? 'Correcto. ' : `Incorrecto: seleccionó ${STRUCTURES[ans[step] as string]?.nombre ?? 'otra estructura'}. `}{STRUCTURES[it.target].ubicacion}</p>}
        </>
      ) : (
        <>
          <h3>{QUIZ[it.i].q}</h3>
          <div className="opts">{orders[step].map(k => (
            <button key={k} disabled={answered} className={answered ? (k === QUIZ[it.i].a ? 'ok' : ans[step] === k ? 'bad' : '') : ''} onClick={() => record(k, k === QUIZ[it.i].a)}>{QUIZ[it.i].o[k]}</button>))}</div>
          {answered && <p className={'fb ' + (mark[step] ? 'ok' : 'bad')}>{mark[step] ? 'Correcto. ' : 'Incorrecto. '}{QUIZ[it.i].fb}</p>}
        </>)}
      <button className="btn gold" disabled={!answered} onClick={() => { setStep(step + 1); setPickedId(null) }}>{step === items.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>
    </div>
  )
}
