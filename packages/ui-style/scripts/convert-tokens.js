// Figma export(figma-export/*.tokens.json) + tokens.rules.json → 표준 design-tokens.json (DTCG 2025.10)
// - 컬렉션·모드별로 나뉜 파일을 하나로 합칩니다.
// - 규칙에 없는 변수, 중복, 타입 불일치가 있으면 저장하지 않고 오류를 출력합니다.
const fs = require("fs");
const path = require("path");

const TOKENS_DIR = path.resolve(__dirname, "../src/tokens");
const EXPORT_DIR = path.join(TOKENS_DIR, "figma-export");
const RULES = path.join(TOKENS_DIR, "tokens.rules.json");
const OUTPUT = path.join(TOKENS_DIR, "design-tokens.json");
const VARIABLES_FILE = path.join(TOKENS_DIR, "variables-tokens.json"); // Figma URL로 읽은 Variables (컬렉션·모드를 하나로 합친 파일)

const rules = JSON.parse(fs.readFileSync(RULES, "utf-8"));
const errors = [];
const warnings = []; // 저장은 하되 확인이 필요한 것

// ── 패턴: {이름} = 한 세그먼트 안 캡처(최소 매칭), * = 한 세그먼트, ** = 여러 세그먼트 ──
function compile(pattern) {
  let rx = "";
  for (const part of pattern.split(/(\{\w+\}|\*\*|\*)/)) {
    if (part === "**") rx += ".+";
    else if (part === "*") rx += "[^/]+";
    else if (/^\{\w+\}$/.test(part)) rx += `(?<${part.slice(1, -1)}>[^/]+?)`;
    else rx += part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${rx}$`);
}
const mappings = rules.mappings.map((m) => ({ ...m, rx: compile(m.from) }));
// 줄임말: 캡처값을 '-' 단위 단어로 나눠 치환 (xlarge → xl). 규칙에 "abbreviate": false면 적용 안 함
const abbr = rules.abbreviations ?? {};
const abbreviate = (value) => value.split("-").map((w) => abbr[w] ?? w).join("-");
const ignores = (rules.ignore ?? []).map(compile);
// 기본 모드가 아닌 값(pc 등)의 0은 Figma에서 비워 둔 값으로 보고 기본 모드 값을 씀. 0이 의도된 변수는 keepZero에 패턴으로 지정
const keepZero = (rules.keepZero ?? []).map(compile);
const defaultModes = new Set(rules.defaultModes ?? []);

// Figma 경로 → { 표준 경로, 규칙, 경로에서 꺼낸 모드 }
function resolvePath(figmaPath) {
  if (ignores.some((rx) => rx.test(figmaPath))) return { ignored: true };
  for (const m of mappings) {
    const hit = figmaPath.match(m.rx);
    if (!hit) continue;
    const { mode, ...vars } = hit.groups ?? {};
    // 이름은 소문자로 통일 (button/CTA → button-cta)
    const to = m.to.replace(/\{(\w+)\}/g, (_, k) => {
      const v = vars[k].toLowerCase();
      return m.abbreviate === false ? v : abbreviate(v);
    });
    return { to, rule: m, pathMode: mode };
  }
  return null;
}

// ── 1. Figma Variables 읽기 ──
// 입력은 둘 중 하나 (tokens.rules.json source.input)
//   "figma-export" (기본): figma-export/의 컬렉션·모드별 파일 (sources에 파일 지정)
//   "variables-tokens"   : variables-tokens.json 하나 = { "컬렉션": { "모드": { 변수 트리 } } } (컬렉션·모드 이름이 파일 안에 있어 sources 불필요)
const variables = []; // { figmaPath, mode, token }
function walk(node, prefix, collection, mode) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$") || typeof value !== "object" || value === null) continue;
    if ("$value" in value) variables.push({ figmaPath: `${collection}/${prefix}${key}`, mode, token: value });
    else walk(value, `${prefix}${key}/`, collection, mode);
  }
}
const INPUT = rules.source?.input ?? "figma-export";
if (INPUT === "variables-tokens") {
  if (!fs.existsSync(VARIABLES_FILE)) errors.push("파일 없음: variables-tokens.json (tokens.rules.json source.input = variables-tokens)");
  else {
    const all = JSON.parse(fs.readFileSync(VARIABLES_FILE, "utf-8"));
    for (const [collection, modes] of Object.entries(all)) {
      if (collection.startsWith("$")) continue;
      for (const [mode, tree] of Object.entries(modes)) if (!mode.startsWith("$")) walk(tree, "", collection, mode);
    }
  }
} else {
  for (const { collection, files } of rules.sources ?? []) {
    for (const [mode, file] of Object.entries(files)) {
      const filePath = path.join(EXPORT_DIR, file);
      if (!fs.existsSync(filePath)) {
        errors.push(`파일 없음: figma-export/${file} (${collection} / ${mode})`);
        continue;
      }
      walk(JSON.parse(fs.readFileSync(filePath, "utf-8")), "", collection, mode);
    }
  }
}

// ── 2. 값 변환 ──
const FONT_WEIGHTS = { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };

function convertValue(type, token, figmaPath) {
  let v = token.$value;
  // 숫자를 문자열 변수로 만든 경우("12") 숫자로 읽음
  if ((type === "dimension" || type === "number") && typeof v === "string" && /^-?\d+(\.\d+)?$/.test(v.trim())) v = Number(v);
  switch (type) {
    case "color": {
      if (token.$type !== "color" || typeof v !== "object") break;
      // hex는 DTCG에서 선택 필드 → 없으면 sRGB components(0~1)로 계산. sRGB가 아닌데 hex도 없으면 값을 만들 수 없으므로 오류
      let hex = v.hex;
      if (!hex && (v.colorSpace ?? "srgb") === "srgb" && Array.isArray(v.components) && v.components.length >= 3)
        hex = "#" + v.components.slice(0, 3).map((n) => Math.round(Math.min(1, Math.max(0, n)) * 255).toString(16).padStart(2, "0")).join("");
      if (!hex) { errors.push(`색상 값 읽기 실패: ${figmaPath} (colorSpace ${v.colorSpace}, hex 없음)`); return undefined; }
      return { colorSpace: v.colorSpace, components: v.components, alpha: v.alpha ?? 1, hex };
    }
    case "dimension":
      if (typeof v === "number") return { value: v, unit: "px" };
      if (v && typeof v === "object" && "value" in v) return v;
      break;
    case "number":
      if (typeof v === "number") return v;
      break;
    case "fontWeight": {
      if (typeof v === "number") return v;
      const w = FONT_WEIGHTS[String(v).toLowerCase().replace(/[\s_-]/g, "")];
      if (w) return w;
      break;
    }
  }
  errors.push(`타입 불일치: ${figmaPath} (규칙 ${type}, Figma ${token.$type} = ${JSON.stringify(v)})`);
  return undefined;
}

// 참조(alias)는 두 가지 형식으로 옵니다.
//   다른 컬렉션 참조: $value = 실제 값, $extensions.com.figma.aliasData = 참조 대상
//   같은 컬렉션 참조: $value = "{color.element.gray-lighter}" 문자열 (aliasData 없음)
// 참조 대상이 결과에 있으면 {표준.경로}로, 없으면(ignore 등) 실제 값 그대로 둡니다.
function aliasOf(token, mode, figmaPath) {
  const v = token.$value;
  const isLocal = typeof v === "string" && /^\{.+\}$/.test(v);
  const alias = token.$extensions?.["com.figma.aliasData"];
  let targetPath;
  if (isLocal) targetPath = `${figmaPath.split("/")[0]}/${v.slice(1, -1).replace(/\./g, "/")}`;
  else if (alias?.targetVariableSetName && alias?.targetVariableName) targetPath = `${alias.targetVariableSetName}/${alias.targetVariableName}`;
  else return null;
  const target = resolvePath(targetPath);
  if (!target || target.ignored) {
    if (isLocal) errors.push(`참조 대상 없음: ${figmaPath} → ${v}`); // 실제 값이 없으므로 저장 불가
    return null;
  }
  // light 토큰이 dark 팔레트를 참조하는 경우처럼 모드가 다르면 참조로 표현할 수 없음 → 실제 값
  if (target.pathMode && target.pathMode !== mode) return null;
  return `{${target.to}}`;
}

// ── 3. 표준 JSON 조립 ──
const out = { $extensions: { source: { fileName: rules.source?.fileName ?? "", format: rules.source?.format ?? "" } } };
const seen = new Map(); // "표준경로@모드" → figmaPath

for (const { figmaPath, mode: fileMode, token } of variables) {
  const hit = resolvePath(figmaPath);
  if (!hit) { errors.push(`규칙 없음: ${figmaPath}`); continue; }
  if (hit.ignored) continue;

  const mode = hit.pathMode ?? fileMode;
  const key = `${hit.to}@${mode}`;
  if (seen.has(key)) { errors.push(`중복: ${hit.to} (${mode}) ← ${seen.get(key)}, ${figmaPath}`); continue; }
  seen.set(key, figmaPath);

  const alias = aliasOf(token, mode, figmaPath);
  if (alias === null && typeof token.$value === "string" && token.$value.startsWith("{")) continue; // 참조 오류 (위에서 기록)
  const value = alias ?? convertValue(hit.rule.type, token, figmaPath);
  if (value === undefined) continue;

  const isZero = value === 0 || value?.value === 0;
  if (!alias && isZero && !defaultModes.has(mode) && !keepZero.some((rx) => rx.test(figmaPath))) {
    warnings.push(`${figmaPath} (${mode}) = 0 → 기본 모드 값 사용 (0이 맞으면 rules keepZero에 추가)`);
    continue;
  }

  const parts = hit.to.split(".");
  let node = out;
  for (const p of parts.slice(0, -1)) node = node[p] ??= {};
  const leaf = (node[parts.at(-1)] ??= { $type: hit.rule.type });
  if (token.$description && !leaf.$description) leaf.$description = token.$description.trim();
  leaf.$extensions ??= {};

  if (defaultModes.has(mode)) {
    // 기본 모드가 여러 개(value-set·light …)라 위 중복 검사(경로@모드)로는 못 잡는 경우: 서로 다른 변수가 같은 기본값 자리를 차지
    if ("$value" in leaf) { errors.push(`중복: ${hit.to} (기본값) ← ${leaf.$extensions.source}, ${figmaPath}`); continue; }
    leaf.$value = value;
    leaf.$extensions.source = figmaPath;
    // Figma 용도(채우기·선·텍스트) — generate에서 클래스의 CSS 속성을 정하는 데 사용
    const scopes = token.$extensions?.["com.figma.scopes"];
    if (scopes?.length) leaf.$extensions.scopes = scopes;
  } else {
    (leaf.$extensions.modes ??= {})[mode] = value;
  }
}

// 기본 모드 값이 없는 토큰 확인
(function check(node, p) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    if (v.$type) { if (!("$value" in v)) errors.push(`기본 모드 값 없음: ${p}${k} (defaultModes: ${[...defaultModes]})`); }
    else check(v, `${p}${k}.`);
  }
})(out, "");

if (errors.length) {
  console.error(`❌ 변환 실패 (${errors.length}건) — design-tokens.json을 저장하지 않았습니다.`);
  for (const e of errors) console.error("   " + e);
  process.exit(1);
}

// ── 4. 변경 요약 (기존 표준 JSON과 비교) ──
function flatten(node, p = "", acc = {}) {
  for (const [k, v] of Object.entries(node ?? {})) {
    if (k.startsWith("$")) continue;
    if (v && v.$type) acc[p + k] = JSON.stringify([v.$value, v.$extensions?.modes]);
    else if (v && typeof v === "object") flatten(v, `${p}${k}.`, acc);
  }
  return acc;
}
let before = {};
try { before = flatten(JSON.parse(fs.readFileSync(OUTPUT, "utf-8"))); } catch { /* 첫 실행: 기존 design-tokens.json 없음 */ }
const after = flatten(out);
const added = Object.keys(after).filter((k) => !(k in before));
const removed = Object.keys(before).filter((k) => !(k in after));
const changed = Object.keys(after).filter((k) => k in before && before[k] !== after[k]);

fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2) + "\n");
console.log(`✓ design-tokens.json converted (${Object.keys(after).length} tokens · +${added.length} -${removed.length} ~${changed.length})`);
const show = (label, list) => list.length && console.log(`   ${label}: ${list.slice(0, 10).join(", ")}${list.length > 10 ? ` 외 ${list.length - 10}개` : ""}`);
show("추가", added);
show("삭제", removed);
show("변경", changed);
if (warnings.length) {
  console.warn(`⚠ 확인 필요 (${warnings.length}건)`);
  for (const w of warnings) console.warn("   " + w);
}
