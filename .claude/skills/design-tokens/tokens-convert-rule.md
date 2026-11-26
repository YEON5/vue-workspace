# 디자인 토큰 변환 규칙 (tokens-convert-rule)

Figma Variables Export JSON(`*.tokens.json`)을 `@ui/style` 디자인 토큰으로 변환할 때 지키는 규칙입니다.
design-tokens skill과 사람이 `tokens.rules.json`을 작성·수정할 때 모두 이 문서를 따릅니다.

- 변환 코드: `packages/ui-style/scripts/convert-tokens.js`, `generate-tokens.js`
- 프로젝트별 규칙: `packages/ui-style/src/tokens/tokens.rules.json`
- 출력 설정: `packages/ui-style/src/tokens-config.js`
- 상세 사용법: `packages/ui-style/tokens_note.md`

---

## 0. skill 실행 순서

1. `packages/ui-style/src/tokens/figma-export/` 폴더가 있는지, 안에 JSON 파일이 있는지 확인한다.
   - 이 폴더의 JSON은 두 종류다: Figma Export 파일(`*.tokens.json`, 사용자가 넣음)과 Figma URL로 만든 `variables-tokens.json`. 어느 쪽을 읽을지는 `tokens.rules.json` `source.input`이 정한다.
   - JSON 파일이 있으면 그 파일로 진행한다. 사용자가 Figma URL을 함께 주면 URL을 쓸지 먼저 묻는다 (둘 중 하나만 입력으로 쓴다).
   - 단, 새 프로젝트 변환을 요청했는데 파일이 지금 `tokens.rules.json` `sources`의 파일(저장소 기본 PDS_v2 파일)과 같으면 변환하지 않는다. 새 프로젝트 JSON으로 교체하거나 Figma URL을 달라고 요청한다.
2. 폴더가 없거나 JSON 파일이 없으면 둘 중 하나를 요청한다.
   - Figma에서 Variables를 tokens JSON으로 export해서 **사용자가 직접** `figma-export/` 폴더에 넣어 달라고 요청
   - 또는 Figma URL 요청
3. 사용자가 `figma-export/`에 JSON 파일을 넣었다면, 파일을 확인한 뒤 분석한다. (skill이 Export 파일을 만들거나 옮기지 않는다)
   Figma URL을 받았다면 Figma MCP `use_figma`로 Variables를 읽어 `packages/ui-style/src/tokens/figma-export/variables-tokens.json`을 생성한다. `figma-export/` 폴더가 없으면 폴더를 만든 뒤 생성한다. (Figma REST API는 쓰지 않는다)
   - 폴더에 다른 프로젝트의 Export 파일(`*.tokens.json`)이 남아 있으면 변환에는 쓰이지 않지만(`source.input`), 혼동되므로 지워 달라고 보고한다. skill이 지우지 않는다.
   (Figma에서 Variables를 내보내면 컬렉션·모드마다 JSON 파일이 따로 생기지만, URL로 읽으면 파일 하나로 만든다)
4. `variables-tokens.json`은 **Figma Variables 전체(모든 컬렉션·모드)를 하나로 합친 파일**이다.
   - 컬렉션 이름·모드 이름이 파일 안에 들어 있으므로 4-1 컬렉션 판별이 필요 없다.
   - 구조: `{ "컬렉션 이름": { "모드 이름": { Figma Export와 같은 변수 트리 } } }`
   - 변수 하나는 Figma Export와 같은 형식으로 쓴다. 다른 컬렉션 참조는 `com.figma.aliasData`, 같은 컬렉션 참조는 `"{a.b}"` 문자열.
     ```json
     { "mode": { "light": { "color": { "text": { "basic": {
       "$type": "color",
       "$value": { "colorSpace": "srgb", "components": [0.1, 0.1, 0.1], "alpha": 1, "hex": "#1A1A1A" },
       "$extensions": { "com.figma.variableId": "VariableID:1:2", "com.figma.scopes": ["TEXT_FILL"],
         "com.figma.aliasData": { "targetVariableName": "color/gray/90", "targetVariableSetName": "primitive" } }
     } } } } } }
     ```
   - `tokens.rules.json`에 `"source": { "input": "variables-tokens" }`를 넣는다. 이때 `sources`(파일 목록)는 쓰지 않는다. 기본값은 `"figma-export"`.
