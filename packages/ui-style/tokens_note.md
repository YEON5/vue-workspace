# @ui/style

피그마 Variables를 Tailwind CSS v4 클래스로 바꾸는 디자인 토큰 패키지입니다.
피그마에서 내보낸 JSON을 표준 디자인 토큰(DTCG 2025.10)으로 합치고, Tailwind `@theme` 변수와 ui-vue용 토큰 타입을 자동으로 만듭니다.

```
figma-export/*.tokens.json
  ─ convert (tokens.rules.json) →  design-tokens.json
  ─ generate                    →  design-tokens.css (Tailwind 클래스) + ui-vue/src/types/tokens.generated.ts (타입·값)
  ─ tailwindcss                 →  dist/style.css
```

**기본 원칙**

- 디자인 토큰에 **있는 값만** 씁니다. 값을 추측해서 만들거나 다른 값으로 대체하지 않습니다.
- 토큰에 없는 이름은 컴포넌트에서 **쓰지 않습니다** (예: 프로젝트에 `text-subtler`가 없으면 color.ts의 `tertiary` 역할을 뺌).
- **토큰에 그 카테고리가 있으면 Tailwind 기본을 끄고 토큰만 씁니다. 토큰에 그 카테고리가 없으면 Tailwind 기본을 씁니다.** 판단 단위는 값이 아니라 카테고리(색상·간격·글자 크기·굵기·모서리·반응형)입니다. PDS_v2는 모두 토큰이 있어 `text-gray-300`, `text-sm`, `rounded-2xl`, `font-semibold`, `md:`가 없습니다. 아래 "Tailwind 기본 카테고리" 참고.
- 토큰 카테고리가 아닌 레이아웃·위치·표시(`flex`, `w-full`, `max-w-md` …)는 Tailwind 기본을 씁니다. 토큰 이름과 같은 Tailwind 기본 이름은 토큰 값이 우선합니다.
- 조용히 틀리는 일이 없도록, 규칙에 맞지 않으면 **오류로 멈추고 무엇을 고칠지 출력**합니다.

---

## 폴더 구조

```
packages/ui-style/
├── src/
│   ├── tokens/
│   │   ├── figma-export/        # 피그마 Variables Export 원본 JSON (컬렉션·모드별 파일 그대로, 수정 금지)
│   │   ├── tokens.rules.json    # ✏️ 프로젝트별 변환 규칙 (파일 구성, 이름 매핑, 제외, 색상 용도 예외, typo 굵기)
│   │   └── design-tokens.json   # 표준 디자인 토큰 (자동 생성, 수정 금지)
│   ├── tokens-config.js         # ✏️ PREFIX(접두사) / UNIT(px·rem) / MODES(다크·반응형) / 타입 생성 위치
│   ├── design-tokens.css        # @theme 토큰 변수·색상 클래스 (자동 생성, 수정 금지)
│   └── style.css                # Tailwind v4 진입점 (@import, @source 스캔 경로, 기본 스타일)
├── dist/style.css               # 빌드 결과물 (ui-vue·ui-docs에서 import)
├── scripts/
│   ├── convert-tokens.js        # figma-export → design-tokens.json (규칙 적용·검증·변경 요약)
│   ├── generate-tokens.js       # design-tokens.json → design-tokens.css + tokens.generated.ts
│   └── watch-tokens.js          # dev 중 figma-export·규칙·설정 변경 감시 → 자동 재생성
└── package.json                 # tailwindcss v4 + @tailwindcss/cli (tailwind.config.js, postcss.config.js 없음)
```

✏️ 표시 파일만 직접 수정합니다. 나머지는 모두 자동 생성됩니다.

---

## 명령어

> 루트(`vue-workspace/`)에서 실행합니다.

| 명령 | 동작 |
|---|---|
| `npm run dev` | 토큰 감시 + Tailwind watch + ui-vue(5810) + ui-docs(5820) 동시 실행 |
| `npm run build` | 토큰 변환 → 생성 → `dist/style.css` (minify) |
| `npm run tokens -w @ui/style` | 변환 + 생성만 (convert → generate) |
| `npm run tokens:convert -w @ui/style` | figma-export → design-tokens.json 만 |
| `npm run generate:tokens -w @ui/style` | design-tokens.json → css · ts 만 |

