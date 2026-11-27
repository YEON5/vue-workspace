# Vue 3 + Tailwind CSS v4 Monorepo 디자인 시스템
피그마 디자인 토큰을 Tailwind 클래스로 바꾸는 스타일 패키지(`@ui/style`)와
Vue 3 컴포넌트 패키지(`@ui/vue`), 컴포넌트 문서(`@ui/docs`)를 분리한 모노레포입니다.

| 문서 | 내용 |
|---|---|
| `note.md` (이 문서) | 전체 구조, 실행 명령, 주요 설정 |
| `setting.md` | 에디터·ESLint·Prettier 세팅 |
| `packages/ui-style/tokens_note.md` | 디자인 토큰 파이프라인, 규칙 파일, 클래스 규칙, 다른 프로젝트 적용 |
| `packages/ui-vue/component_note.md` | 컴포넌트에서 토큰 쓰기 (Typo, color, spacing, 다크모드) |


## 1. 프로젝트 구조

```text
vue-workspace/
├── package.json                 # 루트 워크스페이스 (동시 실행·공통 개발 도구)
├── eslint.config.mjs            # 전역 ESLint 설정 (Vue·TS + Node 스크립트)
├── note.md · setting.md
│
└── 📂 packages/
    ├── 📂 ui-public/            # 이미지, 폰트 (ui-vue·ui-docs의 publicDir)
    │
    ├── 📂 ui-style/             # 🎨 디자인 토큰 + Tailwind CSS
    │   ├── scripts/
    │   │   ├── convert-tokens.js   # figma-export → design-tokens.json (규칙 적용·검증)
    │   │   ├── generate-tokens.js  # → design-tokens.css + ui-vue tokens.generated.ts
    │   │   └── watch-tokens.js     # dev 중 변경 감시 → 자동 재생성
    │   ├── src/
    │   │   ├── tokens/
    │   │   │   ├── figma-export/      # 피그마 Variables Export 원본 JSON
    │   │   │   ├── tokens.rules.json  # ✏️ 프로젝트별 변환 규칙
    │   │   │   └── design-tokens.json # 표준 토큰 (자동 생성)
    │   │   ├── tokens-config.js    # ✏️ PREFIX · UNIT(px/rem) · MODES(다크·반응형)
    │   │   ├── design-tokens.css   # @theme 토큰 (자동 생성)
    │   │   └── style.css           # Tailwind v4 진입점
    │   ├── dist/style.css          # 빌드 결과 (ui-vue·ui-docs에서 import)
    │   └── tokens_note.md
    │
    ├── 📂 ui-vue/               # 💻 Vue 3 컴포넌트 라이브러리 (dev 5810)
    │   ├── scripts/                # SVG 아이콘 컴포넌트 자동 생성·감시
    │   ├── src/
    │   │   ├── assets/icons/       # SVG 아이콘
    │   │   ├── components/
    │   │   │   ├── layout/         # AppLayout(다크모드 초기화)·AppHeader·AppFooter
    │   │   │   └── ui/             # 공통 UI 컴포넌트
    │   │   ├── composables/        # useSpacing·useRadius·useColorMode 등
    │   │   ├── types/              # 토큰 타입 (tokens.generated.ts 자동 생성 + color.ts·typo.ts 등)
    │   │   └── utils/cn.ts         # 클래스 병합 (tailwind-merge + 토큰 클래스 등록)
    │   └── component_note.md
    │
    ├── 📂 ui-docs/              # 컴포넌트 카탈로그 (dev 5820, views/*.vue 자동 라우팅)
    │
    └── 📂 markup/               # 퍼블리싱용 화면 산출물 (예정)
```

---


## 2. 실행 명령

루트(`vue-workspace/`)에서 실행합니다.

```bash
npm install          # 설치 (워크스페이스 패키지 링크 포함)

npm run dev          # 전체: 토큰 감시 + Tailwind watch + ui-vue(5810) + ui-docs(5820)
npm run dev:docs     # ui-docs만
npm run dev:vue      # ui-vue만

npm run build        # 토큰 변환·생성 → dist/style.css
npm run tokens -w @ui/style   # 토큰 변환·생성만
```

- dev 중에는 피그마 JSON(`figma-export/`), `tokens.rules.json`, `tokens-config.js`를 저장하면 토큰이 자동으로 다시 생성되고 화면에 반영됩니다.
- 토큰 변환·생성에서 문제가 있으면 오류·경고와 고칠 곳이 출력됩니다 → `tokens_note.md`의 오류 표 참고.

---


## 3. 핵심 구조

**3.1 디자인 토큰 → Tailwind**

```
피그마 Variables Export (JSON)
  → convert (tokens.rules.json)  → design-tokens.json (DTCG 2025.10)
  → generate                     → design-tokens.css (@theme·색상 클래스) + tokens.generated.ts (ui-vue 타입·값)
  → tailwindcss                  → dist/style.css
```

- 피그마 플러그인이나 Claude 없이도 저장소 안에서 처리됩니다.
- 디자인 토큰에 있는 값만 쓰고, 추측해서 만들거나 대체하지 않습니다.
- 토큰에 그 카테고리(색상·간격·글자 크기·굵기·모서리·반응형)가 있으면 Tailwind 기본을 끄고 토큰만 쓰고, 없으면 Tailwind 기본을 씁니다. 꺼진 클래스는 ESLint(`npx eslint "packages/*/src/**/*.{vue,ts}"`)가 잡습니다.
- 사용 규칙 원본: `.claude/skills/design-tokens/token-usage.md` (Claude Code·Antigravity가 자동으로 읽음)
- 컴포넌트 props 타입이 토큰에서 만들어지므로 토큰에 없는 이름은 vue-tsc 오류가 납니다.

**3.2 설정은 한 곳에서**

| 바꿀 것 | 파일 |
|---|---|
| CSS 변수 접두사, 단위(px/rem), 다크·반응형 적용 방식 | `ui-style/src/tokens-config.js` |
| 피그마 경로 → 클래스 이름, 제외, typo 굵기 | `ui-style/src/tokens/tokens.rules.json` |
| 컴포넌트 color 역할 → 클래스 | `ui-vue/src/types/color.ts` |

`UNIT`은 `"px"`/`"rem"`만 바꾸면 됩니다. rem이면 값을 16으로 나눠 출력합니다 (1rem = 16px, html font-size는 바꾸지 않음).

**3.3 모노레포 HMR**

`ui-vue`·`ui-docs`의 `vite.config.ts`에서 packages 폴더 변경을 감시하고(`server.watch.ignored: ['!**/packages/**']`), ui-docs는 `@ui/vue`를 사전 번들링에서 제외해 컴포넌트 수정이 바로 반영됩니다.

**3.4 다크모드**

ui-vue `useColorMode`가 `<html>`에 `dark` 클래스를 붙이고, 색상 토큰 변수만 dark 값으로 바뀝니다. 자세한 사용법은 `component_note.md`.

---


## 4. 참고

- **패키지 보안 점검**: `npm audit fix`는 패치 버전만 올려 안전합니다. `--force`(vite 5 → 8, vue-tsc 2 → 3 메이저 업그레이드)는 별도 작업으로 빌드·화면을 확인하며 진행합니다.
- **dist/style.css의 CSS 경고**(`vertical-align`, `line-clamp`)는 Tailwind가 만든 정상 코드라 무시해도 됩니다.