5. 컬렉션 판별(4-1·4-2) 후, 변환·규칙 작성보다 먼저 **PDS_v2 컬렉션 비교표를 사용자에게 보여준다** (4-3). 이후 단계는 비교 결과를 바탕으로 진행한다.

**Figma URL 사용 시 확인**

- 연결된 Figma 계정에 그 파일의 **편집 권한**이 있어야 Variables를 읽을 수 있다. 없으면 파일을 내 Drafts로 복제(Duplicate to your drafts)한 URL을 요청한다.
- 변수가 다른 파일(라이브러리)에서 온 것이면, 사용하는 파일에서는 가져다 쓴 변수만 보인다. 이때는 **라이브러리 원본 파일 URL**을 요청한다.

---

## 1. 기준은 PDS_v2

**1-1. PDS_v2 결과는 바뀌지 않는다**

- 변환 코드나 규칙을 고칠 때마다 PDS_v2의 `design-tokens.css`와 `tokens.generated.ts`가 그대로인지 확인한다.
- 다른 프로젝트를 위해 추가한 처리는 PDS_v2에 해당되지 않아야 한다. PDS_v2 결과가 바뀌는 변경은 하지 않는다.

**1-2. 다른 프로젝트는 PDS_v2 구조에 맞춰 변환한다**

- `tokens.rules.json` 초안은 PDS_v2 규칙을 틀로 쓴다. 컬렉션 구성, 카테고리, 클래스 이름 규칙, 줄임말, 색상 용도 규칙이 모두 PDS_v2와 같다.
- 새 프로젝트의 변수는 이 틀의 어디에 해당하는지 찾아 넣는다. 다른 프로젝트 구조에 맞춰 PDS_v2 방식을 바꾸지 않는다.

**1-3. 특이 케이스는 기준이 아니다**

- 형식 차이는 변환이 멈추지 않도록 코드가 처리한다 (아래 5장).
- 이름 겹침 같은 특이 케이스(DaisyUI, iOS 키트 등)는 **자동 처리 후 경고로만** 알린다. 특이 케이스 때문에 규칙·옵션을 늘리지 않는다.

---

## 2. 원칙

1. **디자인 토큰에 있는 값만 쓴다.** 값을 추측해서 만들거나 다른 값으로 대체하지 않는다.
   - 예외(디자인 값이 아닌 CSS 기본 동작): spacing `0`, `rounded-full`, `rounded-none`, `transparent`·`current`
2. **토큰에 없으면 쓰지 않는다.** 컴포넌트 역할(ui-vue `color.ts`)에 토큰에 없는 클래스가 있으면 그 역할을 뺀다. 다른 토큰으로 대신 연결하지 않는다.
3. **Tailwind 기본 클래스는 사용할 수 있다.** 화면에서 class에 직접 쓰는 `flex`, `w-full`, `bg-white`, `bg-red-500` 등은 토큰이 아니라 확장으로 허용한다.
4. **이름이 같으면 토큰 값이 이긴다.** 토큰 클래스와 Tailwind 기본 클래스 이름이 같아도 항상 토큰 변수 값이 적용되어야 한다.
5. **조용히 틀리지 않는다.** 규칙에 맞지 않으면 오류로 멈추거나 경고로 알린다.

---

## 3. PDS_v2 표준 구조

### 3-1. 컬렉션 역할

