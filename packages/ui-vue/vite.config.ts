import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@' 기호를 'src' 폴더의 절대 경로로 매핑합니다.
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})