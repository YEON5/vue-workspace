# 🛠️ 신규 프로젝트 완벽 포맷팅 세팅 가이드 (Vue 3 + ESLint Flat Config)

이 세팅은 Prettier의 강제 한 줄 병합을 방지하고, 
**개발자의 수동 줄바꿈을 유지하면서 저장 시 2칸 들여쓰기를 자동 정렬**해 주는 궁극의 환경 구성입니다.
화면에 거슬리는 노란색(Warning) 밑줄도 깔끔하게 숨겨줍니다.

## Step 1: 필수 패키지 설치

최신 ESLint(Flat Config)와 TypeScript 파서, Vue 플러그인을 설치합니다. 터미널에 아래 명령어를 실행하세요.

```bash
npm install -D eslint @eslint/js eslint-plugin-vue typescript-eslint