| PDS_v2 컬렉션 | 역할 | 모드 | 표준 카테고리 |
|---|---|---|---|
| color | 원본 팔레트 (primitive가 참조만 함) | value-set | 변환 안 함 (`color/**` ignore) |
| primitive | 팔레트·숫자·글자 기본값 | value-set (경로 안에 light/dark) | `color.*` · `spacing.*` · `vars.letter-spacing-*` |
| mode | 화면 색상 (라이트·다크) | light · dark | `semantic.{그룹}.*` · `vars.border-width-*` · `vars.shadow-*` |
| responsive | 화면 너비별 값 | small · medium · large | `fontSize.*` · `fontWeight.*` · `vars.grid-*` · `vars.padding-card-*` · `vars.gap-layout-*` |
| semantic | 고정 값 | value-set | `radius.*` · `vars.size-*` |

### 3-2. 표준 카테고리 → 클래스

| 카테고리 | 클래스 | 예 |
|---|---|---|
| `color.{그룹}.{단계}` | `bg-` · `text-` · `border-` 접두어 | `bg-primary-50`, `text-gray-90` |
| `semantic.{그룹}.{이름}` | Figma 경로 그대로 | `text-basic`, `surface-elevated-01`, `button-primary-fill` |
| `spacing.{단계}` | 모든 간격 유틸리티 | `p-9`, `gap-9`, `mt-9` (`0`은 자동) |
| `radius.{이름}` | `rounded-` | `rounded-sm` (`rounded-full`은 Tailwind 기본) |
| `fontSize.{그룹}-{크기}` | `text-` | `text-body-md` |
| `fontWeight.{이름}` | `font-` | `font-bold` |
| `vars.{이름}` | 클래스 없음 | `var(--gap-layout-h2-h3)` |

### 3-3. 이름 규칙

- 이름은 소문자로 통일한다 (`button/CTA` → `text-button-cta`).
- 크기 단어는 줄임말로 바꾼다 (font-weight 이름은 제외).

  | Figma | xxxsmall | xxsmall | xsmall | small | medium | large | xlarge | xxlarge | xxxlarge |
  |---|---|---|---|---|---|---|---|---|---|
  | 코드 | `3xs` | `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` |

- 이름 앞에 그룹 이름이 반복되면 뺀다 (`Color/Gray/color-gray-50` → `gray-50`).
  - 코드가 자동으로 빼지 않는다. `mappings` 패턴으로 뺀다: `"from": "Color/{group}/color-*-{step}"`, `"to": "color.{group}.{step}"` (`*`가 반복된 그룹 이름을 건너뜀)
  - 한 패턴 안에 같은 `{이름}`을 두 번 쓰면 오류(SyntaxError)가 나므로 반복 부분은 `*`로 쓴다.

### 3-4. 클래스 표기와 접두어

**기본은 Tailwind 기본 사용법을 따른다.** `{유틸리티}-{토큰 이름}` 순서 (`text-primary-50`, `p-9`, `rounded-sm`).

- **컬렉션 접두어 (예외 케이스)**: semantic 클래스와 겹쳐 컬렉션 이름이 붙은 팔레트 토큰도 Tailwind 기본 형태를 따른다 → `text-daisyui-primary`, `bg-daisyui-primary`. 접두어를 앞에 둔 클래스(`daisyui-text-primary`)를 따로 만들지 않는다.
- **`tokens-config.js` PREFIX (예: `pds`)**: **CSS 변수에만** 붙이고, 이름 맨 앞에 둔다.
  - CSS 변수: `--pds-radius-min`, `--pds-spacing-0`, `--pds-text-body-lg`, `--pds-color-text-basic`
  - 클래스: 붙이지 않는다 → `rounded-min`, `p-0`, `text-body-lg`, `text-basic`

### 3-5. semantic 색상의 CSS 속성

순서대로 적용한다.

