import { useState } from 'react'

// Round portrait for a person. Falls back to a grey circle if there is no image or the file is missing.
export default function Portrait({ image }) {
  const [failed, setFailed] = useState(false)
  const base = 'h-24 w-24 shrink-0 rounded-full'
  if (!image || failed) return <div className={`${base} flex items-center justify-center bg-[#EFE9DA] text-sm text-[#51606A]`}>Potret</div>
  return <img src={`${import.meta.env.BASE_URL}images/${image.src}`} alt={image.alt} title={image.credit} onError={() => setFailed(true)} className={`${base} object-cover`} />
}
