import { TOPICS } from '../data/spots'

const MIN = 0, MAX = 1965
const pct = (y) => ((y - MIN) / (MAX - MIN)) * 100
const colors = ['bg-teal', 'bg-gold']

export default function Overview({ unlocked, onOpen }) {
  const timelineTopics = [4, 5, 6].flatMap((t) => TOPICS[t].filter((x) => x.template === 'timeline').map((tp) => ({ tp, t })))
  const rows = timelineTopics.flatMap(({ tp, t }) => tp.spots.map((s) => ({ tahun: t, topic: tp, spot: s }))).sort((a, b) => a.spot.year - b.spot.year)
  return (
    <div className="px-6 pb-6">
      <div className="mb-4">
        <h2 className="font-display text-4xl font-bold">Garis masa Malaysia</h2>
        <p className="text-mut">Semua peristiwa bertarikh dalam prototaip ini. Klik satu peristiwa untuk membuka topiknya.</p>
      </div>
      <div className="rounded-2xl border border-line bg-card p-5">
        <div className="relative h-4 rounded-full bg-line">
          {timelineTopics.map(({ tp }, i) => (
            <div key={tp.id} className={`absolute top-0 h-4 opacity-80 ${colors[i % 2]}`} style={{ left: `${pct(tp.min)}%`, width: `${pct(tp.max) - pct(tp.min)}%` }} />
          ))}
          {rows.map((r) => (
            <button key={r.spot.id} type="button" title={`${r.spot.name} · ${r.spot.yearLabel}`} aria-label={`${r.spot.name}, ${r.spot.yearLabel}`} onClick={() => onOpen(r)}
              style={{ left: `${pct(r.spot.year)}%` }} className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-ink p-0" />
          ))}
        </div>
        <div className="relative mt-3 h-5 text-sm text-mut">
          {[0, 500, 1000, 1500, 1965].map((t, i) => (
            <span key={t} className="absolute top-0" style={{ left: `${pct(t)}%`, transform: i === 0 ? 'none' : i === 4 ? 'translateX(-100%)' : 'translateX(-50%)' }}>{t} M</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          {timelineTopics.map(({ tp, t }, i) => (
            <span key={tp.id} className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${colors[i % 2]}`} />{tp.name} (Tahun {t})</span>
          ))}
        </div>
      </div>
      <ol className="mt-5 grid gap-3 md:grid-cols-2">
        {rows.map((r) => (
          <li key={r.spot.id} className="list-none">
            <button type="button" onClick={() => onOpen(r)} className="w-full rounded-xl border border-line bg-card p-4 text-left hover:bg-soft">
              <span className="block text-sm text-mut">{r.spot.yearLabel}</span>
              <b className="block text-lg">{r.spot.name}</b>
              <span className="text-sm text-mut">{r.spot.place} · {r.topic.name} · Tahun {r.tahun}{r.tahun > 4 && !unlocked ? ' · berkunci' : ''}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-mut">Topik tanpa tarikh (Zaman Prasejarah, Tokoh Terbilang, Yang di-Pertuan Agong) tidak muncul di sini.</p>
    </div>
  )
}