1. `utilities.groups` 지정 (PDS_v2: `icon`·`link` → 글자색, `alpha`·`graphic` → 접두어 `bg-`·`text-`·`border-`)
2. Figma 용도(scopes, `tokens.rules.json` `utilities.scopes`): 채우기(FRAME_FILL·SHAPE_FILL·ALL_FILLS) → 배경, 선(STROKE·STROKE_COLOR) → 테두리, 텍스트(TEXT_FILL) → 글자색
   - 용도가 여러 개면 기본 속성 하나 + 나머지는 접두어 (`element-primary` / `border-element-neutral`)
   - 기본 속성 순서: 배경 → 테두리 → 글자색. 단, TEXT_FILL이 있고 FRAME_FILL·ALL_FILLS가 없으면 글자색이 기본
   - 용도가 여러 개이고 SHAPE_FILL이 있으면 글자색 형태(`text-…`)도 함께 만든다 (체크 표시 같은 아이콘이 currentColor로 사용)
   - 위 표에 없는 용도만 있으면 오류 "용도(scopes)를 클래스 속성으로 바꿀 수 없음" → `utilities.scopes` 또는 `groups`에 지정
3. 용도 미지정(scopes가 비어 있거나 ALL_SCOPES)이면 이름으로 추정: 그룹 `text`·`icon`·`link` → 글자색, `border`·`divider` → 테두리, 이름에 `border` 단어가 있으면 테두리
4. 그래도 모르면 배경 기본 + `border-`·`text-` 접두어 형태도 함께 만든다

### 3-6. PDS_v2 제외 대상

| 경로 | 이유 |
|---|---|
| `color/**` | 원본 팔레트. primitive가 참조만 함 |
| `primitive/number/max` | 1000px. 간격 단계가 아님 |
| `primitive/typo/font/type` | 폰트는 style.css에서 웹폰트 이름으로 지정 |
| `semantic/radius/full` | Tailwind `rounded-full` 사용 |
| `semantic/gap/**`, `semantic/padding/**` | 간격은 primitive number 단계로 통일 |

### 3-7. 모드와 typography

- 기본 모드: `value-set`, `light`, `small` (`tokens.rules.json` `defaultModes`. 반응형은 가장 작은 화면 = 모바일 기준)
- 기본이 아닌 모드는 `tokens-config.js` `MODES`에 출력 방법을 지정한다: dark `{ selector: ".dark" }`, medium `{ media: "(min-width: 768px)" }`, large `{ media: "(min-width: 1280px)" }` (min-width 누적 적용)
- 다크 선택자는 `.dark` 고정 (ui-vue `useColorMode`의 `DARK_CLASS`와 같아야 동작)
- typography: font-size 이름 → font-weight 이름 (`tokens.rules.json` `typography`). 행간은 1.5 고정.

---

## 4. 다른 프로젝트 변환 순서

### 4-1. 파일 → 컬렉션 (자동, figma-export JSON일 때만. variables-tokens.json은 건너뜀)

- 같은 컬렉션의 모드 파일들은 **변수 ID(`com.figma.variableId`) 목록이 같다** → 파일을 컬렉션별로 묶는다.
- 컬렉션 이름은 다른 파일의 참조 정보(`aliasData.targetVariableSetName`)에서 찾는다. 대소문자까지 같아야 참조가 연결된다.
- 참조되지 않는 컬렉션은 이름이 결과에 영향이 없으므로 내용에 맞게 정한다.
- 모드 이름은 파일의 `$extensions.com.figma.modeName`을 쓴다.

### 4-2. 컬렉션 → PDS_v2 역할 (자동)

| 새 프로젝트 컬렉션의 내용 | PDS_v2 역할 |
|---|---|
| 단계가 있는 색 팔레트(gray-50, primary-500 …), 숫자 단계, 글자 기본값 | primitive |
| 라이트·다크(·고대비) 모드가 있는 색 | mode → semantic 색상 |
| 화면 너비 모드(mobile·pc 등)가 있는 값 | responsive |
| 모드 하나뿐인 radius·size 등 | semantic |
| 다른 컬렉션이 참조만 하는 원본 팔레트 | color (변환 안 함) |

### 4-3. PDS_v2와 컬렉션 비교를 사용자에게 보여준다 (필수, 변환 전)

4-1·4-2 판별 결과로, **모드 설정·규칙 작성·변환보다 먼저** 기준인 PDS_v2와 비교한 내용을 보여준다. 이후 단계는 이 비교를 바탕으로 진행한다.

