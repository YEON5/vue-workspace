import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    // 컴포넌트 자동 임포트 설정 추가
    Components({
      dirs: [
        'src/components/ui',
        'src/components/layout'
      ],
      dts: true, // components.d.ts 자동 생성
      deep: true,
    }),
    svgLoader({
      defaultImport: 'component', // SVG를 기본적으로 Vue 컴포넌트로
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } }
          },
          // Tailwind 색상(text-white 등)이 적용되도록
          {
            name: 'convertColors',
            params: { currentColor: true },
          },
          'removeDimensions'
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // '@' 기호를 'src' 폴더의 절대 경로로 매핑합니다.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#components': path.resolve(__dirname, './src/components')
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