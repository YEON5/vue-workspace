# Vue 3 + Tailwind CSS Monorepo 구축 가이드
본 문서는 디자인 시스템 토큰 관리 및 스타일 패키지(`@ui/style`)와
Vue 3 애플리케이션 패키지(`@ui/vue`)를 독립적으로 분리하여 구성하는
멀티 패키지(Monorepo) 환경의 신규 프로젝트 셋팅 가이드입니다.

---

## 1. 프로젝트 구조 (Directory Structure)
최종적으로 구성되는 프로젝트의 디렉토리 구조는 다음과 같습니다.

```text
vue-workspace/
├── packages/
│   ├── ui-style/                  # 기존 폴더 전체 복사 (디자인 토큰 및 스타일)
│   │   ├── scripts/
│   │   ├── src/
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── ui-vue/                    # 신규 구성 (Vue 3 애플리케이션)
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── layout/ 
│       │   │   ├── ui/ 
│       │   ├── App.vue
│       │   ├── main.ts 
│       │   ├── style.css
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── eslint.config.mjs           # 전역 ESLint 설정 (Flat Config)
└── package.json                # 루트 워크스페이스 설정
```

---

## 2. 패키지별 설정 파일 (`package.json`)

### 2.1 루트 워크스페이스 (Root)
`packages/*` 하위의 프로젝트들을 하나의 워크스페이스로 묶고, 전역 린트 환경(ESLint v10+)을 공유합니다.

```json
{
  "name": "vue-workspace",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.4.1",
    "eslint-plugin-vue": "^10.9.1",
    "typescript-eslint": "^8.60.0",
    "vue-eslint-parser": "^10.4.0"
  }
}
```

### 2.2 스타일 패키지 (`@ui/style`)
*(기존에 구성된 폴더를 그대로 사용하므로 참고용입니다.)*

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
    "dev": "npm run generate:tokens && tailwindcss -i ./src/style.css -o ./dist/style.css --watch",
    "build": "npm run generate:tokens && tailwindcss -i ./src/style.css -o ./dist/style.css --minify"
  },
  "devDependencies": {
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.14",
    "tailwindcss": "3.4",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### 2.3 Vue 애플리케이션 패키지 (`@ui/vue`)
Vite + TypeScript 기반의 Vue 3 패키지이며, 로컬 워크스페이스 내의 `@ui/style` 의존성을 가져와 사용합니다.

```json
{
  "name": "@ui/vue",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
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

## 3. 신규 구축 프로세스 (Step-by-Step)

### 단계 1: 루트 워크스페이스 초기화
```bash
# 1. 루트 폴더 생성 및 이동
mkdir vue-workspace
cd vue-workspace

# 2. package.json 초기화 후 루트 package.json 내용(위 2.1 참고) 작성
npm init -y

# 3. 패키지 저장 공간 생성
mkdir packages
```

### 단계 2: `@ui/style` 패키지 구성 (폴더 복사)
```bash
# 1. 기존에 세팅이 완료된 style 폴더 전체를 packages/ 디렉토리 내부로 복사합니다.
# (최종 경로: vue-workspace/packages/style)
```
> 💡 **참고:** 이미 완성된 디자인 토큰 및 Tailwind 설정 파일들이 복사되므로, 별도의 스크립트 작성이나 추가 패키지 설정이 필요 없습니다.

### 단계 3: `@ui/vue` 패키지 구성
```bash
# 1. 패키지 폴더 생성 및 이동
mkdir -p packages/vue
cd packages/vue

# 2. package.json 작성 (위 2.3 Vue 패키지 내용 파일 저장)

# 3. Vite 및 TypeScript 실행을 위한 기본 파일 구성
mkdir src
touch src/main.ts
touch src/App.vue
touch vite.config.ts
touch tsconfig.json
```

### 단계 4: 전체 의존성 설치 및 상호 링크
루트 디렉토리로 이동하여 의존성을 설치하면, 패키지 매니저가 복사된 `@ui/style` 폴더를 자동으로 인식하고 `@ui/vue`에서 사용할 수 있도록 심볼릭 링크를 연결해 줍니다.

```bash
# 루트 디렉토리(vue-workspace)로 이동
cd ../../

# 워크스페이스 의존성 통합 설치 및 로컬 패키지 심볼릭 링크 연결
npm install
```

---

## 4. 로컬 개발 안내 (Development)

의존성 설치가 완료되면 워크스페이스 루트에서 각 하위 패키지의 스크립트를 독립적으로 혹은 병렬로 실행할 수 있습니다.

* **concurrently 라이브러리 적용함:**
  # root 에서 서버 실행 명령어
  ```bash
  npm run dev
  npm run dev -w packages/ui-vue
  ```

  # root 에서 css 빌드 명령어
  ```bash
  npm run build
  npm run build -w packages/ui-style
  ```