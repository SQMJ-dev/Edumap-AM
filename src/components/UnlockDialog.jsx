import { useEffect, useRef } from 'react'

export default function UnlockDialog({ open, onClose, onContinue }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} onClose={onClose} className="m-auto w-[min(92vw,460px)] rounded-2xl border border-line bg-card p-6 text-ink backdrop:bg-black/50">
      <h2 className="font-display text-2xl font-bold">Buka kunci Tahun 5 dan 6</h2>
      <p className="mt-1 text-mut">Semua topik, peta dan latihan mini terbuka.</p>
      <div className="mt-4 grid gap-3">
        <div className="rounded-xl bg-soft p-3"><b>Sekali bayar · RM19 – RM29</b><p className="text-sm text-mut">Akses seumur hidup Tahun 4, 5 dan 6.</p></div>
        <div className="rounded-xl bg-soft p-3"><b>Langganan ibu bapa · RM9 – RM15 / bulan</b><p className="text-sm text-mut">Jejak kemajuan anak dan laporan UASA.</p></div>
      </div>
      <p className="mt-3 text-sm text-mut">Prototaip: tiada pembayaran sebenar.</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => { onContinue(); onClose() }} className="rounded-xl bg-gold px-4 py-2.5 font-semibold text-[#1B2A2F]">Teruskan</button>
        <button type="button" onClick={onClose} className="rounded-xl border border-line bg-card px-4 py-2.5 font-semibold">Kembali</button>
      </div>
    </dialog>
  )
}
