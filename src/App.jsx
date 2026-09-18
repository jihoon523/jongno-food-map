import { useCallback, useEffect, useState } from 'react'
import { MAPBOX_TOKEN } from './lib/config'
import { getRestaurants } from './lib/restaurants'
import Map from './components/Map'
import Markers from './components/Markers'
import './App.css'

function App() {
  const [map, setMap] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getRestaurants().then(setRestaurants)
  }, [])

  const handleReady = useCallback((m) => setMap(m), [])
  const handleSelect = useCallback((item) => {
    setSelected(item)
    console.log('selected', item)
  }, [])

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
    </div>
  )
}

export default App