dev 중에는 `figma-export/`, `tokens.rules.json`, `tokens-config.js`를 저장하면 자동으로 다시 생성됩니다. 오류가 나도 감시는 계속되고, 고쳐서 저장하면 다시 생성됩니다.

---

## Claude Code skill로 변환하기 (design-tokens)

규칙 작성·빌드·오류 수정·보고를 skill이 대신 진행합니다 (`.claude/skills/design-tokens/`). Claude Code 새 세션에서 아래 중 하나로 실행합니다.

| 방법 | 입력 |
|---|---|
| 슬래시 명령 | `/design-tokens` |
| 새 프로젝트 | `새 프로젝트 디자인 토큰 변환해줘` |
| Figma URL | `이 피그마 변수로 디자인 토큰 적용해줘 https://www.figma.com/design/...` |
| 같은 프로젝트 갱신 | `피그마 토큰 바뀐 거 갱신해줘` (figma-export 파일을 새 Export로 덮어쓴 뒤) |

- 새 프로젝트는 `figma-export/`의 PDS_v2 파일을 새 Export 파일로 바꾼 뒤 실행합니다 (PDS_v2 파일이 그대로면 skill이 멈추고 교체를 요청).
- Figma URL은 Claude Code에 Figma MCP가 연결되어 있고 그 파일의 편집 권한이 있어야 합니다. skill이 `figma-export/variables-tokens.json`을 만듭니다.
- 진행 순서: 입력 확인 → PDS_v2 컬렉션 비교표 → 최소 질문 → 규칙·모드 작성 → 빌드 → 컴포넌트 영향 확인(vue-tsc·ESLint) → 보고.

## 피그마 토큰을 바꿨을 때

1. 피그마 **Variables > Export**로 컬렉션·모드별 JSON을 받아 `src/tokens/figma-export/`의 파일을 교체합니다. (파일 이름 유지)
2. 출력되는 오류·경고를 보고 `tokens.rules.json`을 고칩니다.
3. `npm run build` (dev 중이면 자동)

### convert 오류·경고

| 메시지 | 의미 | 할 일 |
|---|---|---|
| `규칙 없음: …` | mappings에 맞는 규칙이 없는 새 변수 | `mappings`에 추가하거나 `ignore`에 추가 |
| `중복: …` | 서로 다른 Figma 변수가 같은 토큰 이름이 됨 | 규칙을 나누거나 한쪽을 ignore |
| `타입 불일치: …` | 규칙의 type과 Figma 값이 다름 | 규칙의 type 수정 |
| `기본 모드 값 없음: …` | 기본 모드(light 등) 값이 없음 (예: light에만 없는 팔레트) | Figma 확인 또는 개별 매핑 |
| `참조 대상 없음: …` | 같은 컬렉션 안 참조(`{…}`) 대상이 없거나 제외됨 | 대상 변수 규칙 확인 |
| `⚠ … (pc) = 0 → 기본 모드 값 사용` | 반응형 모드 값이 0 (Figma에서 비워 둔 값으로 판단) | 0이 맞으면 `keepZero`에 추가 |

### generate 오류·경고

| 메시지 | 할 일 |
|---|---|
| `⚠ tokens-config.js MODES에 없는 모드: …` | 그 모드를 `MODES`에 selector 또는 media로 추가 (안 하면 그 모드 값이 출력되지 않음) |
| `그룹 이름 "…"이 Tailwind 기본 클래스와 겹칩니다` | 규칙에서 그룹 이름을 바꾸거나 `utilities.groups`에 `"prefixed"` 지정 |
| `⚠ … 팔레트에 컬렉션 이름을 붙였습니다: daisyui-primary` | semantic 클래스와 팔레트 클래스 이름이 같아서 그 팔레트 토큰에 컬렉션 이름을 붙임 (`text-primary` = semantic, `text-daisyui-primary` = 팔레트). 확인만 |
| `semantic 클래스와 색상 클래스 이름이 겹칩니다: …` | 자동 처리로도 남은 충돌 (alpha·graphic 같은 접두어 그룹) → mappings에서 이름 변경 |
| `tokens.rules.json typography 확인 — …` | typography에 토큰에 없는 크기·굵기가 있음 → 해당 줄 수정·삭제 |

