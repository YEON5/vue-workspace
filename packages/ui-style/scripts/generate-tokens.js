// 표준 design-tokens.json (DTCG 2025.10) → Tailwind v4 design-tokens.css + ui-vue 토큰 타입(tokens.generated.ts)
// Run: npm run generate:tokens  (변환까지 한 번에: npm run tokens)
const fs = require("fs");
const path = require("path");
const { PREFIX_DASH: P, UNIT, MODES, TYPES_OUTPUT } = require("../src/tokens-config");

const INPUT = path.resolve(__dirname, "../src/tokens/design-tokens.json");
const OUTPUT_CSS = path.resolve(__dirname, "../src/design-tokens.css");
const OUTPUT_TS = path.resolve(__dirname, "..", TYPES_OUTPUT);

const tokens = JSON.parse(fs.readFileSync(INPUT, "utf-8"));
const RULES = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../src/tokens/tokens.rules.json"), "utf-8"));

// ─────────────────────────────────────────────────────────────────────
// 표준 카테고리 → CSS 변수 이름
// Tailwind v4는 @theme 변수 이름(네임스페이스)이 곧 유틸리티 클래스입니다.
//   --color-*            → bg-*, text-*, border-* 모두   (primitive color, alpha·graphic 같은 접두어 그룹)
//   --spacing-*          → p-*, m-*, gap-* ...           (spacing)
//   --radius-*           → rounded-*                     (radius)
//   --text-*             → text-* (font-size)            (fontSize)
//   --font-weight-*      → font-*                        (fontWeight)
//   vars.*               → :root 일반 CSS 변수 (유틸리티 없음, var()로 사용)
//
// semantic 색상 (Figma mode 컬렉션 color/{그룹}/{이름})
//   클래스 = Figma 경로 그대로: color/surface/elevated-01 → surface-elevated-01, color/text/basic → text-basic
//   CSS 속성 = 변수의 Figma 용도(scopes): 채우기→배경, 선→테두리, 텍스트→글자색 (tokens.rules.json utilities)
//   용도가 여러 개면 배경이 기본, 다른 속성은 접두어: element-primary / border-element-neutral / text-element-white-static
//   CSS 변수 = --color-{그룹}-{이름} (:root, 다크모드는 .dark에서 덮어씀)
// ─────────────────────────────────────────────────────────────────────
const THEME = {
  color: (k) => `--color-${P}${k}`,
  spacing: (k) => `--spacing-${P}${k}`,
  radius: (k) => `--radius-${P}${k}`,
  fontSize: (k) => `--text-${P}${k}`,
  fontWeight: (k) => `--font-weight-${P}${k}`,
};
const VARS = (k) => `--${P}${k}`;

// 동적 클래스(useSpacing 등) safelist용 유틸리티 접두사 ✏️ ui-vue types/spacing.ts의 SPACING_PREFIXES와 동일하게 유지
const SPACING_PREFIXES = ["p", "pt", "pb", "pl", "pr", "px", "py", "m", "mt", "mb", "ml", "mr", "mx", "my", "gap"];

// ── 토큰 수집: [{ path: "color.gray.90", category: "color", key: "gray-90", token }] ──
const list = [];
(function walk(node, parts) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    if (v.$type) {
      const all = [...parts, k];
      const category = all[0] === "vars" ? "vars" : all[0];
      const group = all[0] === "semantic" ? all[1] : null;
      const keyParts = all[0] === "semantic" ? all.slice(2) : all.slice(1);
      list.push({ path: all.join("."), category, group, key: keyParts.join("-"), token: v });
    } else walk(v, [...parts, k]);
  }
})(tokens, []);
const byPath = new Map(list.map((t) => [t.path, t]));