**컬렉션 비교표**

| PDS_v2 컬렉션 | 역할 | PDS_v2 모드 | 새 프로젝트 컬렉션 | 새 프로젝트 모드 | 변수 수 | 상태 |
|---|---|---|---|---|---|---|
| color | 원본 팔레트 | value-set | Color | Mode 1 | 40 | 같음 |
| primitive | 팔레트·숫자·글자 기본값 | value-set | primitive | value-set | 267 | 같음 |
| mode | 화면 색상 | light · dark | mode | light · high-contrast | 219 | 다름 (dark 없음, 고대비 있음) |
| responsive | 화면 너비별 값 | small · medium · large | responsive | mobile · pc | 50 | 다름 (모드 이름·개수) |
| semantic | 고정 값 | value-set | semantic | value-set | 49 | 같음 |
| — | — | — | DaisyUI | Mode 1 | 20 | 추가 (PDS_v2에 없음) |

- 상태: **같음** / **다름**(모드·구조 차이를 괄호로) / **없음**(PDS_v2에는 있는데 새 프로젝트에 없음) / **추가**(새 프로젝트에만 있음)
- 위 값은 예시. 실제 분석 결과로 채운다.

**함께 보여줄 내용**

- 컬렉션 안의 그룹 비교 (예: PDS_v2 semantic 색상 그룹 background·surface·text… 중 없는 것, 새로 있는 것)
- 다크·고대비·반응형 모드 유무
- 용도(scopes) 지정 여부 (미지정이면 이름으로 추정한다는 안내)
- 파일 이름만으로 컬렉션을 알 수 없어 자동 판별한 파일

### 4-4. 모드 (자동)

| 항목 | 처리 |
|---|---|
| 라이트·다크·고대비 | 모드 이름으로 자동 판별. 기본은 light. dark·고대비가 있으면 자동 생성 |
| 다크·고대비 선택자 | 다크는 `.dark` 고정 (ui-vue `useColorMode` `DARK_CLASS`), 고대비는 `.high-contrast`. JSON 모드 이름(`Dark`, `dark mode` …)과 무관 |
| 화면에서 기본 색상 모드 | ui-vue `useColorMode`가 담당 (system/light) |
| 반응형 모드 | **없으면 건너뛴다.** 있으면 **mobile 기준 고정**: 가장 작은 화면 모드가 기본값, 큰 화면 모드는 `min-width` 미디어로 덮어씀 (pc 기준·max-width는 지원하지 않음) |
| 화면 너비(px) | Figma에 `grid/screen-size` 같은 변수가 있으면 사용, **없을 때만 한 번 질문** |

**설정하는 파일**

1. `tokens.rules.json` `defaultModes`에 기본 모드 이름 (예: `["value-set", "light", "mobile"]`)
2. `tokens-config.js` `MODES`에 기본이 아닌 모드마다 출력 방법 (키 = JSON 모드 이름)
   ```js
   const MODES = {
     dark: { selector: ".dark" },
     "high-contrast": { selector: ".high-contrast" },
     pc: { media: "(min-width: 1280px)" },
   };
   ```
- `MODES`에 없는 모드는 출력되지 않고 경고("tokens-config.js MODES에 없는 모드")가 나온다. 이 경고가 나오면 `MODES`에 추가한다.

### 4-5. 규칙 작성 (자동)

- PDS_v2 매핑 패턴과 같은 구조로 `mappings`를 만든다.
- 규칙이 없는 새 그룹은 "토큰에 있는 값은 적용한다" 원칙으로 자동 처리한다: 색상 → semantic, 숫자 → `vars`(CSS 변수).
- 형식용 변수(Boolean, String, font-family)는 ignore.
- typography(크기 → 굵기)는 **항상 있어야 한다.** Figma Variables JSON에는 크기+굵기 조합(Text Styles)이 없으므로:
  - 같은 프로젝트 갱신: 기존 typography를 유지한다.
  - 새 프로젝트: Figma URL이면 `use_figma`로 Text Styles(크기+굵기 조합)를 읽어 작성한다. JSON이면 PDS_v2 typography를 기준으로 작성한다 (같은 font-size 이름 → PDS_v2와 같은 굵기).
  - JSON이고 font-size 이름이 PDS_v2와 하나도 겹치지 않으면 7장 질문 2로 묻는다.
  - 토큰에 없는 크기·굵기는 typography에서 빼고 보고한다.

