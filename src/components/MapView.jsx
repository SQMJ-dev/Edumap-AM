import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { COAST } from '../data/coast'

const icon = (state) => L.divIcon({ className: '', html: `<span class="spot spot-${state}"></span>`, iconSize: [26, 26], iconAnchor: [13, 13] })

export default function MapView({ spots, year, activeId, onSelect, topicId }) {
  const el = useRef(null), map = useRef(null), layer = useRef(null), markers = useRef({}), pick = useRef(onSelect)
  pick.current = onSelect

  useEffect(() => {
    const m = L.map(el.current, { scrollWheelZoom: false }).setView([4.2, 108.5], 5)
    const fallback = L.layerGroup(COAST.map((p) => L.polygon(p, { color: '#8A7A55', weight: 2, fillColor: '#EFE6CF', fillOpacity: 1 }))).addTo(m)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' })
      .once('tileload', () => m.removeLayer(fallback)).addTo(m)
    layer.current = L.layerGroup().addTo(m)
    map.current = m
    return () => { m.remove() }
  }, [])

  useEffect(() => {
    layer.current.clearLayers(); markers.current = {}
    spots.forEach((s) => {
      markers.current[s.id] = L.marker([s.lat, s.lng], { icon: icon('off'), title: s.name }).on('click', () => pick.current(s)).addTo(layer.current)
    })
    map.current.fitBounds(L.latLngBounds(spots.map((s) => [s.lat, s.lng])), { padding: [80, 80], maxZoom: 7 })
  }, [topicId])

  useEffect(() => {
    spots.forEach((s) => {
      const mk = markers.current[s.id]; if (!mk) return
      const reached = s.year == null || s.year <= year, active = s.id === activeId
      mk.setIcon(icon(active ? 'active' : reached ? 'on' : 'off')).setZIndexOffset(active ? 1000 : 0).unbindTooltip()
      // Only the active spot keeps a label; the others show theirs on hover, so close spots never overlap.
      if (reached) mk.bindTooltip(s.name, { permanent: active, direction: 'right', offset: [14, 0], className: 'spot-tip' })
    })
  }, [spots, year, activeId, topicId])

  return <div ref={el} role="application" aria-label="Peta Malaysia dengan penanda sejarah" className="h-[520px] overflow-hidden rounded-2xl border border-line" />
}
