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
├── 📂 apps/                     # 개발         
│
└── 📂 packages/
    │
    ├── 📂 ui-public/            # 이미지, 폰트 패키지
    │   ├── fonts/               
    │   ├── images/              
    │   └── package.json
    │
    ├── 📂 ui-style/              # 🎨 디자인 시스템 토큰 및 공통 CSS 패키지
    │   ├── package.json
    │   ├── tailwind.config.js    # Tailwind 설정 (디자인 토큰 동적 생성 및 주입)
    │   ├── postcss.config.js
    │   ├── dist/
    │   │   └── style.css         # 빌드된 최종 CSS (모든 앱에서 공통 사용)
    │   ├── scripts/
    │   │   ├── generate-tokens.js # 토큰 자동 파싱 및 JS/CSS 변환 로직 (정규식 방어 포함)
    │   │   └── watch-tokens.js    # chokidar 기반 토큰 변경 실시간 감시자
    │   └── src/
    │       ├── style.css          # ui-vue에서 사용할 tailwind style
    │       ├── tokens-config.js   # PREFIX(접두사) 및 UNIT(px/rem) 중앙 통제소
    │       └── tokens/
    │           └── design-tokens.json # Figma(Tokens Studio) 원본 토큰
    │
    ├── 📂 ui-vue/                # 💻 Vue 3 UI 컴포넌트 라이브러리 패키지
    │    ├── package.json          # @ui/style을 로컬 심볼릭 링크로 참조
    │    ├── vite.config.ts        # 모노레포 HMR 핫릴로드 최적화 설정
    │    ├── tsconfig.json
    │    ├── scripts/
    │    │   ├── generate-icons.js # svg 아이콘 자동화 components
    │    │   └── watch-icons.js    # 아이콘 감지
    │    └── src/
    │        ├── assets/
    │        │   └── icons/       # svg 아이콘 이미지
    │        ├── components/      # Button, Divider, Container 등 공통 UI 컴포넌트 (cn/tailwind-merge 활용)
    │        │   └── layout/      # UI 레이아웃 컴포넌트
    │        │   └── ui/          # UI 컴포넌트
    │        ├── composables/     # Typescript 
    │        ├── types/           # Types
    │        └── utils/
    │            └── cn.ts        # 클래스명 병합 유틸리티 (Tailwind Variants)
    │
    ├── 📂 ui-docs/              # 퍼블리싱 IA, 컴포넌트 카탈로그
    │
    └── 📂 markup/               # 퍼블리싱용 화면 산출물
         └── pages/
             ├── web/
             ├── card/
             └── trip/
```

---


## 2. 핵심 아키텍처 문제 해결 노트

**2.1 대괄호 `[]` 임의 픽셀값 실시간 렌더링(HMR) 버그 픽스**
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

**2.2 단일 진실 공급원 (Single Source of Truth)**
* `tokens-config.js`를 신설하여 전체 시스템의 **클래스 접두사(PREFIX)**와 **단위(px ↔ rem)**를 단 한 곳에서 통제하도록 설계했습니다.
* 디자이너의 변칙적인 네이밍 컨벤션으로 인한 시스템 에러를 막기 위해 `generate-tokens.js` 내부에 정규식 이스케이프(`escapeRegExp`) 방어 로직을 구현했습니다.


---


## 3. 로컬 개발 명령어 (Development)
모든 설정이 완료된 후, 루트 디렉토리에서 아래의 명령어만으로 개발을 진행합니다.

**3.1 패키지 설치 및 링크 연결**
```bash
npm install
```

**3.2 모노레포 실행**
```bash
npm run dev        # 전체 실행
npm run dev:docs   # ui-docs만 (컴포넌트 확인 위주로 작업할 때)
npm run dev:vue    # ui-vue만 (레이아웃만 확인할 때)
```

> 터미널 하나에서 `chokidar`의 토큰 감시, Tailwind CSS 빌드, Vite 화면 렌더링이 색상별로 구분되어 동시에 실행됩니다. 소스 코드를 수정하면 새로고침 없이 0.1초 만에 화면에 즉각 반영됩니다.

**3.3 프로덕션 빌드 (배포용 CSS 및 토큰 재생성)**
```bash
npm run build
npm run build -w packages/ui-style (개별 build)
```