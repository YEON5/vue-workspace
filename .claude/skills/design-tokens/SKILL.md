---
name: design-tokens
description: 피그마 Variables(tokens JSON 파일 또는 Figma URL)를 @ui/style 디자인 토큰과 Tailwind 클래스로 변환·갱신해 달라는 요청을 받았을 때 사용한다. (예: 디자인 토큰 변환, 피그마 변수 적용, 새 프로젝트 토큰 적용)
---

# 디자인 토큰 변환 (Figma Variables → @ui/style)

## 실행 전 필수

1. **같은 폴더의 `tokens-convert-rule.md`를 먼저 읽는다.**
2. 이후 모든 단계는 `tokens-convert-rule.md`의 규칙을 따른다. 이 SKILL.md는 실행 흐름만 담고 있으며, 내용이 다르면 **`tokens-convert-rule.md`가 우선**한다.
3. 기준은 **PDS_v2**다. PDS_v2 결과(`design-tokens.css`, `tokens.generated.ts`)를 바꾸는 변경은 하지 않는다.

아래 `(규칙 n장)`은 `tokens-convert-rule.md`의 장 번호다.

## 실행 순서

### 1. 입력 확인 (규칙 0장)

1. `packages/ui-style/src/tokens/figma-export/` 폴더와 그 안의 JSON 파일이 있는지 확인한다. 있으면 그 파일로 진행한다 (Figma URL도 받았다면 어느 쪽을 쓸지 묻는다).
   - 새 프로젝트 변환 요청인데 파일이 `tokens.rules.json` `sources`의 기존 PDS_v2 파일과 같으면 변환하지 않고 교체 파일이나 Figma URL을 요청한다.
2. 없으면 둘 중 하나를 요청하고 기다린다.
   - Figma에서 Variables를 tokens JSON으로 export해서 **사용자가 직접** `figma-export/`에 넣어 달라고 요청
   - 또는 Figma URL 요청
3. 사용자가 JSON 파일을 넣었다면 파일을 확인한 뒤 분석한다. Export 파일(`*.tokens.json`)을 만들거나 옮기지 않는다.
4. Figma URL을 받았다면:
   - Figma 도구(`use_figma`) 사용 전 figma-use 스킬을 먼저 읽고, `create_session`으로 시작한다.
   - Variables 전체(모든 컬렉션·모드)를 읽어 `packages/ui-style/src/tokens/figma-export/variables-tokens.json` 하나로 만든다. 폴더가 없으면 만든 뒤 생성한다. (형식: 규칙 0장)
   - 폴더에 다른 프로젝트 Export 파일이 남아 있으면 지워 달라고 보고한다 (skill이 지우지 않음).
   - `tokens.rules.json`에 `"source": { "input": "variables-tokens" }`를 넣는다.
   - typography용 Text Styles(크기+굵기)도 함께 읽어 둔다 (규칙 4-5).
   - 편집 권한이 없거나 라이브러리 변수만 보이면 규칙 0장의 안내대로 다른 URL을 요청한다.

### 2. 컬렉션 판별 → PDS_v2 비교표 — 변환 전에 보여준다 (규칙 4-1 ~ 4-3)

- figma-export JSON이면 파일을 컬렉션별로 묶는다 (규칙 4-1). `variables-tokens.json`이면 건너뛴다.
- 각 컬렉션의 PDS_v2 역할을 정한다 (규칙 4-2).
- 그 결과를 **모드 설정·규칙 작성·변환보다 먼저** 비교표로 보여준다 (규칙 4-3).

### 3. 질문 (규칙 7장)

- 묻는 것은 규칙 7장 항목뿐이다 (반응형 화면 너비가 JSON에 없을 때, JSON 입력인데 typography 기준이 없을 때). 반응형은 mobile 기준 고정이므로 기준 방향은 묻지 않는다.
- 질문은 비교표를 보여준 뒤, 한 번에 모아서 한다.

### 4. 모드와 규칙 작성 (규칙 3장, 4-4 ~ 4-5)

