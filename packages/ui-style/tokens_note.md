# @ui/style

디자인 토큰 기반 Tailwind CSS 스타일 패키지입니다.
피그마에서 export한 `design-tokens.json`을 파싱해 CSS 변수와 Tailwind 테마를 자동 생성합니다.

---

## 폴더 구조

```
packages/ui-style/
├── src/
│   ├── tokens/
│   │   └── design-tokens.json  # 피그마에서 export한 디자인 토큰 (원본, 단일 소스)
│   ├── tokens-config.js        # ✏️ PREFIX(접두사) / UNIT(단위) 단일 관리 지점
│   ├── design-tokens.css       # CSS 변수 모음 (자동 생성, 수정 금지)
│   ├── design-tokens.js        # Tailwind 테마 주입용 JS (자동 생성, 수정 금지)
│   └── style.css               # Tailwind 진입점 CSS (시맨틱 변수 통합)
├── dist/
│   └── style.css               # 빌드 결과물 (ui-vue 등에서 import)
├── scripts/
│   ├── generate-tokens.js      # JSON → design-tokens.js / design-tokens.css 파서
│   └── watch-tokens.js         # dev 모드 시 design-tokens.json 변경 감시 → 자동 재생성
├── tailwind.config.js          # Tailwind 설정 (design-tokens.js 테마 주입 및 Safelist)
└── postcss.config.js           # PostCSS 설정 (tailwindcss + autoprefixer)
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

`design-tokens.json` 변경 시 자동으로 토큰을 재생성하고, Tailwind CSS도 즉시 반영됩니다.

### 프로덕션 빌드

```bash
# 루트에서 실행 (ui-style 빌드 후 ui-vue 빌드 순서 보장)
npm run build

# ui-style 단독 실행
npm run build -w @ui/style
```

빌드 순서: `generate:tokens` → `tailwindcss --minify` → `dist/style.css` 생성

### 토큰만 재생성

```bash
npm run generate:tokens -w @ui/style
```

`design-tokens.json`이 변경됐을 때 CSS/JS 토큰 파일만 수동으로 재생성합니다.

---

## design-tokens.json 변경 시

피그마에서 토큰을 업데이트한 경우 아래 순서로 진행합니다.

1. `src/tokens/design-tokens.json` 파일 교체
2. 토큰 재생성 및 빌드

```bash
npm run build -w @ui/style
```

개발 모드(`npm run dev`) 중이라면 `design-tokens.json` 저장 시 자동으로 재생성됩니다.

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
| `""` (기본) | `bg-mint-500`, `text-xl`, `rounded-md` |
| `"pds"` | `bg-pds-mint-500`, `text-pds-xl`, `rounded-pds-md` |
| `"ds"` | `bg-ds-mint-500`, `text-ds-xl`, `rounded-ds-md` |

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
| `"rem"` (기본) | `font-size: 62.5%` 기준, `1rem = 10px` | `html { font-size: 62.5% }` 유지 |
| `"px"` | 픽셀 단위 직접 사용 | `html { font-size: 62.5% }` 제거 |

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

> 아래 예시는 `PREFIX = ""` (기본값) 기준입니다.

### Color

```html
<!-- 배경색 -->
<div class="bg-mint-500">...</div>
<div class="bg-gray-100">...</div>
<div class="bg-banner-green">...</div>

<!-- 텍스트색 -->
<p class="text-mint-700">...</p>
<p class="text-gray-950">...</p>

<!-- 보더색 -->
<div class="border border-gray-200">...</div>
```

| 토큰 그룹 | 클래스 예시 |
|----------|------------|
| `mint` | `bg-mint-50` ~ `bg-mint-950` |
| `gray` | `bg-gray-25`, `bg-gray-50` ~ `bg-gray-950`, `bg-gray-white`, `bg-gray-black` |
| `banner` | `bg-banner-green`, `bg-banner-blue`, `bg-banner-violet`, `bg-banner-orange`, `bg-banner-pink`, `bg-banner-yellow` |
| `states` | `bg-states-dark-100-50`, `bg-states-light-100-60` 등 |

### Border Radius

```html
<div class="rounded-sm">...</div>   <!-- 0.2rem -->
<div class="rounded-md">...</div>   <!-- 0.4rem -->
<div class="rounded-lg">...</div>   <!-- 0.8rem -->
<div class="rounded-xl">...</div>   <!-- 1.2rem -->
<div class="rounded-2xl">...</div>  <!-- 1.6rem -->
<div class="rounded-3xl">...</div>  <!-- 2rem -->
<div class="rounded-full">...</div> <!-- 999.9rem -->
```

### Spacing

```html
<!-- padding -->
<div class="p-3">...</div>   <!-- 0.8rem -->
<div class="px-5">...</div>  <!-- 1.6rem -->
<div class="py-7">...</div>  <!-- 2.4rem -->

<!-- margin -->
<div class="mt-4">...</div>  <!-- 1.2rem -->
<div class="mb-8">...</div>  <!-- 3.2rem -->

<!-- gap -->
<div class="flex gap-6">...</div>  <!-- 2rem -->
```

| 토큰 | 값 | 클래스 |
|------|----|--------|
| `spacing-1` | `0.2rem` | `p-1`, `m-1`, `gap-1` 등 |
| `spacing-2` | `0.4rem` | `p-2`, `m-2`, `gap-2` 등 |
| `spacing-3` | `0.8rem` | `p-3`, `m-3`, `gap-3` 등 |
| `spacing-4` | `1.2rem` | `p-4`, `m-4`, `gap-4` 등 |
| `spacing-5` | `1.6rem` | `p-5`, `m-5`, `gap-5` 등 |
| `spacing-6` | `2rem` | `p-6`, `m-6`, `gap-6` 등 |
| `spacing-7` | `2.4rem` | `p-7`, `m-7`, `gap-7` 등 |
| `spacing-8` | `3.2rem` | `p-8`, `m-8`, `gap-8` 등 |
| `spacing-9` | `4rem` | `p-9`, `m-9`, `gap-9` 등 |
| `spacing-10` | `4.8rem` | `p-10`, `m-10`, `gap-10` 등 |

### Font Size

```html
<p class="text-xxs">...</p>  <!-- 1.2rem / 12px -->
<p class="text-xs">...</p>   <!-- 1.3rem / 13px -->
<p class="text-sm">...</p>   <!-- 1.4rem / 14px -->
<p class="text-md">...</p>   <!-- 1.6rem / 16px -->
<p class="text-lg">...</p>   <!-- 1.8rem / 18px -->
<p class="text-xl">...</p>   <!-- 2rem   / 20px -->
<p class="text-2xl">...</p>  <!-- 2.4rem / 24px -->
<p class="text-3xl">...</p>  <!-- 3rem   / 30px -->
<p class="text-4xl">...</p>  <!-- 3.6rem / 36px -->
```

### CSS 변수 직접 사용

Tailwind 클래스 외에 CSS 변수로도 직접 참조할 수 있습니다.

```css
.custom {
  color: var(--mint-500);
  font-size: var(--text-md);
  padding: var(--spacing-5);
  border-radius: var(--radius-lg);
}
```