import { MAPBOX_TOKEN } from './lib/config'
import Map from './components/Map'
import './App.css'

function App() {
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
      <Map />
    </div>
  )
}

export default App
