import { useEffect, useMemo, useState } from 'react'
import { TOPICS } from './data/spots'
import MapView from './components/MapView'
import Timeline from './components/Timeline'
import DetailPanel from './components/DetailPanel'
import UnlockDialog from './components/UnlockDialog'
import Konsep from './components/Konsep'
import Portrait from './components/Portrait'
import Overview from './components/Overview'
import Home from './components/Home'
import ExportDialog from './components/ExportDialog'
import Worksheet, { resolveCfg } from './components/Worksheet'

const SOON = 'Segera'
const off = 'disabled:cursor-not-allowed disabled:opacity-50'
const ghost = 'rounded-xl border border-line bg-card px-4 py-2.5 text-[15px] font-semibold'
const firstTopic = (t) => TOPICS[t].find((x) => !x.soon)

export default function App() {
  const [tahun, setTahun] = useState(4)
  const [topic, setTopic] = useState(firstTopic(4))
  const [year, setYear] = useState(topic.min ?? 0)
  const [selId, setSelId] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [tv, setTv] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [ask, setAsk] = useState(null)
  const [view, setView] = useState('home')
  const [exp, setExp] = useState(false)
  const [cfg, setCfg] = useState({ type: 'peta', key: true, center: '' })
  const [tip, setTip] = useState(true)
  const timeline = topic.template === 'timeline'
  const tokoh = topic.template === 'tokoh'
  const konsep = topic.template === 'konsep'

  const open = (t, y = tahun, spot = null) => {
    setTahun(y); setTopic(t); setPlaying(false); setView('topic')
    setYear(spot && t.template === 'timeline' ? spot.year : t.min ?? 0)
    setSelId(spot && t.template !== 'timeline' ? spot.id : t.template === 'tokoh' ? t.spots[0].id : null)
  }
  const goTahun = (n) => { if (n > 4 && !unlocked) setAsk({ n }); else open(firstTopic(n), n) }
  const fromOverview = (r) => { if (r.tahun > 4 && !unlocked) setAsk({ n: r.tahun, topic: r.topic, spot: r.spot }); else open(r.topic, r.tahun, r.spot) }

  const active = useMemo(() => timeline ? [...topic.spots].reverse().find((s) => s.year <= year) ?? null : topic.spots.find((s) => s.id === selId) ?? null, [topic, year, selId, timeline])
  const prev = timeline ? [...topic.spots].reverse().find((s) => s.year < year) : null
  const next = timeline ? topic.spots.find((s) => s.year > year) : null

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setYear((y) => Math.min(topic.max, y + (topic.max - topic.min) / 400)), 35)
    return () => clearInterval(id)
  }, [playing, topic])
  useEffect(() => { if (timeline && year >= topic.max) setPlaying(false) }, [year, topic, timeline])
  useEffect(() => {
    document.documentElement.classList.toggle('tv', tv)
    if (tv) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
  }, [tv])

  const select = (s) => { setPlaying(false); if (timeline) setYear(s.year); else setSelId(s.id) }
  const togglePlay = () => { if (!playing && year >= topic.max) setYear(topic.min); setPlaying((p) => !p) }
  const empty = timeline ? { title: topic.name, text: 'Seret penggelongsor ke kanan. Setiap penanda pada peta muncul apabila peristiwanya berlaku, dan butiran terbaru dipaparkan di sini.' }
    : { title: topic.name, text: tokoh ? 'Pilih satu peristiwa pada garis masa hayat atau pada peta.' : 'Klik satu tapak pada peta atau senarai di bawah peta untuk melihat butirannya.' }

  return (
    <>
      <header className="flex flex-wrap items-center gap-4 px-6 py-5">
        <h1>
          <button type="button" onClick={() => setView('home')} aria-label="Laman utama" className="flex items-center gap-4 text-left">
            <span className="h-9 w-9 rounded-full bg-teal" aria-hidden="true" />
            <span className="font-display text-2xl font-bold">EduMap: Sejarah</span>
          </button>
        </h1>
        {!tv && (
          <nav className="ml-8 flex gap-2" aria-label="Tahun">
            {[4, 5, 6].map((n) => (
              <button key={n} type="button" onClick={() => goTahun(n)} aria-current={view === 'topic' && n === tahun ? 'page' : undefined}
                className={view === 'topic' && n === tahun ? 'rounded-xl bg-teal px-4 py-2.5 text-[15px] font-semibold text-white' : ghost}>
                Tahun {n}{n > 4 && !unlocked ? ' · berkunci' : ''}
              </button>
            ))}
          </nav>
        )}
        <div className="flex-1" />
        {!tv && <button type="button" onClick={() => setView((v) => (v === 'overview' ? 'topic' : 'overview'))} className={ghost}>{view === 'overview' ? 'Kembali ke topik' : 'Garis masa Malaysia'}</button>}
        <button type="button" onClick={() => setTv((v) => !v)} className={ghost}>{tv ? 'Keluar Mod TV' : 'Mod TV'}</button>
        {!tv && (
          <>
            <button type="button" onClick={() => setExp(true)} className="rounded-xl bg-gold px-4 py-2.5 text-[15px] font-semibold text-[#1B2A2F]">Eksport PDF</button>
            <button type="button" disabled title={SOON} className={`${ghost} ${off}`}>Log masuk</button>
          </>
        )}
      </header>

      {tip && (
        <div className="mx-6 mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 text-sm">
          <b>Cuba ini:</b>
          <span>① seret garis masa ② klik penanda pada peta ③ tukar topik atau Tahun ④ cuba Mod TV ⑤ tekan Eksport PDF.</span>
          <button type="button" onClick={() => setTip(false)} className="ml-auto rounded-lg border border-line px-3 py-1 font-semibold">Faham</button>
        </div>
      )}
      {view === 'home' ? <Home unlocked={unlocked} onStart={goTahun} onOverview={() => setView('overview')} /> : view === 'overview' ? <Overview unlocked={unlocked} onOpen={fromOverview} /> : (
      <>
      <div className="px-6 pb-4">
        <p className="text-sm text-mut">Tahun {tahun} › <b className="font-semibold text-ink">{topic.name}</b></p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-mut">Topik:</span>
          {TOPICS[tahun].map((t) => (
            <button key={t.id} type="button" disabled={t.soon} title={t.soon ? SOON : undefined} onClick={() => open(t)} aria-current={t.id === topic.id ? 'true' : undefined}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${off} ${t.id === topic.id ? 'bg-teal text-white' : 'border border-line bg-card'}`}>{t.name}</button>
          ))}
        </div>
      </div>

      {konsep && <Konsep topic={topic} tahun={tahun} />}
      {!konsep && <main className={`grid gap-5 px-6 pb-6 max-[860px]:grid-cols-1 ${tv ? 'grid-cols-[1fr_480px]' : 'grid-cols-[1fr_380px]'}`}>
        <section className="min-w-0">
          {tokoh && (
            <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-card p-5">
              <Portrait image={topic.person.image} />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-teal px-3 py-0.5 text-xs font-semibold text-white">Tahun {tahun} · Tokoh Terbilang</span>
                <h2 className="mt-1 font-display text-3xl font-bold">{topic.person.name}</h2>
                <p className="text-mut">{topic.person.role}</p>
                <p className="mt-1">{topic.person.bio}</p>
              </div>
              <span className="self-start rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#1B2A2F]">Templat: Tokoh</span>
            </div>
          )}
          <MapView spots={topic.spots} year={timeline ? year : Infinity} activeId={active?.id} onSelect={select} topicId={topic.id} />
          {timeline ? (
            <Timeline topic={topic} year={year} onChange={(y) => { setPlaying(false); setYear(y) }} playing={playing} onTogglePlay={togglePlay}
              activeId={active?.id} onSelect={select} prev={prev} next={next} />
          ) : tokoh ? (
            <div className="mt-5 rounded-2xl border border-line bg-card px-5 py-4">
              <b>Garis masa hayat</b>
              <ol className="mt-3 space-y-1 border-l-2 border-line pl-4">
                {topic.spots.map((s) => (
                  <li key={s.id} className="relative">
                    <span className={`absolute -left-[23px] top-4 h-3 w-3 rounded-full ${s.id === active?.id ? 'bg-gold ring-2 ring-ink' : 'bg-teal'}`} />
                    <button type="button" onClick={() => select(s)} className={`w-full rounded-lg px-3 py-2 text-left ${s.id === active?.id ? 'bg-teal text-white' : 'hover:bg-soft'}`}>
                      <span className="block text-sm opacity-80">{s.yearLabel}</span><b>{s.name}</b>
                    </button>
                  </li>
                ))}
              </ol>
              <p className="mt-2 text-sm text-mut">Tahun adalah anggaran. Semak dengan buku teks KSSR.</p>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-line bg-card px-5 py-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <b>Tapak · {topic.name}</b>
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#1B2A2F]">Templat: Tempat</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.spots.map((s) => (
                  <button key={s.id} type="button" onClick={() => select(s)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${s.id === active?.id ? 'bg-teal text-white' : 'border border-line bg-card'}`}>{s.name}</button>
                ))}
              </div>
              <p className="mt-3 text-sm text-mut">Tiada gelangsar kerana topik ini tidak mempunyai tarikh peristiwa.</p>
            </div>
          )}
        </section>
        <DetailPanel key={`${topic.id}-${active?.id ?? 'intro'}`} spot={active} tahun={tahun} empty={empty} />
      </main>}
      </>
      )}
      <footer className="px-6 pb-6 text-sm text-mut">Prototaip dengan data contoh. Semak setiap fakta dengan buku teks KSSR sebelum digunakan.</footer>
      <ExportDialog open={exp} onClose={() => setExp(false)} topic={topic} tahun={tahun} cfg={cfg} setCfg={setCfg} />
      <div className="print-only"><Worksheet topic={topic} tahun={tahun} cfg={resolveCfg(topic, cfg)} /></div>
      <UnlockDialog open={ask !== null} onClose={() => setAsk(null)} onContinue={() => { setUnlocked(true); open(ask.topic ?? firstTopic(ask.n), ask.n, ask.spot) }} />
    </>
  )
}
