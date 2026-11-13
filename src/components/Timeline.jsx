import { fmtYear } from '../data/spots'

export default function Timeline({ topic, year, onChange, playing, onTogglePlay, activeId, onSelect, prev, next }) {
  const { min, max, spots } = topic
  const pct = (y) => ((y - min) / (max - min)) * 100
  const ticks = Array.from({ length: 6 }, (_, i) => Math.round(min + ((max - min) * i) / 5))
  return (
    <div className="mt-5 rounded-2xl border border-line bg-card px-5 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <b>Garis masa · {topic.name}</b>
        <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#1B2A2F]">Templat: Garis masa</span>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onTogglePlay} className="rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#1B2A2F]">{playing ? 'Jeda' : 'Main'}</button>
        <button type="button" disabled={!prev} onClick={() => onSelect(prev)} className="rounded-xl border border-line bg-card px-3 py-2.5 font-semibold disabled:opacity-40">‹ Sebelumnya</button>
        <button type="button" disabled={!next} onClick={() => onSelect(next)} className="rounded-xl border border-line bg-card px-3 py-2.5 font-semibold disabled:opacity-40">Seterusnya ›</button>
        <div className="min-w-[6.5em] font-display text-2xl font-bold" aria-live="polite">{fmtYear(year)}</div>
      </div>
      <div className="relative h-5">
        {spots.map((s) => (
          <button key={s.id} type="button" title={`${s.name} · ${s.yearLabel}`} aria-label={`${s.name}, ${s.yearLabel}`} onClick={() => onSelect(s)} style={{ left: `${pct(s.year)}%` }}
            className={`absolute top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 p-0 ${s.id === activeId ? 'border-ink bg-gold' : 'border-card bg-teal'}`} />
        ))}
      </div>
      <input type="range" className="range" min={min} max={max} step={(max - min) / 1000} value={year} aria-label={`Garis masa ${fmtYear(min)} hingga ${fmtYear(max)}`}
        style={{ '--p': `${pct(year)}%` }} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="relative mt-1 h-6 text-sm text-mut">
        {ticks.map((t, i) => (
          <span key={t} className="absolute top-0" style={{ left: `${pct(t)}%`, transform: i === 0 ? 'none' : i === 5 ? 'translateX(-100%)' : 'translateX(-50%)' }}>{fmtYear(t)}</span>
        ))}
      </div>
    </div>
  )
}
