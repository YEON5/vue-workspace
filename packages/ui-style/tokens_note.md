# @ui/style

디자인 토큰 기반 Tailwind CSS 스타일 패키지입니다.
피그마 Variables를 export한 JSON을 표준 디자인 토큰(DTCG 2025.10)으로 변환하고, Tailwind v4 `@theme` 변수와 ui-vue 토큰 타입을 자동 생성합니다.

```
figma-export/*.tokens.json ─ convert(tokens.rules.json) → design-tokens.json ─ generate → design-tokens.css + tokens.generated.ts ─ tailwindcss → dist/style.css
```

---

## 폴더 구조

```
packages/ui-style/
├── src/
│   ├── tokens/
│   │   ├── figma-export/        # 피그마 Variables > Export 원본 JSON (컬렉션·모드별 파일 그대로)
│   │   ├── tokens.rules.json    # ✏️ 변환 규칙 (Figma 경로 → 표준 경로, 기본 모드, 제외 목록)
│   │   └── design-tokens.json   # 표준 디자인 토큰 DTCG 2025.10 (자동 생성, 수정 금지, 커밋 대상)
│   ├── tokens-config.js        # ✏️ PREFIX(접두사) / UNIT(단위) / MODES(다크·반응형 출력) / 타입 생성 위치
│   ├── design-tokens.css       # @theme 토큰 변수 (자동 생성, 수정 금지)
│   └── style.css               # Tailwind v4 진입점 CSS (@import, @source 스캔 경로·동적 클래스, 기본 스타일)
├── dist/
│   └── style.css               # 빌드 결과물 (ui-vue 등에서 import)
├── scripts/
│   ├── convert-tokens.js       # figma-export → design-tokens.json (규칙 적용·파일 합치기·검증·변경 요약)
│   ├── generate-tokens.js      # design-tokens.json → design-tokens.css(@theme) + ui-vue types/tokens.generated.ts
│   └── watch-tokens.js         # dev 모드 시 figma-export·규칙·설정 변경 감시 → 자동 재생성
└── package.json                # tailwindcss v4 + @tailwindcss/cli (tailwind.config.js, postcss.config.js 없음)
```

---

## 빌드 명령어

> 루트(`vue-workspace/`)에서 실행하는 것을 권장합니다.

### 개발 모드 (watch)

```bash
# 루트에서 실행 (ui-style watch + ui-vue dev 동시 실행)
npm run dev

# ui-style 단독 실행
npm run dev -w @ui/style
```

`figma-export/`, `tokens.rules.json`, `tokens-config.js` 변경 시 자동으로 토큰을 재생성하고, Tailwind CSS도 즉시 반영됩니다.

### 프로덕션 빌드

```bash
# 루트에서 실행 (ui-style 빌드 후 ui-vue 빌드 순서 보장)
npm run build

# ui-style 단독 실행
npm run build -w @ui/style
```

빌드 순서: `tokens:convert` → `generate:tokens` → `tailwindcss --minify` → `dist/style.css` 생성

### 토큰만 재생성

```bash
npm run tokens -w @ui/style            # convert + generate
npm run tokens:convert -w @ui/style    # figma-export → design-tokens.json 만
npm run generate:tokens -w @ui/style   # design-tokens.json → css · ts 만
```

convert는 규칙에 없는 변수, 중복, 타입 불일치가 있으면 저장하지 않고 오류 목록을 출력합니다. 성공하면 추가·삭제·변경된 토큰 수를 출력합니다.

---

## 피그마 토큰 변경 시

피그마에서 토큰을 업데이트한 경우 아래 순서로 진행합니다.

1. 피그마 Variables > Export로 컬렉션·모드별 JSON을 받아 `src/tokens/figma-export/`의 파일 교체 (파일 이름 유지)
2. 새 변수가 생겨 convert가 "규칙 없음" 오류를 내면 `tokens.rules.json`의 `mappings` 또는 `ignore`에 추가
3. 토큰 재생성 및 빌드

```bash
npm run build -w @ui/style
```

