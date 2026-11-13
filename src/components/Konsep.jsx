import { Quiz, Photo } from './DetailPanel'

const box = 'rounded-2xl border border-line bg-card p-5'

export default function Konsep({ topic, tahun }) {
  return (
    <div className="px-6 pb-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">Tahun {tahun} · data contoh</span>
          <h2 className="mt-1 font-display text-4xl font-bold">{topic.name}</h2>
        </div>
        <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#1B2A2F]">Templat: Konsep</span>
      </div>
      <p className="mb-5 max-w-3xl">{topic.intro}</p>
      <div className="grid gap-5 md:grid-cols-3">
        {topic.cards.map((c) => (
          <article key={c.title} className={box}>
            <h3 className="font-display text-xl font-bold">{c.title}</h3>
            <div className="my-3"><Photo image={c.image} label={c.img} /></div>
            <p>{c.text}</p>
            <p className="mt-2 text-sm text-mut">[Semak butiran ini dengan buku teks KSSR]</p>
          </article>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className={box}>
          <h3 className="font-display text-xl font-bold">Glosari</h3>
          {topic.glossary.map(([t, d]) => <p key={t} className="mt-2 text-mut"><b className="text-ink">{t}</b>: {d}</p>)}
        </div>
        <div className={box}>
          <h3 className="font-display text-xl font-bold">Semak kefahaman</h3>
          <div className="mt-3 grid gap-3">{topic.quizzes.map((q) => <Quiz key={q.q} quiz={q} />)}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-mut">Tiada peta atau garis masa kerana topik ini tentang konsep, bukan tempat atau tarikh.</p>
    </div>
  )
}
