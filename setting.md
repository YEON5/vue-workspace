# 🛠️ 신규 프로젝트 포맷팅 세팅 가이드 (Vue 3 + ESLint Flat Config)
이 세팅은 모노레포(Monorepo) 환경에서도 완벽하게 작동하며, Prettier의 강제 한 줄 병합을 방지합니다.
**개발자의 수동 줄바꿈을 존중하면서도, 저장 시 2칸 들여쓰기를 맨 앞줄부터 예쁘게 자동 정렬**해 주는 궁극의 환경 구성입니다.
화면에 거슬리는 노란색(Warning) 밑줄도 깔끔하게 숨겨줍니다.


## Step 1: 필수 패키지 설치
최신 ESLint(Flat Config)와 TypeScript 파서, Vue 플러그인을 설치합니다. (해당 프로젝트 폴더 위치에서 실행하세요.)

```bash
npm install -D eslint @eslint/js eslint-plugin-vue typescript-eslint
```

## Step 2: Prettier 설정 및 방어벽 구축
Prettier가 코드 포맷팅을 돕되, `.vue` 파일만큼은 건드리지 못하게 차단해야 ESLint가 줄바꿈을 내 맘대로 유지하면서 들여쓰기를 제어할 수 있습니다. 프로젝트 최상단 루트에 두 파일을 생성합니다.

### 1. `.prettierrc` (기본 포맷팅 규칙)
일반적인 HTML, SCSS, JS 파일들을 위한 기본적인 Prettier 세팅입니다.
.prettierrc 파일에 복사해주세요.
```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 9999999999999,
  "arrowParens": "avoid",
  "endOfLine": "auto",
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": true,

  "overrides": [
    {
      "files": "*.vue",
      "options": {
        "printWidth": 100,
        "singleAttributePerLine": true
      }
    },
    {
      "files": ["*.jsx", "*.tsx"],
      "options": {
        "printWidth": 100,
        "singleAttributePerLine": true
      }
    },
    {
      "files": "**/*.scss",
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```

### 2. `.prettierignore` (Vue 파일 개입 차단)
Prettier가 Vue 파일을 무시하도록 설정합니다.
```text
# Vue 파일은 수동 줄바꿈을 위해 ESLint가 전담하므로 Prettier에서 제외
*.vue
```

## Step 3: ESLint 설정 (`eslint.config.mjs`)
각 하위 프로젝트 폴더(예: `apps/vue-docs` 또는 `packages/vue-ui`) 최상단에 `eslint.config.mjs` 파일을 생성하고 아래 코드를 넣습니다.
모노레포 환경의 경로 인식 문제와 `<script setup>` 들여쓰기 문제를 모두 해결한 완벽한 템플릿입니다.
eslint.config.mjs 파일 생성후 아래 내용 복사해주세요.

```javascript
import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from 'typescript-eslint';

// 🔥 모노레포 환경에서 현재 폴더 경로를 정확히 찾기 위한 Node.js 모듈
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));

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
        parser: typescriptEslint.parser,
        tsconfigRootDir: __dirname, // 헷갈리지 말고 현재 폴더를 기준으로 삼아라!
        extraFileExtensions: ['.vue'],
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
        'warn', 2,
        {
          baseIndent: 0, // import 구문 등이 맨 왼쪽 벽에 딱 붙어서 시작하도록 설정
          switchCase: 1, // switch-case 문은 2칸 들여쓰기 적용
        },
      ],

      /* ✨ 속성 및 텍스트 줄바꿈/괄호 위치 내 맘대로 (에디터 강제 개입 차단) */
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-newline': 'off',
    },
  },
];
```

## Step 4: 에디터 작업 영역 설정 (`.vscode/settings.json`)
최상단 루트의 `.vscode` 폴더 안에 `settings.json`을 생성하여 에디터가 ESLint를 기본 포맷터로 사용하고, 노란색 경고 줄을 화면에서 숨기도록 설정합니다.
settings.json파일에 아래 내용 복사해주세요.

```json
{
  /* 에디터 기본 공백 및 포맷팅 설정 */
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  /* Vue 파일 전용 포맷팅 예외 처리 (ESLint에 위임) */
  "[vue]": {
    "editor.defaultFormatter": null,
    "editor.formatOnSave": false
  },

  /* 저장 시 자동 수정 (Auto-fix) 동작 */
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit",
    "source.organizeImports": "explicit"
  },

  /* ESLint 상세 설정 (Flat Config & 모노레포 지원) */
  "eslint.useFlatConfig": true,
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.quiet": true, // 노란색 경고(warn) 밑줄 화면에서 숨기기
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],

  /* Tailwind CSS 및 Emmet 자동완성 설정 */
  "tailwindCSS.rootFontSize": 10,
  "tailwindCSS.emmetCompletions": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  },

  /* SCSS 라이브 컴파일 설정 */
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": "~/../css"
    }
  ],
  "liveSassCompile.settings.generateMap": false,
  "liveSassCompile.settings.excludeList": [
    "/**/node_modules/**",
    "/.vscode/**",
    "/code-vite-ts/**"
  ],
  "liveSassCompile.settings.includeItems": [
    "/code-basic/**/*.scss",
    "/code-basic/**/*.sass"
  ],

  /* 라이브 서버 설정 */
  "liveServer.settings.port": 5502
}
```

## Step 5: 마무리 (서버 재시작)
설정이 모두 끝났다면, 에디터가 새로운 환경을 완벽하게 인식할 수 있도록 서버를 재시작해 줍니다.

1. VS Code에서 `F1` 키(또는 `Ctrl + Shift + P`)를 누릅니다.
2. **`TypeScript: Restart TS server`** 를 실행합니다.
3. 다시 `F1` 키를 누르고 **`ESLint: Restart ESLint Server`** 를 실행합니다.

---
**🎉 세팅 완료!** 이제 `.vue` 파일에서 마음껏 코드를 작성하고 `Ctrl + S`를 눌러보세요. 스트레스 없는 완벽한 포맷팅이 작동합니다!