### 4-6. 빌드 → 결과 확인 (자동)

```bash
npm run build          # 또는 npm run tokens -w @ui/style
```

- convert·generate 오류는 이 문서 규칙(6장)으로 고치고 다시 빌드한다.
- 경고는 모아서 마지막에 보고한다.

### 4-7. 컴포넌트 영향 (자동)

```bash
npm run build -w @ui/vue     # 아이콘 생성 + vue-tsc 타입 검사
```

- `color.ts`에 토큰에 없는 클래스가 있으면 **그 역할을 자동으로 뺀다** (원칙 2). 뺀 역할 목록을 보고한다.
- 뺀 역할을 쓰는 컴포넌트·화면(`color="..."`)을 찾아 목록으로 보고한다. 다른 역할로 바꾸지 않는다.
- 타입으로 잡히지 않는 것도 찾는다: `.vue`·`.ts`의 class 문자열과 `style.css`·SCSS의 `var(--…)`를 `tokens.generated.ts` 클래스 목록·`design-tokens.css` 변수와 비교해, 없어진 토큰 클래스·변수를 보고한다.
  - `style.css`는 토큰을 `@apply` 클래스(`text-basic`, `text-body-md` …)로 쓴다. 클래스에는 PREFIX가 붙지 않으므로 PREFIX를 켜도 동작하고, 다른 프로젝트에 그 클래스가 없으면 빌드 오류로 드러난다. `var(--…)`로 토큰을 직접 쓰지 않는다.
  - Tailwind 기본 클래스(`bg-white`, `flex` …)는 보고하지 않는다 (원칙 3).

---

## 5. 코드가 자동 처리하는 것

| 상황 | 처리 |
|---|---|
| 색상 값 객체 (`{ colorSpace, components, alpha, hex }`) | hex로 출력, alpha가 1 미만이면 8자리 hex (`#00000080`). hex가 없으면 sRGB components로 계산, sRGB가 아닌데 hex도 없으면 오류 |
| 같은 컬렉션 안 참조 (`$value: "{color.element.gray-lighter}"`) | 참조로 읽음 |
| 다른 컬렉션 참조 (`aliasData`) | 참조로 읽음 |
| 숫자를 문자열 변수로 만든 값 (`"12"`) | 숫자로 읽음 |
| font-weight 이름 (`SemiBold`) | 숫자로 변환 (600) |
| 대문자 이름 | 소문자로 통일 |
| 반응형 모드 값이 0 (Figma에서 비워 둔 값) | 기본 모드 값 사용 + 경고 (의도된 0은 rules `keepZero`) |
| spacing에 0 단계 없음 | `0` 자동 추가 (safelist 포함, PREFIX가 있으면 `--pds-spacing-0`) |
| font-size 이름이 Tailwind 기본과 같음 (`text-sm`) | Tailwind 기본 줄 높이를 붙이지 않음 |
| semantic 클래스와 팔레트 클래스 이름이 같음 (`text-primary`) | semantic 유지, **겹친 팔레트 토큰에만** 컬렉션 이름을 붙임 (`text-daisyui-primary`) → 8장 보고 2번 |
| semantic 클래스와 Tailwind 기본 색 이름이 같음 (`text-white`) | 그 클래스만 토큰 값을 쓰도록 지정. `bg-white` 등 Tailwind 기본 클래스는 그대로 |
| `UNIT` = rem | 값 ÷10 rem + `html { font-size: 62.5% }` 자동 |
| 반복 그룹 이름 (`Color/Gray/color-gray-50`) | 자동 아님 → 3-3 mappings 패턴으로 처리 |
| 토큰 클래스를 tailwind-merge가 모름 | `tokens.generated.ts`의 배경·테두리·글자색 클래스 목록, 글자 크기(`FONT_SIZE_SCALE`), 굵기(`FONT_WEIGHT_SCALE`), 모서리(`RADIUS_SCALE`)를 ui-vue `cn.ts`가 tailwind-merge 그룹으로 등록. 같은 속성끼리만 뒤의 것이 남음: `cn('bg-white', 'surface-elevated-01')` → `surface-elevated-01`, `cn('text-body-md', 'text-basic')` → 둘 다 유지 (크기·색은 다른 속성) |

