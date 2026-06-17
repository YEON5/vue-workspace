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
  },
  server: {
    watch: {
      // '!'는 무시(ignore)를 취소하라는 뜻입니다.
      // 즉, packages 폴더 내부의 변화를 절대 무시하지 말라는 강력한 명령입니다.
      ignored: ['!**/packages/**'] 
    }
  },
})