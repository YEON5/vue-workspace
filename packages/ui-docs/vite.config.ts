import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component',
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
          {
            name: 'convertColors',
            params: { currentColor: true },
          },
          'removeDimensions',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('../ui-vue/src', import.meta.url)),
      '#components': fileURLToPath(new URL('../ui-vue/src/components', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    watch: {
      // packages 폴더(특히 ui-vue) 내부 변경 감지
      ignored: ['!**/packages/**'],
    },
  },
  optimizeDeps: {
    // @ui/vue 소스를 사전 번들링에서 제외 → 컴포넌트 수정 시 즉시 반영
    exclude: ['@ui/vue'],
  },
});