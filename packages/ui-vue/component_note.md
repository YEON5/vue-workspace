# @ui/vue 컴포넌트에서 디자인 토큰 쓰기

컴포넌트 props는 **디자인 토큰에 있는 값만** 받습니다. 토큰 목록과 값은 `src/types/tokens.generated.ts`(자동 생성)에 있고, 아래 types가 이 파일에서 만들어집니다.
토큰에 없는 이름을 쓰면 vue-tsc 오류가 나므로 빌드 전에 알 수 있습니다.

| 파일 | 내용 | 수정 |
|---|---|---|
| `types/tokens.generated.ts` | 토큰 목록·값 | ❌ 자동 생성 (`npm run tokens`) |
| `types/spacing.ts` · `radius.ts` · `fontSize.ts` | 토큰 이름 type + 클래스 맵 | 거의 없음 |
| `types/typo.ts` | Typo variant (크기 + 굵기 + 행간) | 없음 (굵기는 `@ui/style tokens.rules.json` typography) |
| `types/color.ts` | **역할 → 색상 클래스** (`primary` → `text-primary`) | ✏️ 프로젝트별 |
| `utils/cn.ts` | 클래스 병합 (토큰 클래스를 tailwind-merge에 등록) | 없음 |

---

## Typo

```vue
<Typo variant="heading-lg">제목</Typo>
<Typo variant="body-md" color="caption">본문</Typo>
<Typo as="h2" variant="display-sm" align="center" :multi-ellipsis="2">…</Typo>
```

| prop | 값 |
|---|---|
| `variant` | font-size 토큰 이름 중 `tokens.rules.json` typography에 굵기가 지정된 것 (기본 `body-md`) |
| `color` | color.ts 역할 (기본 `body`) |
| `as` | 태그 (기본 `p`) |
| `align` | `left` · `center` · `right` |
| `ellipsis` / `multiEllipsis` | 1줄 / 2·3·4줄 말줄임 |

- variant = `text-{크기} font-{굵기} leading-normal` (행간 1.5)
- 크기·굵기는 화면 너비별로 자동으로 바뀝니다.
- 전체 목록과 값은 **ui-docs Typo 페이지** 또는 `tokens.generated.ts` `FONT_SIZE_SCALE`에서 확인합니다.
- variant를 추가·변경하려면 `packages/ui-style/src/tokens/tokens.rules.json`의 `typography`를 수정합니다.

---

## Color (역할)

컴포넌트의 `color` prop은 색상 클래스가 아니라 **역할 이름**을 받습니다.

```vue
<Button color="primary">확인</Button>
<Typo color="caption">설명</Typo>
<Badge color="error" :count="3" />
```

역할 → 클래스 매핑은 `types/color.ts`에 있습니다 (PDS_v2).

| 역할 | 글자색 `colorMap` | 배경 `bgColorMap` | 테두리 `borderColorMap` |
|---|---|---|---|
| primary | text-primary | element-primary | border-primary |
| secondary | text-subtle | element-neutral-dark | border-neutral |
| tertiary | text-subtler | element-neutral | border-neutral-light |
| display · heading · black | text-bolder | (black) element-black-static | (black) border-neutral-darker |
| body | text-basic | | |
| caption · label | text-subtler | | |
| info · error · success · warning | text-information · danger · success · warning | element-* | border-info · danger · success · warning |
| disabled | text-disabled | surface-disabled | border-disabled |
| white | text-inverse-static | surface-white-static | |
| base / default | | background-default (페이지 배경) | border-neutral-light (기본 테두리) |

- 값은 토큰에 있는 클래스만 쓸 수 있습니다 (type으로 제한).
- **다른 프로젝트에서 토큰에 없는 클래스가 있으면 그 역할을 `ColorToken`과 맵에서 뺍니다.** 다른 토큰으로 대신 연결하지 않습니다.

---

## Spacing · Radius props

`SpacingProps`(useSpacing)와 `RadiusProps`(useRadius)를 쓰는 컴포넌트(Box, Flex, Section, Container, Button, Typo 등)는 간격·모서리를 props로 받습니다.