---

## tokens.rules.json (프로젝트별 규칙)

| 항목 | 내용 |
|---|---|
| `defaultModes` | 기본값으로 쓸 모드 (예: `value-set`, `light`, `small`). 나머지 모드는 `$extensions.modes`에 저장 |
| `sources` | 컬렉션 → 모드 → 파일 이름. **컬렉션 이름은 Figma 이름과 대소문자까지 같아야** 참조가 연결됨 |
| `mappings` | Figma 경로 → 표준 경로. 위에서부터 먼저 맞는 규칙 적용 (개별 규칙을 일반 규칙 위에 두면 이름을 따로 지정 가능) |
| `abbreviations` | 크기 단어 줄임말 (`xsmall` → `xs` …). 규칙에 `"abbreviate": false`면 적용 안 함 |
| `utilities` | 색상 클래스의 CSS 속성 규칙 (`scopes`: Figma 용도 → 속성, `groups`: 그룹별 예외) |
| `typography` | Typo variant: font-size 이름 → font-weight 이름 |
| `keepZero` | 반응형 모드에서 0이 의도된 값인 변수 패턴 |
| `ignore` | 변환하지 않을 Figma 경로 패턴 |

**패턴 문법**: `{이름}` = 한 단계 캡처, `{mode}` = 경로 안의 모드(예: `color/light/…`), `*` = 한 단계, `**` = 여러 단계. 앞뒤에 글자를 붙일 수 있습니다 (`Color/*/color-{key}` → `color-gray-50`에서 `gray-50`만 사용).

**자동 처리 (규칙 불필요)**

- 이름은 소문자로 통일 (`button/CTA` → `text-button-cta`)
- 같은 컬렉션 안 참조(`"{color.element.gray-lighter}"`)와 다른 컬렉션 참조(aliasData) 모두 읽음
- 숫자를 문자열 변수로 만든 값(`"12"`)은 숫자로 읽음
- font-weight 이름(`SemiBold` 등)은 숫자로 변환

---

## tokens-config.js

| 설정 | 내용 |
|---|---|
| `PREFIX` | **CSS 변수 이름에만** 붙는 접두사 (맨 앞). `"pds"` → `--pds-radius-min`, `--pds-spacing-9`, `--pds-text-body-lg`, `--pds-color-text-basic`. 클래스에는 붙지 않음 (`rounded-min`, `p-9`, `text-basic` 그대로) |
| `UNIT` | `"px"` 또는 `"rem"` — **이 값만 바꾸면 됩니다** |
| `MODES` | 기본 모드가 아닌 모드를 어떻게 적용할지. `selector`(다크모드 등 클래스) / `media`(화면 너비) |
| `TYPES_OUTPUT` | tokens.generated.ts 생성 위치 |

**UNIT**

| UNIT | 토큰 값 | html font-size |
|---|---|---|
| `"px"` (현재) | `16px` | 출력 안 함 (브라우저 기본 16px) |
| `"rem"` | `1rem` (16px ÷ 16) | 출력 안 함 (브라우저·Tailwind 기본 1rem = 16px) |

어느 쪽이든 html font-size를 바꾸지 않으므로 Tailwind 기본 클래스와 외부 라이브러리(달력·에디터 등) 크기가 틀어지지 않습니다.

**MODES (PDS_v2)**

```js
const MODES = {
  dark:   { selector: ".dark" },               // <html class="dark"> → 다크 값
  medium: { media: "(min-width: 768px)" },     // 화면 너비 768px 이상
  large:  { media: "(min-width: 1280px)" },    // 화면 너비 1280px 이상
};
```

화면 너비 모드는 누적 적용됩니다 (1280px 이상이면 768px 조건도 적용).

---

## 클래스 규칙

> 클래스에는 PREFIX가 붙지 않습니다. CSS 변수 예시는 PREFIX = `""` 기준. 실제 목록과 값은 ui-vue `src/types/tokens.generated.ts`에서 확인합니다.

### Color

1. **클래스 이름 = Figma 변수 경로** (`color/` 제외, `/` → `-`)
   `color/surface/elevated-01` → `surface-elevated-01`, `color/text/basic` → `text-basic`
