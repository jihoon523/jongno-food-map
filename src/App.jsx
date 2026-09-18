import { MAPBOX_TOKEN } from './lib/config'

function App() {
  if (!MAPBOX_TOKEN) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Mapbox 토큰이 없습니다</h2>
        <p>
          <code>.env.example</code>을 <code>.env</code>로 복사하고{' '}
          <code>VITE_MAPBOX_TOKEN</code>을 채운 뒤 개발 서버를 다시 시작하세요.
        </p>
      </div>
    )
  }
  return <div style={{ padding: 24 }}>지도는 2단계에서 표시됩니다.</div>
}

export default App
