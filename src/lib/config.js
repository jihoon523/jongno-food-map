// 지도 관련 상수. 좌표는 [경도, 위도] 순서 (Mapbox 규칙).

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

// 르메이에르 종로타운 (종로 19). OSM 건물 폴리곤(way 233593643) 중심점
export const CENTER = [126.97988, 37.57085]

// 지도에 표시할 탐색 반경 (m)
export const RADIUS_M = 500

export const INITIAL_VIEW = {
  center: CENTER,
  zoom: 16,
  pitch: 55,
  bearing: -20,
}
