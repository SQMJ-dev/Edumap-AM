import { useState } from 'react'

export function Photo({ image, label = 'Imej sumber primer' }) {
  const [failed, setFailed] = useState(false)
  if (!image || failed) return <div className="flex h-28 items-center justify-center rounded-xl bg-[#EFE9DA] text-sm text-[#51606A]">{label}</div>
  return (
    <figure className="m-0">
      <img src={`${import.meta.env.BASE_URL}images/${image.src}`} alt={image.alt} onError={() => setFailed(true)} className="h-44 w-full rounded-xl object-cover" />
      <figcaption className="mt-1 text-xs text-mut">{image.credit}</figcaption>
    </figure>
  )
}

export function Quiz({ quiz, onClose }) {
  const [pick, setPick] = useState(null)
  const done = pick !== null
  return (
    <div className="rounded-xl border border-line bg-soft p-3 text-sm" role="group" aria-label="Latihan mini">
      <b>{quiz.q}</b>
      <div className="mt-2 grid gap-2">
        {quiz.options.map((o, i) => {
          const right = i === quiz.answer
          const cls = done && right ? 'border-teal bg-teal text-white' : done && i === pick ? 'border-[#9B2C2C] bg-[#9B2C2C] text-white' : 'border-line bg-card'
          return (
            <button key={o} type="button" disabled={done} onClick={() => setPick(i)}
              className={`rounded-lg border px-3 py-2 text-left font-medium disabled:cursor-default ${cls} ${done && !right && i !== pick ? 'opacity-60' : ''}`}>{o}</button>
          )
        })}
      </div>
      {done && <p className="mt-2"><b>{pick === quiz.answer ? 'Betul! ' : 'Belum tepat. '}</b>{quiz.explain}</p>}
      {onClose && <button type="button" onClick={onClose} className="mt-2 font-semibold underline">Tutup</button>}
    </div>
  )
}

export default function DetailPanel({ spot, tahun, empty }) {
  const [quiz, setQuiz] = useState(false)
  return (
    <aside className="flex flex-col gap-3 self-stretch rounded-2xl border border-line bg-card p-5" aria-live="polite">
      {spot ? (
        <>
          <span className="inline-block self-start rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">Tahun {tahun} · data contoh</span>
          <h2 className="font-display text-3xl font-bold">{spot.name}</h2>
          <p className="text-mut">{spot.place} · {spot.yearLabel}</p>
          <Photo image={spot.image} />
          <p>{spot.summary}</p>
          <h3 className="font-semibold">Apa yang berlaku</h3>
          <ul className="list-disc space-y-1 pl-5">{spot.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          <h3 className="font-semibold">Kenapa penting</h3>
          <p>{spot.why}</p>
          <div className="rounded-xl bg-soft p-3 text-sm">
            <b>Glosari</b>
            {spot.glossary.map(([t, d]) => <p key={t} className="text-mut"><b className="text-ink">{t}</b>: {d}</p>)}
          </div>
          <div className="flex-1" />
          {quiz ? <Quiz quiz={spot.quiz} onClose={() => setQuiz(false)} /> :
            <button type="button" onClick={() => setQuiz(true)} className="rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#1B2A2F]">Latihan mini</button>}
        </>
      ) : (
        <>
          <span className="inline-block self-start rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">Mula di sini</span>
          <h2 className="font-display text-3xl font-bold">{empty.title}</h2>
          <p className="text-mut">{empty.text}</p>
        </>
      )}
    </aside>
  )
}
