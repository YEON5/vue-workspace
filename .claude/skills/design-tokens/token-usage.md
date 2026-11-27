# 디자인 토큰 사용 규칙 (AI·개발자 공통)

이 파일이 원본입니다. 자동으로 읽히도록 다음 두 파일이 이 파일을 불러옵니다: `.claude/rules/design-tokens.md`(Claude Code), `.agents/rules/design-tokens.md`(Antigravity). design-tokens skill도 실행할 때 이 파일을 가장 먼저 읽습니다.

## 기본 규칙

1. **토큰에 그 카테고리가 있으면 Tailwind 기본을 끄고 토큰만 쓴다.**
2. **토큰에 그 카테고리가 없으면 Tailwind 기본을 쓴다.**

- 판단 단위는 **값이 아니라 카테고리**다. 모서리 토큰이 있으면 토큰에 없는 `rounded-2xl`을 Tailwind로 대신 쓰지 않는다.
- 카테고리 = 클래스를 만드는 토큰 종류: 색상, 간격, 글자 크기, 굵기, 모서리, 반응형(화면 너비 모드).
- CSS 변수로만 나오는 토큰(그림자 조각 `--shadow-y-3`, 자간 `--letter-spacing-1`, `--gap-layout-*` 등)은 클래스 카테고리가 아니다 → `shadow-*`, `tracking-*`는 Tailwind 기본을 쓰고, 토큰 값은 `var(--…)`로 쓴다.

토큰 값과 클래스 목록: `packages/ui-vue/src/types/tokens.generated.ts`, 팔레트 색은 `packages/ui-style/src/design-tokens.css`의 `--color-*` — 클래스를 쓰기 전에 확인한다.
토큰 변환 규칙: 같은 폴더의 `tokens-convert-rule.md`

## PDS_v2에서 토큰만 쓰는 것

| 카테고리 | 클래스 | 값 확인 |
|---|---|---|
| 색상 | semantic(`text-basic` `surface-elevated-01` `border-neutral-light` `icon-gray` …), 팔레트(`bg-gray-30` `text-primary-50` …) | `*_COLOR_CLASSES`, `design-tokens.css` `--color-*` |
| 간격 | `p-` `m-` `gap-` `w-` `h-` `size-` `inset-` `top-` `translate-` … | `SPACING_SCALE` |
| 글자 크기 | `text-{이름}` (`text-body-md`) | `FONT_SIZE_SCALE` |
| 굵기 | `font-{이름}` (`font-regular` `font-medium` `font-bold`) | `FONT_WEIGHT_SCALE` |
| 모서리 | `rounded-{이름}` (`rounded-min` … `rounded-max`) | `RADIUS_SCALE` |
| 반응형 | `medium:` (≥768px) · `large:` (≥1280px) | `tokens-config.js` `MODES` |

- **간격은 단계 번호다. Tailwind의 4px 배수가 아니다:** `p-9` = 16px, `p-4` = 6px, `p-11` = 24px.
- **팔레트도 PDS 단계다:** `gray-30`(#b1b8be) ≠ Tailwind `gray-300`. Tailwind 팔레트(`gray-300` `red-500` `slate-400` …)는 **없다**.
- 토큰 이름이 Tailwind와 같으면 토큰 값이다: `font-bold` = 600, `rounded-md` = 10px.
- 없는 것: `text-sm` `text-base` `rounded-2xl` `font-semibold` `sm:` `md:` `lg:` `xl:` `2xl:` `text-gray-300` `bg-red-500`.
- 색은 가능하면 역할이 드러나는 semantic 클래스를 쓴다. **다크모드에서 바뀌는 것은 semantic 색뿐이고**, 팔레트(`gray-30` 등)는 바뀌지 않는다. 컴포넌트 prop은 `color.ts` 역할 이름을 쓴다.

## 항상 쓸 수 있는 것 (카테고리와 무관)

- `0`(`p-0` `m-0` `gap-0`), `rounded-none`, `rounded-full`
- `transparent`, `current`(`bg-transparent` `text-current` `fill-current`), `white`, `black`(`bg-white` `text-black`)

## Tailwind 기본을 쓰는 것 (토큰 카테고리가 없음)

- 레이아웃·위치·표시: `flex` `grid` `w-full` `w-1/2` `w-screen` `h-auto` `w-px` `sticky` `hidden` 등
- 이름 너비: `max-w-md` `w-xl` 등
- 행간 `leading-*`(기본 1.5 고정, `leading-normal`), 자간 `tracking-*`, 그림자 `shadow-*`
- 상태 접두어: `hover:` `focus:` `disabled:` 등

## 임의 값

- **크기**: 토큰에 없는 크기는 임의 값을 쓸 수 있다: `w-[240px]`, `max-w-[480px]`, `size-[24px]`. 토큰에 같은 값이 있으면 토큰 클래스를 쓴다 (`p-[16px]` 대신 `p-9`).
- **색상**: 임의 값을 쓰지 않는다 (`bg-[#fff]`, `text-[rgb(…)]` 금지). 토큰 색상 클래스를 쓴다.

## 확인

- 클래스를 쓰거나 고친 뒤 `npx eslint <파일>`로 확인한다.
  - 꺼진 Tailwind 기본 클래스(팔레트·크기·반응형): `better-tailwindcss/no-unknown-classes` 오류
  - 색상 임의 값: `better-tailwindcss/no-restricted-classes` 오류
- ESLint는 `p-4`처럼 존재하지만 기대와 값이 다른 클래스는 잡지 못한다 → 간격은 반드시 `SPACING_SCALE`로 px 값을 확인한다.
- ESLint 대상은 `packages/*/src/**/*.{vue,ts}`다. `packages/markup`에 HTML 파일이 생기면 `eslint.config.mjs` 5번의 `files`에 그 경로를 추가한다 (HTML 파서 설치 필요).
- `style.css`에서는 토큰을 `@apply` 클래스로 쓰고 `var(--…)`로 직접 쓰지 않는다.

## 디자인 토큰 변환

Figma Variables → 토큰 변환·갱신은 design-tokens skill을 따른다 (이 파일 → `tokens-convert-rule.md` → `SKILL.md` 실행 순서).