2. **CSS 속성 결정 순서**
   1. `tokens.rules.json` `utilities.groups` 지정 (PDS_v2: `icon`·`link` → 글자색, `alpha`·`graphic` → 접두어)
   2. Figma 용도(scopes): 채우기 → 배경, 선 → 테두리, 텍스트 → 글자색
      - 용도가 여러 개면 배경이 기본이고 나머지는 접두어 (`element-primary` / `border-element-neutral` / `text-element-white-static`)
      - 텍스트 용도가 있고 면 채우기가 없으면 글자색이 기본 (글자·아이콘용)
   3. 용도 미지정(ALL_SCOPES)이면 이름으로 추정: 그룹 `text`·`icon`·`link` → 글자색, `border`·`divider` → 테두리, 이름에 `border`가 있으면 테두리 (`button-secondary-border`)
   4. 그래도 모르면 배경 기본 + `border-`·`text-` 접두어 형태도 함께 생성
3. **primitive 팔레트**는 접두어 형태: `bg-primary-50`, `text-gray-90` (시맨틱 변수가 없을 때만 사용). 다크모드에서 바뀌지 않습니다.
   - 토큰에 색상이 있으므로 **Tailwind 기본 팔레트(`gray-300`, `red-500`, `slate-400` …)는 꺼져 있습니다.** `gray-30`(PDS)과 `gray-300`(Tailwind)은 다른 색이니 주의합니다.
   - `white`·`black`(`bg-white`, `text-black`)과 `transparent`·`current`는 항상 쓸 수 있습니다.
   - 색상 임의 값(`bg-[#fff]`)은 쓰지 않습니다 (ESLint 오류).
4. **이름이 겹쳐도 항상 토큰 값**: semantic(Figma 경로) 이름은 그대로 두고
   - 팔레트 토큰과 겹치면 그 팔레트 토큰에 컬렉션 이름을 붙임 (`text-daisyui-primary`)
   - Tailwind 기본 색과 겹치면(`text-white`) 그 클래스만 토큰 값을 쓰도록 지정 (`.text-white { color: var(--color-text-white) }`). `bg-white` 등 Tailwind 기본 클래스는 그대로 사용 가능
5. **CSS 변수**: `--color-{그룹}-{이름}` (예: `var(--color-text-basic)`)
6. **다크모드**: `<html>`에 `dark` 클래스 → 색상 변수만 바뀌고 클래스 이름은 그대로 (ui-vue `useColorMode`)

**그룹별 용도 (PDS_v2)**

| 그룹 | 용도 |
|---|---|
| background | 페이지 바탕, 전체 화면 딤 |
| surface | 카드·모달·팝오버(elevated-01~03), 상태 배경(*-subtler), 컴포넌트 딤 |
| action | 버튼 외 인터랙티브 요소의 hover·pressed·selected·active 배경 |
| element | 뱃지·칩·태그·스위치·체크박스/라디오 채움, 라디오 테두리, 체크 표시 |
| text | 텍스트 |
| icon | 아이콘 |
| border | 카드·박스·태그·칩·체크박스 테두리 |
| divider | 구분선 |
| button | 버튼 전용 fill·border |
| input | 입력 폼 전용 surface·border |
| link | 텍스트 링크 |
| alpha | 투명도 스케일, 그림자 색 |
| graphic | 차트·일러스트 등 비시맨틱 색 |

### Spacing

`p-*`, `m-*`, `gap-*`, `size-*`, `inset-*` 등 모든 간격 유틸리티가 같은 단계(primitive number)를 씁니다. 토큰에 없는 단계는 클래스가 생기지 않습니다. `0` 단계는 토큰에 없어도 자동으로 추가됩니다 (`p-0`, `mt-0` …).

| 클래스 | 값 | 클래스 | 값 | 클래스 | 값 |
|---|---|---|---|---|---|
| `p-0` | 0px | `p-8` | 14px | `p-16` | 44px |
| `p-1` | 1px | `p-9` | 16px | `p-17` | 48px |
| `p-2` | 2px | `p-10` | 20px | `p-18` | 56px |
| `p-3` | 4px | `p-11` | 24px | `p-19` | 64px |
| `p-4` | 6px | `p-12` | 28px | `p-20` | 72px |
| `p-5` | 8px | `p-13` | 32px | `p-21` | 80px |
| `p-6` | 10px | `p-14` | 36px | `p-22` | 96px |
| `p-7` | 12px | `p-15` | 40px | | |