---

## 6. 오류로 멈추는 것

| 오류 | 처리 |
|---|---|
| 파일 없음 (`figma-export/…` 또는 `figma-export/variables-tokens.json`) | `sources` 파일 이름 / `source.input` 확인 |
| 색상 값 읽기 실패 (sRGB가 아니고 hex 없음) | Figma에서 색 공간을 sRGB로 바꿔 다시 export |
| 규칙 없음 | 4-5 규칙으로 mappings 또는 ignore 추가 |
| 중복 (같은 이름·모드 / 다른 변수가 같은 기본값 자리) | 규칙을 나누거나 한쪽 ignore |
| 타입 불일치 | 규칙의 type 수정 |
| 기본 모드 값 없음 | 디자인 데이터 문제 → 개별 매핑으로 맞추고 경고 |
| 참조 대상 없음 (convert: 같은 컬렉션 / generate: 참조 대상이 ignore됐거나 순환 참조) | 대상 변수 규칙 확인, ignore에서 빼거나 참조를 끊음 |
| 용도(scopes)를 클래스 속성으로 바꿀 수 없음 | `utilities.scopes` 또는 `groups`에 지정 (3-5) |
| 알 수 없는 카테고리 | mappings `to`를 3-2 표준 카테고리로 |
| 그룹 이름이 Tailwind 기본(shadow, ring …)과 겹침 | 그룹을 접두어(`prefixed`)로 |
| 자동 처리로도 남은 클래스 이름 충돌 | mappings에서 이름 변경 |
| typography에 토큰에 없는 크기·굵기 | 해당 줄 삭제 |

---

## 7. 사용자에게 묻는 것 (최소)

1. 반응형 모드가 있고 화면 너비(px)가 JSON에 없을 때: 기준 너비 (반응형은 mobile 기준 고정이라 기준 방향은 묻지 않는다)
2. JSON 입력이고 font-size 이름이 PDS_v2와 하나도 겹치지 않을 때: typography(크기별 굵기). Figma URL이면 Text Styles를 읽으므로 묻지 않는다.

그 외는 모두 이 문서 규칙으로 자동 처리하고, 결과를 보고한다. 질문은 4-3 비교표를 보여준 뒤에 한다.

---

## 8. 마지막 보고

1. **변환 결과**: 토큰 수, 추가·삭제·변경 수 (PDS_v2 비교표는 4-3에서 먼저 보여줌)
2. **접두어가 붙은 클래스**: semantic 클래스와 겹쳐 컬렉션 이름이 붙은 팔레트 클래스 (화면에서 쓸 클래스 이름이 달라지므로 알림)
3. **빠진 것**: 토큰에 없어서 뺀 항목을 정리해서 보여줌 (뺀 color.ts 역할과 그 역할을 쓰는 곳, typography에서 뺀 줄, 4-7에서 찾은 없어진 클래스·변수)
4. **디자이너 확인 목록 (경고)**
   - 코드가 출력한 경고: 비워 둔 0 값, MODES에 없는 모드, 컬렉션 이름을 붙인 팔레트 (2번과 같음)
   - skill이 JSON을 보고 찾는 것: 이름 오타, 모드별 이름 불일치(예: light `graphic/80` ↔ dark `graphic/70`), 값이 같은 중복 변수
