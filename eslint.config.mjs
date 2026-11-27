import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from 'typescript-eslint';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { fileURLToPath } from 'node:url';

export default [
  // 1. 기본 추천 규칙 적용
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 2. 커스텀 포맷팅 규칙
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser, // Vue <script lang="ts"> 완벽 지원
      },
    },
    rules: {
      /* 방해되는 기본 문법 잔소리 끄기 */
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',

      /* ❌ TS/JS 기본 들여쓰기 끄기 (Vue 전용 들여쓰기와 충돌 방지) */
      indent: 'off',
      '@typescript-eslint/indent': 'off',

      /* ✨ 템플릿(HTML)과 스크립트(JS/TS) 들여쓰기 2칸 강제 정렬 */
      'vue/html-indent': ['warn', 2],
      'vue/script-indent': [
        'warn',2,
        {
          baseIndent: 0,
          switchCase: 1, // switch-case 문도 2칸 들여쓰기 적용
        },
      ],

      /* ✨ 속성 및 텍스트 줄바꿈/괄호 위치 내 맘대로 (에디터 강제 개입 차단) */
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-newline': 'off',
    },
  },

  // 3. Node 스크립트 (빌드·감시용 scripts/*.js): Node 전역 변수 허용
  {
    files: ['packages/*/scripts/**/*.js', 'packages/ui-style/src/tokens-config.js'],
    languageOptions: {
      globals: { console: 'readonly', process: 'readonly' },
    },
  },

  // 4. @ui/style 스크립트는 CommonJS(require) 방식
  {
    files: ['packages/ui-style/scripts/**/*.js', 'packages/ui-style/src/tokens-config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'writable', __dirname: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // 5. Tailwind 클래스 검사: 디자인 토큰에 없는 크기 클래스(text-sm, rounded-2xl, font-semibold, md: …)를 오류로
  //    Tailwind는 모르는 클래스를 경고 없이 무시하므로 lint로 잡음 (기준: @ui/style style.css + design-tokens.css)
  {
    files: ['packages/*/src/**/*.{vue,ts}'],
    plugins: { 'better-tailwindcss': betterTailwindcss },
    settings: {
      // entryPoint는 이 설정 파일 기준 절대 경로 (VS Code ESLint는 실행 위치가 달라 상대 경로를 못 찾음)
      'better-tailwindcss': {
        entryPoint: fileURLToPath(new URL('./packages/ui-style/src/style.css', import.meta.url)),
        detectComponentClasses: true,
      },
    },
    rules: {
      // 검사 대상: 디자인 값 유틸리티(색상 text- bg- border- ring- fill- … / 크기 rounded- font- p- m- gap- w- h- inset- top- translate- …)와 반응형·상태 접두어가 붙은 클래스
      // 그 외 컴포넌트 자체 클래스(sidebar, switch-text, textarea …)는 <style>에서 정의하므로 검사하지 않음
      'better-tailwindcss/no-unknown-classes': [
        'error',
        { ignore: ['^(?!.*:)(?!-?(?:text|bg|border|rounded|font|leading|tracking|shadow|ring|outline|fill|stroke|divide|accent|caret|decoration|placeholder|from|via|to|p[xytrblse]?|m[xytrblse]?|gap(?:-[xy])?|space-[xy]|w|h|size|min-w|max-w|min-h|max-h|inset(?:-[xy])?|top|right|bottom|left|start|end|translate-[xy]|scroll-[mp][xytrblse]?|basis|indent|border-spacing(?:-[xy])?)(?:-|$)).+$'] },
      ],
      // 색상은 토큰만: 임의 값 색상(bg-[#fff], text-[rgb(…)])은 금지. 크기 임의 값(w-[240px])은 허용
      'better-tailwindcss/no-restricted-classes': [
        'error',
        {
          restrict: [
            {
              pattern: '^(?:.*:)?-?(?:bg|text|border(?:-[xytrblse])?|ring|outline|fill|stroke|divide|accent|caret|decoration|placeholder|from|via|to|shadow)-\\[(?:#|rgba?\\(|hsla?\\(|oklch\\(|oklab\\(|lab\\(|lch\\(|color:)',
              message: '색상 임의 값은 쓰지 않습니다. 디자인 토큰 색상 클래스를 쓰세요 (tokens.generated.ts *_COLOR_CLASSES, 팔레트 bg-gray-30 등).',
            },
          ],
        },
      ],
    },
  },
];
