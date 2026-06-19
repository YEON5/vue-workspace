# Vue 3 + Tailwind CSS Monorepo 디자인 시스템 구축 가이드
디자인 시스템 토큰 관리 및 스타일 패키지(`@ui/style`)와
Vue 3 애플리케이션 컴포넌트 패키지(`@ui/vue`)를 독립적으로 분리하여
구성하는 최상위 등급의 멀티 패키지(Monorepo) 아키텍처 가이드입니다.


## 1. 프로젝트 구조 (Directory Structure)
최종적으로 구성되는 프로젝트의 핵심 디렉토리 구조입니다.

```text
vue-workspace/
├── package.json                 # 루트 워크스페이스 (동시 실행 및 의존성 관리)
├── note.md                      # 전체 모노레포 구축 가이드 문서
├── eslint.config.mjs            # 전역 ESLint 설정
├── node_modules/                
│
└── packages/
    │
    ├── ui-style/                # 🎨 디자인 시스템 토큰 및 공통 CSS 패키지
    │   ├── package.json
    │   ├── tailwind.config.js   # Tailwind 설정 (디자인 토큰 동적 생성 및 주입)
    │   ├── postcss.config.js
    │   ├── dist/
    │   │   └── style.css        # 빌드된 최종 CSS (모든 앱에서 공통 사용)
    │   ├── scripts/
    │   │   ├── generate-tokens.js # 토큰 자동 파싱 및 JS/CSS 변환 로직 (정규식 방어 포함)
    │   │   └── watch-tokens.js    # chokidar 기반 토큰 변경 실시간 감시자
    │   └── src/
    │       ├── style.css        
    │       ├── tokens-config.js # PREFIX(접두사) 및 UNIT(px/rem) 중앙 통제소
    │       └── tokens/
    │           └── design-tokens.json # Figma(Tokens Studio) 원본 토큰
    │
    └── ui-vue/                  # 💻 Vue 3 UI 컴포넌트 라이브러리 패키지
        ├── package.json         # @ui/style을 로컬 심볼릭 링크로 참조
        ├── vite.config.ts       # 모노레포 HMR 핫릴로드 최적화 설정
        ├── tsconfig.json
        └── src/
            ├── assets/
            │   └── icons        # svg 아이콘 이미지
            ├── components/      # Button, Divider, Container 등 공통 UI 컴포넌트 (cn/tailwind-merge 활용)
            └── utils/
                └── cn.ts        # 클래스명 병합 유틸리티 (Tailwind Variants)
```


---


## 2. 완벽하게 최적화된 패키지별 설정 (`package.json`)

### 2.1 루트 워크스페이스 (Root)
`concurrently`를 도입하여 단 한 번의 명령어로 전체 시스템의 개발 서버와 토큰 감시자를 동시에 실행합니다.

```json
{
  "name": "vue-workspace",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently -n style,vue -c blue,green \"npm run dev -w @ui/style\" \"npm run dev -w @ui/vue\"",
    "build": "npm run build -w @ui/style" 
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "concurrently": "^9.0.0",
    "eslint": "^10.4.1",
    "eslint-plugin-vue": "^10.9.1",
    "typescript-eslint": "^8.60.0",
    "vue-eslint-parser": "^10.4.0"
  }
}
```
> 💡 **최적화 포인트:** 루트 `build` 시 UI 패키지는 컴포넌트 원형 그대로 내보내기 위해 제외하고, 필수 자산인 `@ui/style`만 빌드합니다.

### 2.2 스타일 패키지 (`@ui/style`)
디자인 토큰 변경을 실시간으로 감지하고 CSS를 즉시 재생성하는 자동화 파이프라인의 핵심입니다.

```json
{
  "name": "@ui/style",
  "version": "1.0.0",
  "main": "tailwind.config.js",
  "private": true,
  "exports": {
    ".": "./tailwind.config.js",
    "./dist/style.css": "./dist/style.css",
    "./tokens-config": "./src/tokens-config.js"
  },
  "scripts": {
    "generate:tokens": "node scripts/generate-tokens.js",
    "dev": "concurrently \"node scripts/watch-tokens.js\" \"tailwindcss -i ./src/style.css -o ./dist/style.css --watch\"",
    "clean": "rimraf dist",
    "build": "npm run clean && npm run generate:tokens && tailwindcss -i ./src/style.css -o ./dist/style.css --minify"
  },
  "devDependencies": {
    "autoprefixer": "^10.5.0",
    "chokidar": "^3.6.0",
    "concurrently": "^9.0.0",
    "postcss": "^8.5.14",
    "rimraf": "^5.0.0",
    "tailwindcss": "3.4",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### 2.3 Vue 컴포넌트 패키지 (`@ui/vue`)
불필요한 빌드 과정을 제거하고, 타입 검증과 샌드박스 렌더링에만 집중하는 가장 가벼운 상태를 유지합니다.

```json
{
  "name": "@ui/vue",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit", 
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.6.0",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@ui/style": "*",
    "@vitejs/plugin-vue": "^5.0.0",
    "@vue/tsconfig": "^0.9.1",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "3.4",
    "typescript": "^5.2.2",
    "vite": "^5.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```


---


## 3. 핵심 아키텍처 문제 해결 노트

### 3.1 대괄호 `[]` 임의 픽셀값 실시간 렌더링(HMR) 버그 픽스
모노레포 환경에서 `[20px]` 등의 임의 값이 즉각 렌더링되지 않는 문제를 해결하기 위해, `@ui/vue/vite.config.ts` 파일에 워커(Watcher) 강제 감시 옵션을 적용했습니다.

```typescript
// @ui/vue/vite.config.ts
export default defineConfig({
  // ...
  server: {
    watch: {
      ignored: ['!**/packages/**'] // 상위 패키지 폴더의 변화를 절대 무시하지 않도록 강제
    }
  },
  optimizeDeps: {
    exclude: ['@ui/style'] // 로컬 패키지 캐싱 제외
  }
})
```

### 3.2 단일 진실 공급원 (Single Source of Truth)
* `tokens-config.js`를 신설하여 전체 시스템의 **클래스 접두사(PREFIX)**와 **단위(px ↔ rem)**를 단 한 곳에서 통제하도록 설계했습니다.
* 디자이너의 변칙적인 네이밍 컨벤션으로 인한 시스템 에러를 막기 위해 `generate-tokens.js` 내부에 정규식 이스케이프(`escapeRegExp`) 방어 로직을 구현했습니다.


---


## 4. 로컬 개발 명령어 (Development)
모든 설정이 완료된 후, 루트 디렉토리에서 아래의 명령어만으로 개발을 진행합니다.

**1. 패키지 설치 및 링크 연결**
```bash
npm install
```

**2. 전체 모노레포 동시 실행**
```bash
npm run dev
```
> 터미널 하나에서 `chokidar`의 토큰 감시, Tailwind CSS 빌드, Vite 화면 렌더링이 색상별로 구분되어 동시에 실행됩니다. 소스 코드를 수정하면 새로고침 없이 0.1초 만에 화면에 즉각 반영됩니다.

**3. 프로덕션 빌드 (배포용 CSS 및 토큰 재생성)**
```bash
npm run build
npm run build -w packages/ui-style (개별 build)
```