단계 번호의 px 값은 프로젝트마다 다릅니다.

### Radius

`rounded-min`(4px), `rounded-xs`(6px), `rounded-sm`(8px), `rounded-md`(10px), `rounded-lg`(12px), `rounded-xl`(14px), `rounded-max`(16px)
`rounded-full`·`rounded-none`은 Tailwind 기본 클래스를 씁니다 (Figma `radius/full`은 제외). Tailwind 기본 `rounded`, `rounded-2xl` 등은 꺼져 있습니다.

### Font size · Font weight · Typo

- 글자 크기 `text-{이름}`, 굵기 `font-{이름}` (예: `text-display-lg font-bold`). 화면 너비별 값은 자동 적용.
- Tailwind 기본 글자 크기(`text-sm`, `text-base` …)와 굵기(`font-semibold` …)는 꺼져 있습니다. 토큰 이름이 Tailwind와 같으면 토큰 값입니다 (`font-bold` = 600).
- 행간은 기본 1.5 고정 (`leading-normal`). Tailwind `leading-*`도 필요하면 쓸 수 있습니다. 컴포넌트에서는 Typo `variant`를 씁니다 (ui-vue `component_note.md`).

### 반응형

Tailwind 기본 `sm:` `md:` `lg:` `xl:` `2xl:`은 꺼져 있고, 화면 너비 모드 이름을 씁니다 (`tokens-config.js` `MODES`).

| 접두어 | 너비 |
|---|---|
| `medium:` | ≥768px |
| `large:` | ≥1280px |

예: `flex-col medium:flex-row`. 토큰 값(글자 크기·간격 등)도 같은 너비에서 바뀝니다. 토큰에 반응형 모드가 없는 프로젝트는 Tailwind 기본 `sm:`~`2xl:`을 그대로 씁니다.

### Tailwind 기본 카테고리

토큰에 그 카테고리가 있으면 Tailwind 기본을 끄고, 없으면 그대로 둡니다 (`generate-tokens.js`가 자동 처리). PDS_v2 기준:

| 카테고리 | PDS_v2 토큰 | 꺼진 Tailwind 기본 | 대신 쓰는 것 |
|---|---|---|---|
| 색상 | 있음 | 팔레트 `gray-300` `red-500` … | semantic(`text-basic` …), 팔레트(`gray-30` …) |
| 간격 | 있음 | 숫자 `p-14`(3.5rem 계산) … | 단계 `p-9` … |
| 글자 크기 | 있음 | `text-sm` `text-base` … | `text-body-md` … |
| 굵기 | 있음 | `font-semibold` … | `font-regular` `font-medium` `font-bold` |
| 모서리 | 있음 | `rounded` `rounded-2xl` … | `rounded-min` … `rounded-max` |
| 반응형 | 있음 | `sm:` `md:` `lg:` `xl:` `2xl:` | `medium:` `large:` |

| 항상 쓸 수 있음 | Tailwind 기본 (토큰 카테고리 아님) |
|---|---|
| `p-0` 등 `0`, `rounded-none`, `rounded-full`, `transparent`, `current`, `white`, `black` | 레이아웃·위치(`flex`, `grid`, `w-full`, `w-1/2`, `w-screen`, `h-auto`, `w-px`), 이름 너비(`max-w-md`, `w-xl`), 행간 `leading-*`, 자간 `tracking-*`, 그림자 `shadow-*`, 상태 접두어(`hover:`) |

- 그림자·자간 토큰은 CSS 변수(`--shadow-y-3`, `--letter-spacing-1`)로만 나오고 클래스 카테고리가 아니라서 Tailwind 기본을 끄지 않습니다.
- 임의 값: 크기는 허용(`w-[240px]`, 토큰에 같은 값이 있으면 토큰 클래스: `p-[16px]` 대신 `p-9`), 색상은 금지(`bg-[#fff]`).

