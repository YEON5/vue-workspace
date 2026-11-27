// ─────────────────────────────────────────────────────────
// ✏️  CSS 변수 접두사 설정 (단일 관리 포인트)
// CSS 변수 이름 맨 앞에만 붙고, 클래스 이름에는 붙지 않습니다.
// "pds" → --pds-radius-min, --pds-spacing-9, --pds-text-body-lg, --pds-color-text-basic
//         클래스는 그대로: rounded-min, p-9, text-body-lg, text-basic
// ""    → --radius-min, --spacing-9, --text-body-lg, --color-text-basic
// ─────────────────────────────────────────────────────────
const PREFIX = ""; // 문자열 필요시 원하는 문자열 넣기

// PREFIX가 있으면 "pds-", 없으면 "" (빈 문자열) 반환
const PREFIX_DASH = PREFIX ? `${PREFIX}-` : "";

// "rem" | "px" — 이 값만 바꾸면 됨 (npm run tokens / dev 중이면 자동 반영)
// rem: 토큰 값을 rem으로 출력, 브라우저·Tailwind 기본 1rem = 16px 기준 (16px → 1rem, 14px → 0.875rem)
// px:  토큰 값을 px로 출력 (html font-size는 어느 쪽이든 바꾸지 않음)
const UNIT = "px";

// ─────────────────────────────────────────────────────────
// 모드 출력 방식 (tokens.rules.json의 defaultModes가 기본값, 나머지 모드를 어떻게 적용할지)
//   selector: 해당 클래스가 붙으면 변수 값을 덮어씀 (다크모드)
//   media:    화면 크기 조건에서 변수 값을 덮어씀 (반응형, Figma grid/screen-size 기준)
// ─────────────────────────────────────────────────────────
const MODES = {
  dark: { selector: ".dark" },
  medium: { media: "(min-width: 768px)" },
  large: { media: "(min-width: 1280px)" },
};

// 토큰 목록 TS 파일 생성 위치 (ui-vue types에서 import)
const TYPES_OUTPUT = "../ui-vue/src/types/tokens.generated.ts";

module.exports = { PREFIX, PREFIX_DASH, UNIT, MODES, TYPES_OUTPUT };