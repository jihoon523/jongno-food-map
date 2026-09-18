// 지도 관련 상수. 좌표는 [경도, 위도] 순서 (Mapbox 규칙).

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

// 르메이에르 종로타운 (서울 종로구 종로1가)
export const CENTER = [126.9805, 37.5706]

// 지도에 표시할 탐색 반경 (m)
export const RADIUS_M = 500

export const INITIAL_VIEW = {
  center: CENTER,
  zoom: 16.5,
  pitch: 55,
  bearing: -15,
}