```vue
<Box p="9" mt="11" rounded="sm">…</Box>         <!-- p-9(16px) mt-11(24px) rounded-sm(8px) -->
<Flex direction="col" gap="5">…</Flex>           <!-- gap-5(8px) -->
<Button pt="none" rounded="full">…</Button>      <!-- none = 0, full = Tailwind rounded-full -->
```

| prop | 값 |
|---|---|
| `p` `pt` `pb` `pl` `pr` `px` `py` `m` `mt` `mb` `ml` `mr` `mx` `my` `gap` | `'none'` + spacing 토큰 단계 (`'0'`~`'22'`) |
| `rounded` | `'none'` + radius 토큰 (`min` `xs` `sm` `md` `lg` `xl` `max`) + `'full'` |

단계별 px 값은 `tokens.generated.ts`의 `SPACING_SCALE`, `RADIUS_SCALE`에 있습니다.

---

## 클래스를 직접 쓸 때

```vue
<div class="surface-elevated-01 border border-neutral-light rounded-sm p-9 flex gap-5">
```

- **규칙**: 토큰에 그 카테고리가 있으면 Tailwind 기본을 끄고 토큰만, 없으면 Tailwind 기본을 씁니다. 자세한 내용은 `.claude/skills/design-tokens/token-usage.md`.
- **토큰 클래스**: 색상(`surface-*`, `text-*`, `border-*` …, 팔레트 `gray-30` …), 간격(`p-9`), 모서리(`rounded-sm`), 글자(`text-body-md`, `font-bold`), 반응형(`medium:`, `large:`)
- **꺼진 Tailwind 기본**: 팔레트(`text-gray-300`, `bg-red-500`), 글자 크기(`text-sm`), 굵기(`font-semibold`), 모서리(`rounded-2xl`), 반응형(`md:`)
- **항상 사용 가능**: `p-0` 등 `0`, `rounded-none`, `rounded-full`, `bg-transparent`, `text-current`, `bg-white`, `text-black`
- **Tailwind 기본 클래스**: 토큰 카테고리가 아닌 레이아웃·보조 스타일(`flex`, `w-full`, `grid-cols-2`, `max-w-md`, `shadow-*` …)은 자유롭게 사용
- 색상 임의 값(`bg-[#fff]`)은 쓰지 않습니다. 작업 후 `npx eslint <파일>`로 확인합니다.
- 직접 쓴 클래스는 타입 검사가 되지 않습니다. 컴포넌트 공통 값은 가능하면 color.ts 등의 맵을 거쳐 씁니다.
- 임의 값(`size-[32px]`)이 토큰 단계와 같으면 토큰 클래스로 바꿉니다 (`size-13`). VS Code Tailwind 확장이 제안해 줍니다.
- 클래스 병합은 `cn()`을 씁니다. 토큰 클래스가 등록돼 있어 `text-body-md`(크기)와 `text-basic`(색)을 구분합니다.

---

## 다크모드

`composables/useColorMode.ts` — `<html>`에 `dark` 클래스를 붙여 색상 토큰을 dark 값으로 바꿉니다.

```ts
const { mode, isDark, setMode, toggle } = useColorMode();
setMode('dark');    // 'light' | 'dark' | 'system'(OS 설정 따름, 기본)
toggle();           // 라이트 ↔ 다크
```

- 선택한 모드는 localStorage(`color-mode`)에 저장됩니다.
- `AppLayout.vue`에서 앱 시작 시 한 번 호출합니다. 토글 버튼을 둘 경우의 코드는 AppLayout에 주석으로 있습니다.
- 모드를 바꾸는 순간에는 transition을 꺼서 헤더·본문이 동시에 바뀝니다.
- 다크모드에서 바뀌는 것은 semantic 색뿐입니다. 색이 안 바뀌는 곳은 고정 색(`bg-white`, `#fff`)이나 팔레트(`gray-30`)를 쓴 곳입니다 → 필요하면 semantic 클래스로 교체.

---

## 개발 서버

| 패키지 | 포트 |
|---|---|
| ui-vue | 5810 |
| ui-docs | 5820 |