// ── 값 → CSS ──
function toHex(c) {
  const hex = (c.hex ?? "#000000").toLowerCase();
  const a = c.alpha ?? 1;
  return a >= 1 ? hex : hex + Math.round(a * 255).toString(16).padStart(2, "0");
}
function toCss(type, v) {
  if (type === "color") return toHex(v);
  if (type === "dimension") {
    if (UNIT === "rem" && v.unit === "px") return `${v.value / 10}rem`; // html { font-size: 62.5% } 기준
    return `${v.value}${v.unit}`;
  }
  return String(v);
}
// 모드별 값 (참조 {a.b.c}는 같은 모드로 따라가서 실제 값으로 풀기)
function resolve(t, mode, depth = 0) {
  const raw = (mode && t.token.$extensions?.modes?.[mode]) ?? t.token.$value;
  if (typeof raw === "string" && raw.startsWith("{")) {
    const ref = byPath.get(raw.slice(1, -1));
    if (!ref || depth > 10) throw new Error(`참조 대상 없음: ${t.path} → ${raw}`);
    return resolve(ref, mode, depth + 1);
  }
  return toCss(t.token.$type, raw);
}
// ── semantic 색상 → 유틸리티 (Figma 용도 기준) ──
const PROP = { background: "background-color", border: "border-color", text: "color" };
const PREFIXED_FORM = { background: "bg", border: "border", text: "text" };
// Tailwind 기본 유틸리티와 이름이 겹치는 그룹: 같은 속성일 때만 허용 (text-* = 글자색, border-* = 테두리)
const TW_ROOTS = { text: "text", border: "border", bg: "background", shadow: null, ring: null, outline: null, fill: null, stroke: null, divide: null, accent: null, caret: null, decoration: null, placeholder: null, from: null, via: null, to: null, inset: null };
const { scopes: SCOPE_PROP = {}, groups: GROUP_RULE = {} } = RULES.utilities ?? {};
const utilities = []; // { cls, prop, varName }
const semanticClass = (t) => `${t.group}-${P}${t.key}`;
// Figma 용도(scopes)가 없거나 ALL_SCOPES(미지정)일 때 이름으로 속성 추정
const NAME_PROP = { text: "text", icon: "text", link: "text", border: "border", divider: "border" }; // 그룹 이름
const guessProp = (t) => NAME_PROP[t.group] ?? (t.key.split("-").includes("border") ? "border" : null); // 이름 속 단어 (button-secondary-border)
function semanticUtilities(t) {
  const rule = GROUP_RULE[t.group];
  if (rule === "prefixed") return null; // @theme --color-* 로 (bg-·text-·border-·shadow- 접두어)
  // 속성 결정 순서: rules groups 지정 → Figma 용도(scopes) → 이름으로 추정 → 모두(배경 기본 + border-·text- 접두어)
  let props;
  const scopes = t.token.$extensions?.scopes ?? [];
  const unspecified = !scopes.length || scopes.includes("ALL_SCOPES");
  if (rule) props = [rule];
  else if (unspecified && guessProp(t)) props = [guessProp(t)];
  else {
    props = unspecified ? ["background", "border", "text"] : [...new Set(scopes.map((s) => SCOPE_PROP[s]).filter(Boolean))];
    if (!props.length) throw new Error(`용도(scopes)를 클래스 속성으로 바꿀 수 없음: ${t.path} (${scopes}) — tokens.rules.json utilities.scopes 또는 groups에 지정하세요`);
    // 기본 순서: 배경 → 테두리 → 글자색. 단 텍스트 용도(TEXT_FILL)가 있고 면 채우기(FRAME_FILL·ALL_FILLS)가 없으면 글자·아이콘용 → 글자색 먼저
    const order = scopes.includes("TEXT_FILL") && !scopes.some((s) => s === "FRAME_FILL" || s === "ALL_FILLS") ? ["text", "background", "border"] : ["background", "border", "text"];
    props.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    // 여러 용도 + 도형 채우기(SHAPE_FILL) = 체크 표시 같은 아이콘 모양에도 쓰임 → 글자색(currentColor) 형태도 제공
    if (props.length > 1 && scopes.includes("SHAPE_FILL") && !props.includes("text")) props.push("text");
  }
  if (t.group in TW_ROOTS && TW_ROOTS[t.group] !== props[0])
    throw new Error(`그룹 이름 "${t.group}"이 Tailwind 기본 클래스와 겹칩니다 (${t.path}) — tokens.rules.json에서 이름을 바꾸거나 groups에 "prefixed"로 지정하세요`);
  const cls = semanticClass(t);
  return props.map((p, i) => ({ cls: i === 0 ? cls : `${PREFIXED_FORM[p]}-${cls}`, prop: p }));
}

const varName = (t) => {
  if (t.category === "vars") return VARS(t.key);
  if (t.category === "semantic") return `--color-${P}${t.group}-${t.key}`;
  return THEME[t.category]?.(t.key);
};
for (const t of list) if (!varName(t)) throw new Error(`알 수 없는 카테고리: ${t.path}`);

// 토큰에 있는데 tokens-config.js MODES에 없는 모드는 CSS에 출력되지 않음 → 경고
const unknownModes = [...new Set(list.flatMap((t) => Object.keys(t.token.$extensions?.modes ?? {})))].filter((m) => !MODES[m]);
if (unknownModes.length) console.warn(`⚠ tokens-config.js MODES에 없는 모드: ${unknownModes.join(", ")} — 이 모드 값은 출력되지 않습니다 (selector 또는 media 지정 필요)`);

for (const t of list.filter((t) => t.category === "semantic")) {
  const u = semanticUtilities(t);
  t.inTheme = !u; // 접두어 그룹은 @theme --color-* 로
  for (const x of u ?? []) utilities.push({ ...x, varName: varName(t) });
}
const theme = list.filter((t) => t.category !== "vars" && (t.category !== "semantic" || t.inTheme));

