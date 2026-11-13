import { TOPICS } from '../data/spots'

const THEMES = { 4: 'Sejarah Awal Negara', 5: '[perlu disemak]', 6: 'Kemakmuran Negara Kita' }

export default function Home({ unlocked, onStart, onOverview }) {
  return (
    <div className="px-6 pb-10 pt-6">
      <h2 className="max-w-3xl font-display text-5xl font-bold">Teroka sejarah Malaysia di atas peta</h2>
      <p className="mt-2 text-lg text-mut">Pilih tahun anda untuk bermula.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[4, 5, 6].map((n) => {
          const free = n === 4 || unlocked
          const ready = TOPICS[n].filter((t) => !t.soon)
          const later = TOPICS[n].length - ready.length
          return (
            <section key={n} className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl font-bold">Tahun {n}</h3>
                {n === 4
                  ? <span className="rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">Percuma</span>
                  : <span className="text-sm font-semibold text-mut">{unlocked ? 'Dibuka' : 'Berkunci'}</span>}
              </div>
              <p className="text-mut">Tema: {THEMES[n]}</p>
              <ul className="list-disc space-y-0.5 pl-5">{ready.map((t) => <li key={t.id}>{t.name}</li>)}</ul>
              {later > 0 && <p className="text-sm text-mut">+ {later} topik lagi akan datang</p>}
              <div className="flex-1" />
              <button type="button" onClick={() => onStart(n)}
                className={free ? 'rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#1B2A2F]' : 'rounded-xl border border-line bg-card px-4 py-2.5 font-semibold'}>
                {free ? 'Mula belajar' : 'Buka kunci · RM19 – RM29'}
              </button>
            </section>
          )
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onOverview} className="rounded-xl border border-line bg-card px-4 py-2.5 font-semibold">Lihat garis masa Malaysia</button>
        <span className="text-sm text-mut">Semua peristiwa bertarikh dalam satu paparan.</span>
      </div>
    </div>
  )
}