- 모드: `tokens.rules.json` `defaultModes`와 `tokens-config.js` `MODES`를 규칙 4-4대로 설정한다 (다크 `.dark` 고정, 반응형 min-width).
- PDS_v2 `tokens.rules.json` 구조를 틀로 쓴다. 새 프로젝트 변수를 PDS_v2 구조의 어디에 해당하는지 찾아 넣는다.
- typography는 규칙 4-5를 따른다 (항상 있어야 함).
- 특이 케이스 때문에 규칙·옵션을 새로 만들지 않는다 (규칙 1-3).

### 5. 빌드와 오류 처리 (규칙 5장, 6장)

```bash
npm run tokens -w @ui/style      # 변환 + 생성
npm run build                    # 최종 빌드 (dist/style.css)
```

- 오류로 멈추면 규칙 6장대로 고치고 다시 실행한다.
- "MODES에 없는 모드" 경고는 `MODES`에 추가해서 고친다. 그 외 경고는 고치지 않고 모아 두었다가 마지막 보고에 넣는다.

### 6. 컴포넌트 영향 확인 (규칙 4-7)

```bash
npm run build -w @ui/vue     # 아이콘 생성 + vue-tsc 타입 검사
```

- `types/color.ts`에 토큰에 없는 클래스가 있으면 그 역할을 `ColorToken`과 맵에서 뺀다 (규칙 2장 원칙 2). 다른 토큰으로 대신 연결하지 않는다.
- 뺀 역할을 쓰는 곳을 찾아 보고한다 (바꾸지 않음).
- class 문자열·`style.css`의 `@apply` 클래스·SCSS의 `var(--…)`를 생성 결과와 비교해 없어진 토큰 클래스·변수를 보고한다.
- 원래 있던 오류와 새로 생긴 오류를 구분해서 처리한다.

### 7. PDS_v2 회귀 확인 (규칙 1-1)

- `convert-tokens.js`, `generate-tokens.js`를 수정했다면, PDS_v2 토큰으로 생성한 `design-tokens.css`와 `tokens.generated.ts`가 수정 전과 같은지 확인한다.
- 달라졌다면 그 수정은 되돌린다.

### 8. 마지막 보고 (규칙 8장)

규칙 8장 형식으로 보고한다.

1. 변환 결과
2. 접두어가 붙은 클래스
3. 빠진 것 (토큰에 없어서 뺀 항목)
4. 디자이너 확인 목록 (경고)

## 하지 않는 것

- 디자인 토큰에 없는 값을 추측해서 만들거나 다른 값으로 대체하지 않는다.
- `figma-export/`의 Export 파일(`*.tokens.json`)을 만들거나 옮기거나 고치거나 지우지 않는다. (skill이 만드는 것은 `variables-tokens.json`뿐)
- PDS_v2 결과를 바꾸는 코드·규칙 변경을 하지 않는다.
- 비교표를 보여주기 전에 변환이나 규칙 작성을 시작하지 않는다.
- 규칙 7장에 없는 질문을 하지 않는다. (반응형 mobile/pc 기준은 묻지 않는다 — mobile 고정)
- 클래스에 PREFIX를 붙이지 않는다. PREFIX는 CSS 변수에만 붙는다.
- `style.css`에 토큰을 `var(--…)`로 직접 쓰지 않는다. `@apply` 클래스로 쓴다.

## 관련 파일

| 파일 | 내용 |
|---|---|
| `tokens-convert-rule.md` (이 폴더) | 변환 규칙 — **항상 먼저 읽음** |
| `packages/ui-style/src/tokens/figma-export/*.tokens.json` | Figma Export JSON (사용자가 넣음) |
| `packages/ui-style/src/tokens/figma-export/variables-tokens.json` | Figma URL로 만든 Variables 파일 |
| `packages/ui-style/src/tokens/tokens.rules.json` | 프로젝트별 변환 규칙 |
| `packages/ui-style/src/tokens-config.js` | PREFIX · UNIT · MODES |
| `packages/ui-style/scripts/convert-tokens.js`, `generate-tokens.js` | 변환 · 생성 코드 |
| `packages/ui-vue/src/types/tokens.generated.ts` | 생성 결과 (토큰 목록·값) |
| `packages/ui-vue/src/types/color.ts` | 컴포넌트 색상 역할 |
| `packages/ui-style/tokens_note.md` | 사용 설명서 |