// semantic 클래스가 @theme 색상 클래스와 이름이 같으면(예: text-primary = semantic text/primary 이면서 --color-primary의 text-) 둘 중 하나가 조용히 덮어씀 → 오류
const themeColorClasses = new Set(theme.filter((t) => t.category === "color" || t.inTheme).flatMap((t) => ["bg", "text", "border"].map((p) => `${p}-${P}${t.key}`)));
const clashes = utilities.filter((u) => themeColorClasses.has(u.cls)).map((u) => u.cls);
if (clashes.length) throw new Error(`semantic 클래스와 색상 클래스 이름이 겹칩니다: ${clashes.join(", ")} — tokens.rules.json mappings에서 한쪽 이름을 바꾸세요`);
const vars = list.filter((t) => t.category === "vars" || (t.category === "semantic" && !t.inTheme));
const decl = (items, mode) => items.map((t) => `  ${varName(t)}: ${resolve(t, mode)};`).join("\n");
const changedIn = (mode) => list.filter((t) => resolve(t, mode) !== resolve(t, null));

// ── design-tokens.css ──
const hasSpacing = theme.some((t) => t.category === "spacing");
// font-size 이름이 Tailwind 기본(text-sm, text-4xl …)과 같으면 Tailwind 기본 line-height가 함께 붙음 → 끔
const TW_TEXT = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
const twTextLineHeights = list.filter((t) => t.category === "fontSize" && !P && TW_TEXT.includes(t.key)).map((t) => `  --text-${t.key}--line-height: initial;\n`).join("");
const keysOf = (category) => list.filter((t) => t.category === category).map((t) => `${P}${t.key}`);

let css = `/* Auto-generated from design-tokens.json — do not edit manually */
/* Run: npm run tokens */

/* static: 사용 여부와 관계없이 모든 토큰을 CSS 변수로 출력 (컴포넌트 <style>에서 var()로 참조) */
@theme static {
${hasSpacing ? "  --spacing-*: initial; /* Tailwind 기본 간격 계산(p-14 = 3.5rem) 끄고 토큰 단계만 사용 */\n" : ""}${hasSpacing && !byPath.has("spacing.0") ? `  --spacing-${P}0: 0px; /* 토큰에 0 단계가 없어도 p-0·m-0·gap-0 사용 */\n` : ""}${twTextLineHeights}${decl(theme, null)}
}

:root {
${decl(vars, null)}
}
`;

const mediaModes = []; // 화면 크기 모드는 누적 적용되므로(large 화면에는 medium도 적용) 앞 모드에서 바뀐 값도 다시 지정
for (const [mode, how] of Object.entries(MODES)) {
  const items = how.media
    ? list.filter((t) => [null, ...mediaModes].some((m) => resolve(t, mode) !== resolve(t, m)))
    : changedIn(mode);
  if (how.media) mediaModes.push(mode);
  if (!items.length) continue;
  const body = items.map((t) => `  ${varName(t)}: ${resolve(t, mode)};`).join("\n");
  if (how.selector) css += `\n/* ${mode} 모드 */\n${how.selector} {\n${body}\n}\n`;
  else if (how.media) css += `\n/* ${mode} 모드 */\n@media ${how.media} {\n  :root {\n${body.replace(/^/gm, "  ")}\n  }\n}\n`;
}

// semantic 색상 유틸리티 (클래스 = Figma 변수 경로, 속성 = Figma 용도)
css += `\n/* semantic 색상 클래스 (Figma color/{그룹}/{이름} → {그룹}-{이름}) */\n`;
css += utilities.map((u) => `@utility ${u.cls} { ${PROP[u.prop]}: var(${u.varName}); }`).join("\n") + "\n";

// 동적 클래스 safelist (클래스 이름을 조합해서 쓰는 useSpacing / useFontSize / useRadius)
const inline = (pattern) => `@source inline('${pattern}');`;
css += `
/* 동적 클래스 (types/spacing.ts · fontSize.ts · radius.ts에서 조합하는 클래스) */
${inline(`{${SPACING_PREFIXES.join(",")}}-{${keysOf("spacing").join(",")}}`)}
${inline(`text-{${keysOf("fontSize").join(",")}}`)}
${inline(`rounded-{${keysOf("radius").join(",")}}`)}
`;

// UNIT = rem: 1rem = 10px 기준으로 값을 나눴으므로 html font-size를 62.5%(10px)로 (px이면 출력 안 함)
if (UNIT === "rem") css += `\n/* tokens-config.js UNIT = rem → 1rem = 10px */\n@layer base {\n  html { font-size: 62.5%; }\n}\n`;

fs.writeFileSync(OUTPUT_CSS, css);
console.log("✓ design-tokens.css generated");

