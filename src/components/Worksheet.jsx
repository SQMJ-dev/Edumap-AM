import { COAST } from '../data/coast'

const LET = 'ABCD'
export const questions = (topic) => topic.quizzes ?? (topic.spots || []).map((s) => s.quiz).filter(Boolean)

// Which worksheet types a topic supports, and the type to show right now.
export function resolveCfg(topic, cfg) {
  const ok = { peta: (topic.spots || []).length > 0, soalan: questions(topic).length > 0 }
  const type = ok[cfg.type] ? cfg.type : ok.peta ? 'peta' : 'soalan'
  return { ...cfg, type, ok }
}

function BlankMap({ spots }) {
  const pad = 1.5
  const minLat = Math.min(...spots.map((s) => s.lat)) - pad, maxLat = Math.max(...spots.map((s) => s.lat)) + pad
  const minLng = Math.min(...spots.map((s) => s.lng)) - pad, maxLng = Math.max(...spots.map((s) => s.lng)) + pad
  const w = maxLng - minLng, h = maxLat - minLat, r = Math.max(w, h) * 0.03
  return (
    <svg viewBox={`${minLng} ${-maxLat} ${w} ${h}`} className="w-full border border-black bg-white" role="img" aria-label="Peta kosong dengan nombor">
      {COAST.map((ring, i) => (
        <polygon key={i} points={ring.map(([la, ln]) => `${ln},${-la}`).join(' ')} fill="#f1f1f1" stroke="#000" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      ))}
      {spots.map((s, i) => (
        <g key={s.id}>
          <circle cx={s.lng} cy={-s.lat} r={r} fill="#fff" stroke="#000" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <text x={s.lng} y={-s.lat + r * 0.38} fontSize={r * 1.15} textAnchor="middle" fontWeight="700" fontFamily="Inter, sans-serif">{i + 1}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Worksheet({ topic, tahun, cfg }) {
  const spots = topic.spots || []
  const qs = questions(topic)
  return (
    <div className="bg-white p-6 text-black">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b-2 border-black pb-2">
        <div>
          <h2 className="font-display text-2xl font-bold">{cfg.center || 'EduMap: Sejarah'}</h2>
          <p>Lembaran kerja · Tahun {tahun} · {topic.name}</p>
        </div>
        <div className="text-right text-sm">Nama: ______________<br />Kelas: ______________</div>
      </div>
      {cfg.type === 'peta' ? (
        <>
          <p className="my-3">Tulis nama tempat bagi setiap nombor pada peta.</p>
          <BlankMap spots={spots} />
          <ol className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">{spots.map((s, i) => <li key={s.id} className="list-none">{i + 1}. ____________________</li>)}</ol>
        </>
      ) : (
        <>
          <p className="my-3">Pilih jawapan yang betul.</p>
          <ol className="space-y-3">
            {qs.map((q, i) => (
              <li key={q.q} className="list-none">
                <b>{i + 1}. {q.q}</b>
                <div className="grid grid-cols-2 gap-x-6">{q.options.map((o, j) => <span key={o}>{LET[j]}. {o}</span>)}</div>
              </li>
            ))}
          </ol>
        </>
      )}
      {cfg.key && (
        <div className="mt-6 border-t-2 border-dashed border-black pt-3">
          <b>Kunci jawapan</b>
          <p>{cfg.type === 'peta' ? spots.map((s, i) => `${i + 1}. ${s.name} (${s.place})`).join('   ') : qs.map((q, i) => `${i + 1}. ${LET[q.answer]}`).join('   ')}</p>
        </div>
      )}
      <p className="mt-4 text-xs">Prototaip · data contoh · semak dengan buku teks KSSR</p>
    </div>
  )
}
