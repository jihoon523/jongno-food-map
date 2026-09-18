import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { CATEGORY_COLOR } from '../lib/restaurants'
import './Markers.css'

// 이 줌보다 작으면 개별 식당 이름을 숨긴다
const LABEL_MIN_ZOOM = 16.8

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

  // 줌이 낮을 땐 개별 식당 라벨을 숨겨 겹침을 줄인다 (건물 마커 라벨은 항상 표시)
  useEffect(() => {
    if (!map) return
    const container = map.getContainer()
    const update = () => container.classList.toggle('labels-hidden', map.getZoom() < LABEL_MIN_ZOOM)
    update()
    map.on('zoom', update)
    return () => {
      map.off('zoom', update)
      container.classList.remove('labels-hidden')
    }
  }, [map])

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
  // 건물에 식당이 하나뿐이면 굳이 묶지 않고 개별 마커로 보여준다
  return result.map((g) =>
    g.kind === 'building' && g.restaurants.length === 1
      ? { kind: 'single', restaurant: g.restaurants[0], coords: g.coords }
      : g,
  )
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
