# 종로 맛집 지도

르메이에르 종로타운을 중심으로 반경 약 500m 식당을 보여주는 3D 웹 지도.

## 기술
- React + Vite
- Mapbox GL JS (3D 건물)
- 식당 데이터: `src/data/restaurants.json` (나중에 API/DB로 교체 가능, `src/lib/restaurants.js` 만 수정)

## 시작하기 (새 PC에서)
```bash
git clone <저장소 주소>
cd jongno-food-map
npm install
cp .env.example .env   # 그리고 VITE_MAPBOX_TOKEN 채우기
npm run dev
```

`.env` 는 git에 올라가지 않으므로 PC마다 직접 만들어야 합니다.

## 구조
```
src/
  components/   UI 컴포넌트 (지도, 카드, 필터 등)
  data/         restaurants.json
  lib/          config.js (좌표·상수), restaurants.js (데이터 접근)
```
