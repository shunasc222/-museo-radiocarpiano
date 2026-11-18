import { useState } from 'react'
import Wrist3D from './Wrist3D'
import { QUIZ, ID_TASKS } from '../data/quiz'
import { STRUCTURES } from '../data/structures'

type Item = { kind: 'id'; target: string } | { kind: 'mcq'; i: number }
const ITEMS: Item[] = [...ID_TASKS.map(t => ({ kind: 'id' as const, target: t })), ...QUIZ.map((_, i) => ({ kind: 'mcq' as const, i }))]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState<(string | number | null)[]>(ITEMS.map(() => null))
  const [mark, setMark] = useState<(boolean | null)[]>(ITEMS.map(() => null))
  const [pickedId, setPickedId] = useState<string | null>(null)
  const done = step >= ITEMS.length
  const it = ITEMS[step]
  const record = (a: string | number, ok: boolean) => {
    if (mark[step] !== null) return
    setAns(x => x.map((v, i) => i === step ? a : v)); setMark(x => x.map((v, i) => i === step ? ok : v))
  }
  const restart = () => { setStep(0); setAns(ITEMS.map(() => null)); setMark(ITEMS.map(() => null)); setPickedId(null) }
  if (done) {
    const ok = mark.filter(Boolean).length, pct = Math.round(ok / ITEMS.length * 100)
    return (
      <div className="result">
        <p className="eyebrow">Resultado</p><h2>{ok} / {ITEMS.length}</h2><p className="lead">{pct} % de aciertos — {pct >= 80 ? 'Excelente dominio de la región.' : pct >= 60 ? 'Buen avance; repase los módulos de las respuestas falladas.' : 'Conviene repasar los módulos 2, 3 y 5 antes de reintentar.'}</p>
        <ul className="review">{ITEMS.map((x, i) => (
          <li key={i} className={mark[i] ? 'ok' : 'bad'}>
            <b>{mark[i] ? 'Correcta' : 'Incorrecta'}</b>{' '}
            {x.kind === 'id' ? `Identificar: ${STRUCTURES[x.target].nombre}` : QUIZ[x.i].q}
            {!mark[i] && <small>{x.kind === 'id' ? STRUCTURES[x.target].morfologia : QUIZ[x.i].fb}</small>}
          </li>))}</ul>
        <button className="btn gold" onClick={restart}>Reintentar</button>
      </div>)
  }
  const answered = mark[step] !== null
  return (
    <div className="quiz">
      <div className="progress"><span style={{ width: (step / ITEMS.length) * 100 + '%' }} /></div>
      <p className="eyebrow">{it.kind === 'id' ? 'Identificación en 3D' : QUIZ[it.i].caso ? 'Caso clínico' : 'Pregunta anatómica'} · {step + 1}/{ITEMS.length}</p>
      {it.kind === 'id' ? (
        <>
          <h3>Seleccione en el modelo: <em>{STRUCTURES[it.target].nombre.replace(/ \(.*\)/, '')}</em></h3>
          <div className="viewer3d small"><Wrist3D selected={pickedId} view="palmar" nonce={0}
            onSelect={id => { if (!id || answered) return; setPickedId(id); record(id, id === it.target) }} /></div>
          {answered && <p className={'fb ' + (mark[step] ? 'ok' : 'bad')}>{mark[step] ? 'Correcto. ' : `Incorrecto: seleccionó ${STRUCTURES[ans[step] as string]?.nombre ?? 'otra estructura'}. `}{STRUCTURES[it.target].ubicacion}</p>}
        </>
      ) : (
        <>
          <h3>{QUIZ[it.i].q}</h3>
          <div className="opts">{QUIZ[it.i].o.map((o, k) => (
            <button key={k} disabled={answered} className={answered ? (k === QUIZ[it.i].a ? 'ok' : ans[step] === k ? 'bad' : '') : ''} onClick={() => record(k, k === QUIZ[it.i].a)}>{o}</button>))}</div>
          {answered && <p className={'fb ' + (mark[step] ? 'ok' : 'bad')}>{mark[step] ? 'Correcto. ' : 'Incorrecto. '}{QUIZ[it.i].fb}</p>}
        </>)}
      <button className="btn gold" disabled={!answered} onClick={() => { setStep(step + 1); setPickedId(null) }}>{step === ITEMS.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>
    </div>
  )
}
