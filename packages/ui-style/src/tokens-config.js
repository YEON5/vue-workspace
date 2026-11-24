// ─────────────────────────────────────────────────────────
// ✏️  Tailwind 클래스 접두사 설정 (단일 관리 포인트)
// 이 값을 바꾸면 generate-tokens.js가 만드는 @theme 변수(--color-pds-*, --radius-pds-* ...)에 반영됩니다.
//
// 토큰 클래스에만 붙고 Tailwind 기본 클래스(flex, p-0 ...)에는 붙지 않습니다.
// 현재: "pds"  →  bg-pds-primary-50, text-pds-basic, p-pds-9, rounded-pds-small ...
// 빈 문자열: "" → bg-primary-50, text-basic, p-9, rounded-small ...
// ─────────────────────────────────────────────────────────
const PREFIX = ""; // 문자열 필요시 원하는 문자열 넣기

// PREFIX가 있으면 "pds-", 없으면 "" (빈 문자열) 반환
const PREFIX_DASH = PREFIX ? `${PREFIX}-` : "";

// "rem" | "px" — 이 값만 바꾸면 됨 (npm run tokens / dev 중이면 자동 반영)
// rem: 토큰 값을 rem으로 출력(16px → 1.6rem) + html { font-size: 62.5% } 자동 추가 (1rem = 10px)
// px:  토큰 값을 px로 출력, html font-size는 브라우저 기본(16px)
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