개발 모드(`npm run dev`) 중이라면 `figma-export/` 파일 교체 시 자동으로 재생성됩니다.

---

## PREFIX 변경 (Tailwind 클래스 접두사)

`src/tokens-config.js`에서 `PREFIX`를 수정합니다.

```js
// src/tokens-config.js
const PREFIX = "pds"; // 변경
```

변경 후 재빌드하면 모든 토큰 클래스에 접두사가 반영됩니다.

| PREFIX | 클래스 예시 |
|--------|------------|
| `""` (기본) | `bg-primary-50`, `text-basic`, `p-9`, `rounded-sm` |
| `"pds"` | `bg-pds-primary-50`, `text-pds-basic`, `p-pds-9`, `rounded-pds-sm` |

접두사는 토큰 클래스에만 붙고 `flex`, `p-0`, `rounded-none` 같은 Tailwind 기본 클래스에는 붙지 않습니다.

```bash
# 변경 후 재빌드
npm run build -w @ui/style
```

---

## UNIT 변경 (토큰 단위)

`src/tokens-config.js`에서 `UNIT`을 수정합니다.

```js
// src/tokens-config.js
const UNIT = "rem"; // "rem" | "px"
```

| UNIT | 설명 | style.css 설정 |
|------|------|----------------|
| `"rem"` | `font-size: 62.5%` 기준, `1rem = 10px` | `html { font-size: 62.5% }` 유지 |
| `"px"` (기본) | 픽셀 단위 직접 사용 | `html { font-size: 62.5% }` 제거 |

### rem → px 전환 시

1. `tokens-config.js`에서 `UNIT = "px"` 변경
2. `src/style.css`에서 `html { font-size: 62.5% }` 제거
3. 재빌드

```bash
npm run build -w @ui/style
```

### px → rem 전환 시

1. `tokens-config.js`에서 `UNIT = "rem"` 변경
2. `src/style.css`에 `html { font-size: 62.5% }` 추가
3. 재빌드

---

## 디자인 토큰 Tailwind 클래스 사용 예시

> 아래 예시는 `PREFIX = ""` (기본값) 기준입니다. 전체 목록과 px 값은 `src/design-tokens.css`, ui-vue `src/types/tokens.generated.ts` 참고.

### Color

**규칙 (다른 프로젝트에도 동일하게 적용)**

1. 클래스 이름 = Figma 변수 경로 그대로 (`color/` 제외, `/` → `-`)
   `color/surface/elevated-01` → `surface-elevated-01`, `color/text/basic` → `text-basic`
2. CSS 속성 = 변수의 Figma 용도(scopes)
   | Figma 용도 | CSS 속성 | 예 |
   |---|---|---|
   | 채우기 | 배경 | `background-default`, `surface-elevated-01`, `action-neutral-hover`, `button-primary-fill`, `input-surface` |
   | 선 | 테두리 | `border-neutral`, `divider-neutral`, `button-secondary-border`, `input-border` |
   | 텍스트 | 글자색 | `text-basic`, `text-danger` |
   | 여러 용도 | 배경이 기본, 나머지는 접두어 | `element-primary`(배경), `border-element-neutral`(테두리), `text-element-white-static`(체크 표시 등 아이콘 모양) |
3. 예외는 `tokens.rules.json`의 `utilities.groups`에만 적습니다 (PDS_v2)
   - `icon`, `link` → 글자색 (아이콘은 `currentColor`로 칠해짐)
   - `alpha`, `graphic` → 항상 접두어: `bg-alpha-inverse50`, `shadow-alpha-shadow2`, `text-graphic-purple`
4. primitive 팔레트는 접두어: `bg-primary-50`, `text-danger-60` (시맨틱 변수가 없을 때만 사용)
5. CSS 변수 = `--color-{그룹}-{이름}` (예: `var(--color-text-basic)`, `var(--color-element-primary)`)
6. Tailwind 기본 클래스와 이름이 겹치는 그룹(예: shadow, ring)은 generate가 오류로 알려줍니다 → 규칙 파일에서 이름 변경 또는 `prefixed` 지정

**그룹별 용도 (PDS_v2)**

