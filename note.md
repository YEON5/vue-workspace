# 🛠️ VS Code & ESLint 프론트엔드 환경 설정 가이드 (Vue / SCSS / Tailwind)

이 문서는 Prettier의 강제 줄바꿈(한 줄 병합) 현상을 방지하고, **개발자의 수동 줄바꿈을 100% 보존하면서 저장 시 들여쓰기(Tab 2칸)만 자동 정렬**되도록 구성된 환경 설정입니다.

## 1. 필수 패키지 설치

Vue 환경에서 ESLint가 Prettier를 대신하여 포맷팅을 담당하도록 플러그인을 설치합니다.

```bash
npm install -D eslint eslint-plugin-vue

npm install -D eslint-plugin-react