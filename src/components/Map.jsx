import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, CENTER, RADIUS_M, INITIAL_VIEW } from '../lib/config'
import './Map.css'

mapboxgl.accessToken = MAPBOX_TOKEN

// 중심점에서 반경 r(m)인 원을 GeoJSON 폴리곤으로 만든다.
function circlePolygon([lng, lat], r, steps = 64) {
  const coords = []
  const kmPerDegLat = 111.32
  const kmPerDegLng = kmPerDegLat * Math.cos((lat * Math.PI) / 180)
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * 2 * Math.PI
    coords.push([
      lng + ((r / 1000) * Math.cos(a)) / kmPerDegLng,
      lat + ((r / 1000) * Math.sin(a)) / kmPerDegLat,
    ])
  }
  return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [coords] } }
}

function add3DBuildings(map) {
  const layers = map.getStyle().layers
  // 라벨 레이어 바로 아래에 건물을 넣어야 지명이 건물에 가려지지 않는다.
  const labelLayerId = layers.find(
    (l) => l.type === 'symbol' && l.layout && l.layout['text-field'],
  )?.id

  map.addLayer(
    {
      id: '3d-buildings',
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 14,
      paint: {
        'fill-extrusion-color': '#e8e6e1',
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': ['get', 'min_height'],
        'fill-extrusion-opacity': 0.9,
      },
    },
    labelLayerId,
  )
}

function addRadiusCircle(map) {
  map.addSource('radius', { type: 'geojson', data: circlePolygon(CENTER, RADIUS_M) })
  map.addLayer(
    {
      id: 'radius-fill',
      type: 'fill',
      source: 'radius',
      paint: { 'fill-color': '#2563eb', 'fill-opacity': 0.04 },
    },
    '3d-buildings',
  )
  map.addLayer(
    {
      id: 'radius-line',
      type: 'line',
      source: 'radius',
      paint: { 'line-color': '#2563eb', 'line-opacity': 0.35, 'line-width': 1.5 },
    },
    '3d-buildings',
  )
}

/**
 * 3D 지도. onReady(map) 으로 mapbox 인스턴스를 넘겨서
 * 마커 등은 바깥에서 붙일 수 있게 한다.
 */
export default function Map({ onReady }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      ...INITIAL_VIEW,
      minZoom: 14,
      maxZoom: 19,
      antialias: true,
      language: 'ko',
      attributionControl: false,
    })
    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    map.on('load', () => {
      add3DBuildings(map)
      addRadiusCircle(map)
      onReady?.(map)
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="map" />
}
