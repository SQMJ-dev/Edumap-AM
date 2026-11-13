import { useEffect, useRef } from 'react'
import Worksheet, { resolveCfg } from './Worksheet'

export default function ExportDialog({ open, onClose, topic, tahun, cfg, setCfg }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  const r = resolveCfg(topic, cfg)
  const tab = (k, label) => (
    <button type="button" disabled={!r.ok[k]} onClick={() => setCfg({ ...cfg, type: k })}
      className={`rounded-xl px-4 py-2 font-semibold disabled:opacity-40 ${r.type === k ? 'bg-gold text-[#1B2A2F]' : 'border border-line bg-card'}`}>{label}</button>
  )
  return (
    <dialog ref={ref} onClose={onClose} className="m-auto w-[min(94vw,760px)] rounded-2xl border border-line bg-card p-6 text-ink backdrop:bg-black/50">
      <h2 className="font-display text-2xl font-bold">Eksport lembaran kerja</h2>
      <p className="text-sm text-mut">Untuk topik: {topic.name}</p>
      <div className="mt-3 flex flex-wrap gap-2">{tab('peta', 'Peta kosong')}{tab('soalan', 'Soalan UASA')}</div>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2"><input type="checkbox" checked={cfg.key} onChange={(e) => setCfg({ ...cfg, key: e.target.checked })} /> Sertakan kunci jawapan</label>
        <label className="flex items-center gap-2">Nama pusat tuisyen
          <input className="rounded-lg border border-line bg-card px-2 py-1" value={cfg.center} placeholder="(pilihan)" onChange={(e) => setCfg({ ...cfg, center: e.target.value })} />
        </label>
      </div>
      <div className="mt-4 max-h-[50vh] overflow-auto rounded-xl border border-line"><Worksheet topic={topic} tahun={tahun} cfg={r} /></div>
      <p className="mt-2 text-sm text-mut">Tekan Cetak, kemudian pilih “Save as PDF” sebagai pencetak.</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => window.print()} className="rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#1B2A2F]">Cetak / simpan PDF</button>
        <button type="button" onClick={onClose} className="rounded-xl border border-line bg-card px-4 py-2.5 font-semibold">Tutup</button>
      </div>
    </dialog>
  )
}