| 그룹 | 용도 |
|---|---|
| background | 페이지 바탕, 전체 화면 딤 |
| surface | 카드·모달·팝오버(elevated-01~03), 상태 배경(*-subtler), 컴포넌트 딤 |
| action | 버튼 외 인터랙티브 요소의 hover·pressed·selected·active 배경 |
| element | 뱃지·칩·태그·스위치·프로그레스·체크박스/라디오 채움, 라디오 테두리·외곽선 뱃지, 체크 표시 |
| text | 텍스트 |
| icon | 아이콘 |
| border | 카드·박스·태그·칩·체크박스 테두리 |
| divider | 구분선 (Divider, 테이블·리스트) |
| button | 버튼 전용 fill·border |
| input | 입력 폼 전용 surface·border |
| link | 텍스트 링크 |
| alpha | 투명도 스케일(base·inverse는 다크모드에서 반전, white·black은 고정), 그림자 색 |
| graphic | 차트·일러스트 등 비시맨틱 색 |

- 다크모드: 상위 요소(보통 `<html>`)에 `dark` 클래스를 붙이면 모든 색상 변수가 dark 값으로 바뀝니다. 클래스 이름은 그대로입니다.
- 원본 팔레트(Figma `color` 컬렉션)는 클래스로 만들지 않습니다.

### Spacing (primitive number)

`p-*`, `m-*`, `gap-*`, `px-*`, `mt-*` 등 모든 간격 유틸리티가 같은 단계를 씁니다. 토큰에 없는 숫자(`p-23` 등)는 클래스가 생성되지 않습니다.

| 클래스 | 값 | 클래스 | 값 | 클래스 | 값 |
|--------|----|--------|----|--------|----|
| `p-0` | 0px | `p-8` | 14px | `p-16` | 44px |
| `p-1` | 1px | `p-9` | 16px | `p-17` | 48px |
| `p-2` | 2px | `p-10` | 20px | `p-18` | 56px |
| `p-3` | 4px | `p-11` | 24px | `p-19` | 64px |
| `p-4` | 6px | `p-12` | 28px | `p-20` | 72px |
| `p-5` | 8px | `p-13` | 32px | `p-21` | 80px |
| `p-6` | 10px | `p-14` | 36px | `p-22` | 96px |
| `p-7` | 12px | `p-15` | 40px | | |

### Border Radius

`rounded-min`(4px), `rounded-xs`(6px), `rounded-sm`(8px), `rounded-md`(10px), `rounded-lg`(12px), `rounded-xl`(14px), `rounded-max`(16px)

`rounded-full`은 Tailwind 기본 클래스를 사용합니다 (정사각형은 원, 직사각형은 알약 모양). Figma `radius/full`은 변환에서 제외합니다.

### Font Size · Font Weight (반응형)

화면 크기에 따라 값이 바뀝니다. 기본(small) → 768px 이상(medium) → 1280px 이상(large).

```html
<h1 class="text-display-lg font-bold">...</h1>  <!-- 44px → 1280px 이상 60px / bold: 600 → 700 -->
<p class="text-body-md">...</p>                 <!-- 16px -->
```

`text-{display,heading,body,label,navigation}-*`, `font-regular` · `font-medium` · `font-bold`

### 크기 줄임말

Figma 이름의 크기 단어는 Tailwind식 줄임말로 바뀝니다 (`tokens.rules.json`의 `abbreviations`). font-weight 이름은 제외.

| Figma | xxxsmall | xxsmall | xsmall | small | medium | large | xlarge | xxlarge | xxxlarge |
|---|---|---|---|---|---|---|---|---|---|
| 코드 | `3xs` | `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` |

### CSS 변수 직접 사용

클래스가 없는 토큰(grid, padding-card, gap-layout, size, border-width, shadow, letter-spacing)은 CSS 변수로 사용합니다.

```css
.custom {
  color: var(--color-text-basic);
  padding: var(--padding-card-md);
  gap: var(--gap-layout-h2-h3);
  width: var(--size-sm);
  border-radius: var(--radius-sm);
}
```