// ── typography (rules: font-size 이름 → font-weight 이름) ── 토큰에 없는 이름은 오류
const TYPO = RULES.typography ?? {};
const typoErrors = Object.entries(TYPO).flatMap(([size, weight]) => [
  !byPath.has(`fontSize.${size}`) && `font-size 토큰 없음: ${size}`,
  !byPath.has(`fontWeight.${weight}`) && `font-weight 토큰 없음: ${size} → ${weight}`,
]).filter(Boolean);
if (typoErrors.length) throw new Error(`tokens.rules.json typography 확인 — ${typoErrors.join(", ")}`);

// ── tokens.generated.ts (ui-vue types) ──
// 화면 크기 모드 이름 → "≥1280px" (min-width 조건이 아니면 모드 이름 그대로)
const modeLabel = (m) => MODES[m].media?.match(/min-width:\s*([\d.]+\w+)/)?.[1].replace(/^/, "≥") ?? m;
const tokensOf = (category) => list.filter((t) => t.category === category);
const tokenValue = (t, mode) => (t.category === "fontWeight" ? Number(resolve(t, mode)) : resolve(t, mode));
const lit = (v) => (typeof v === "number" ? v : `'${v}'`);
// 기본값 객체: { 'key': value, … } (키 정렬 맞춤)
function valueScale(name, category, comment) {
  const items = tokensOf(category);
  const w = Math.max(...items.map((t) => t.key.length)) + 3;
  return `// ${comment}\nexport const ${name} = {\n${items.map((t) => `  ${`'${t.key}':`.padEnd(w)} ${lit(tokenValue(t, null))},`).join("\n")}\n} as const;`;
}
// font-size: { size, weight } — weight = tokens.rules.json typography (없으면 typo variant 아님)
function fontSizeScale() {
  const items = tokensOf("fontSize");
  const w = Math.max(...items.map((t) => t.key.length)) + 3;
  const lines = items.map((t) => {
    const weight = TYPO[t.key] ? `, weight: '${TYPO[t.key]}'` : "";
    return `  ${`'${t.key}':`.padEnd(w)} { size: '${tokenValue(t, null)}'${weight} },`;
  });
  return `// font-size: text-* / weight = typo 굵기 (tokens.rules.json typography, 없으면 typo variant 아님)\nexport const FONT_SIZE_SCALE = {\n${lines.join("\n")}\n} as const;`;
}
// 화면 너비별로 바뀌는 값: 그 너비에서 실제로 보이는 값 중 기본값과 다른 것만 (없으면 출력 안 함)
function responsive() {
  const CATS = { fontSize: "fontSize", fontWeight: "fontWeight", spacing: "spacing", radius: "radius" };
  const blocks = Object.keys(MODES).filter((m) => MODES[m].media).map((m) => {
    const cats = Object.entries(CATS).map(([cat, key]) => {
      const changed = tokensOf(cat).filter((t) => resolve(t, m) !== resolve(t, null));
      if (!changed.length) return null;
      const w = Math.max(...changed.map((t) => t.key.length)) + 3;
      return `    ${key}: {\n${changed.map((t) => `      ${`'${t.key}':`.padEnd(w)} ${lit(tokenValue(t, m))},`).join("\n")}\n    },`;
    }).filter(Boolean);
    return cats.length ? `  '${modeLabel(m)}': {\n${cats.join("\n")}\n  },` : null;
  }).filter(Boolean);
  return blocks.length ? `\n// 화면 너비별로 바뀌는 값 (그 너비에서 실제로 보이는 값 중 기본값과 다른 것)\nexport const RESPONSIVE = {\n${blocks.join("\n")}\n} as const;\n` : "";
}
const ts = `// Auto-generated from @ui/style design-tokens.json — do not edit manually
// Run: npm run tokens -w @ui/style
// 클래스 이름은 PREFIX(@ui/style tokens-config.js)가 붙기 전 기준입니다.

${valueScale("SPACING_SCALE", "spacing", "spacing: p-*, m-*, gap-* … (primitive number, 값 = 기본 화면)")}

${valueScale("RADIUS_SCALE", "radius", "radius: rounded-*")}

${fontSizeScale()}

${valueScale("FONT_WEIGHT_SCALE", "fontWeight", "font-weight: font-*")}
${responsive()}
// semantic 색상 클래스 (utils/cn.ts에서 tailwind-merge 충돌 그룹 등록용)
${["background", "border", "text"].map((p) => `export const ${p.toUpperCase()}_COLOR_CLASSES = ${JSON.stringify(utilities.filter((u) => u.prop === p).map((u) => u.cls))} as const;`).join("\n")}
`;
fs.writeFileSync(OUTPUT_TS, ts);
console.log(`✓ ${path.basename(OUTPUT_TS)} generated`);