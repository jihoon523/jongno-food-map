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

## 배포
- 주소: https://jihoon523.github.io/jongno-food-map/
- `main` 에 push 하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드·배포합니다.
- Mapbox 토큰은 저장소 Settings → Secrets → `VITE_MAPBOX_TOKEN` 에 있습니다. 토큰을 바꾸면 여기도 갱신하세요.
