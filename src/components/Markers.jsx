import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { CATEGORY_COLOR } from '../lib/restaurants'
import './Markers.css'

/**
 * 식당 목록을 지도 위 마커로 그린다.
 * 같은 building 값을 가진 식당들은 하나의 마커로 묶어 개수를 표시한다.
 * (르메이에르처럼 한 건물에 여러 식당이 있는 경우)
 *
 * onSelect(item)  item 은 { kind: 'single', restaurant } 또는
 *                 { kind: 'building', name, restaurants }
 */
export default function Markers({ map, restaurants, onSelect }) {
  useEffect(() => {
    if (!map) return

    const groups = groupByBuilding(restaurants)
    const markers = groups.map((g) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'marker'

      if (g.kind === 'building') {
        el.classList.add('marker--building')
        el.innerHTML = `
          <span class="marker__dot">${g.restaurants.length}</span>
          <span class="marker__label">${escapeHtml(g.name)}</span>`
      } else {
        const r = g.restaurant
        el.innerHTML = `
          <span class="marker__dot" style="background:${CATEGORY_COLOR[r.category]}"></span>
          <span class="marker__label">${escapeHtml(r.name)}</span>`
      }

      el.addEventListener('click', (e) => {
        e.stopPropagation()
        onSelect?.(g)
      })

      return new mapboxgl.Marker({ element: el, anchor: 'top' })
        .setLngLat(g.coords)
        .addTo(map)
    })

    return () => markers.forEach((m) => m.remove())
  }, [map, restaurants, onSelect])

  return null
}

function groupByBuilding(restaurants) {
  const byBuilding = new Map()
  const result = []
  for (const r of restaurants) {
    if (!r.building) {
      result.push({ kind: 'single', restaurant: r, coords: r.coords })
      continue
    }
    let g = byBuilding.get(r.building)
    if (!g) {
      g = { kind: 'building', name: r.building, restaurants: [], coords: r.coords }
      byBuilding.set(r.building, g)
      result.push(g)
    }
    g.restaurants.push(r)
  }
  return result
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
