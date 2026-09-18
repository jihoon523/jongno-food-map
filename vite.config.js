import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 는 https://<user>.github.io/jongno-food-map/ 아래에 배포되므로
// 프로덕션 빌드에서만 base 경로를 붙인다.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/jongno-food-map/' : '/',
}))