꺼진 클래스를 쓰면 Tailwind는 경고 없이 무시하므로 ESLint로 검사합니다 (루트 `eslint.config.mjs`): 꺼진 클래스는 `better-tailwindcss/no-unknown-classes`, 색상 임의 값은 `better-tailwindcss/no-restricted-classes` 오류.

```bash
npx eslint "packages/*/src/**/*.{vue,ts}"
```

`p-4`처럼 존재하지만 기대와 값이 다른 클래스는 ESLint가 잡지 못합니다. 간격은 단계 번호이므로(`p-9` = 16px, `p-4` = 6px) 위 Spacing 표나 `tokens.generated.ts`로 확인합니다. AI·개발자 공통 사용 규칙은 `.claude/skills/design-tokens/token-usage.md`에 있습니다 (Claude Code·Antigravity가 자동으로 읽음).

### 크기 줄임말

| Figma | xxxsmall | xxsmall | xsmall | small | medium | large | xlarge | xxlarge | xxxlarge |
|---|---|---|---|---|---|---|---|---|---|
| 코드 | `3xs` | `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` |

font-weight 이름은 줄이지 않습니다.

### CSS 변수 직접 사용

클래스가 없는 토큰(gap-layout, padding-card, size, border-width, shadow, letter-spacing 등)은 CSS 변수로 씁니다.

```css
.custom {
  padding: var(--padding-card-md);
  gap: var(--gap-layout-h2-h3);
  color: var(--color-text-basic);
}
```

---

## tokens.generated.ts (ui-vue)

토큰 목록과 값입니다. ui-vue 타입(spacing·radius·fontSize·typo·color)이 여기서 만들어지므로, 토큰이 바뀌면 타입도 바뀌고 없는 이름을 쓰면 vue-tsc 오류가 납니다. 매번 통째로 덮어쓰므로 직접 수정하지 않습니다.

```ts
export const SPACING_SCALE = { '0': '0px', ..., '9': '16px', ... } as const;
export const RADIUS_SCALE  = { 'min': '4px', ... } as const;

// weight = typo 굵기 (tokens.rules.json typography, 없으면 typo variant 아님)
export const FONT_SIZE_SCALE = {
  'display-lg':          { size: '44px', weight: 'bold' },
  'navigation-title-md': { size: '22px' },
  ...
} as const;

export const FONT_WEIGHT_SCALE = { 'regular': 400, 'medium': 500, 'bold': 600 } as const;

// 화면 너비별로 바뀌는 값 (그 너비에서 실제로 보이는 값 중 기본값과 다른 것, 없으면 생성 안 됨)
export const RESPONSIVE = {
  '≥1280px': { fontSize: { 'display-lg': '60px', ... }, fontWeight: { 'bold': 700, ... } },
} as const;

export const BACKGROUND_COLOR_CLASSES / BORDER_COLOR_CLASSES / TEXT_COLOR_CLASSES = [...];
```

---

## 다른 프로젝트에 적용할 때

1. 새 프로젝트의 Figma Export JSON을 `figma-export/`에 넣습니다 (또는 design-tokens skill에 Figma URL을 주면 `figma-export/variables-tokens.json`을 만듭니다).
2. `tokens.rules.json`을 새로 맞춥니다: `sources`(컬렉션 이름·모드·파일), `defaultModes`, `mappings`, `ignore`, `typography`. convert 오류 목록을 따라가면 됩니다.
3. `tokens-config.js` `MODES`에 새 모드를 추가합니다 (경고로 알려줌).
4. `npm run tokens` 후 ui-vue `vue-tsc`와 `npx eslint "packages/*/src/**/*.{vue,ts}"`를 실행해 오류를 확인합니다.
   - color.ts: 토큰에 없는 클래스 → 해당 역할 삭제
   - typography: 토큰에 없는 크기·굵기 → generate 오류로 알려줌
5. 디자인 데이터 문제(이름 오타, 모드별 이름 불일치, 비워 둔 0 값)는 디자이너에게 확인합니다.

**주의**: 컴포넌트 안에 클래스를 직접 쓴 곳(예: `'surface-elevated-01'`)은 타입 검사가 되지 않습니다. class 속성·`cn()` 안의 클래스는 ESLint가 잡고, 스크립트 변수에 넣은 문자열은 잡지 못하므로 ui-docs에서 확인합니다.
