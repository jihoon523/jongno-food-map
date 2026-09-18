import { useCallback, useEffect, useState } from 'react'
import { MAPBOX_TOKEN } from './lib/config'
import { getRestaurants } from './lib/restaurants'
import Map from './components/Map'
import Markers from './components/Markers'
import Card from './components/Card'
import './App.css'

function App() {
  const [map, setMap] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  // { kind:'single', restaurant, from? } | { kind:'building', name, restaurants } | null
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getRestaurants().then(setRestaurants)
  }, [])

  const handleReady = useCallback((m) => setMap(m), [])
  const handleSelect = useCallback((item) => setSelected(item), [])
  const handleClose = useCallback(() => setSelected(null), [])

  // 건물 목록에서 식당을 고르면 카드로 전환, 뒤로 가면 목록으로 복귀
  const handleSelectInBuilding = useCallback((restaurant) => {
    setSelected((prev) => ({ kind: 'single', restaurant, from: prev }))
  }, [])
  const handleBack = useCallback(() => {
    setSelected((prev) => prev?.from ?? null)
  }, [])

  // 지도 빈 곳 클릭 시 패널 닫기
  useEffect(() => {
    if (!map) return
    map.on('click', handleClose)
    return () => map.off('click', handleClose)
  }, [map, handleClose])

  if (!MAPBOX_TOKEN) {
    return (
      <div className="notice">
        <h2>Mapbox 토큰이 없습니다</h2>
        <p>
          <code>.env.example</code>을 <code>.env</code>로 복사하고{' '}
          <code>VITE_MAPBOX_TOKEN</code>을 채운 뒤 개발 서버를 다시 시작하세요.
        </p>
      </div>
    )
  }

  return (
    <div className="app">
      <Map onReady={handleReady} />
      <Markers map={map} restaurants={restaurants} onSelect={handleSelect} />
      <Card
        selected={selected}
        onSelectRestaurant={handleSelectInBuilding}
        onBack={handleBack}
        onClose={handleClose}
      />
    </div>
  )
}

export default App
