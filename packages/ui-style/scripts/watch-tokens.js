// chokidar로 Figma export·규칙·설정 변경을 감시하고 convert → generate를 재실행합니다. 최초 실행 시에도 1회 생성합니다.
const chokidar = require("chokidar");
const { execFileSync } = require("child_process");
const path = require("path");

const TARGETS = [
  path.resolve(__dirname, "../src/tokens/figma-export"), // Figma에서 export한 원본 JSON
  path.resolve(__dirname, "../src/tokens/tokens.rules.json"), // 변환 규칙
  path.resolve(__dirname, "../src/tokens-config.js"), // PREFIX · UNIT · MODES
];
const CONVERT = path.resolve(__dirname, "convert-tokens.js");
const GENERATE = path.resolve(__dirname, "generate-tokens.js");

// 실행 위치(cwd)와 상관없이 동작, 실패해도 감시는 계속 유지
function run() {
  try {
    execFileSync(process.execPath, [CONVERT], { stdio: "inherit" });
    execFileSync(process.execPath, [GENERATE], { stdio: "inherit" });
  } catch (e) {
    console.error("❌ 토큰 생성 실패:", e.message);
  }
}

console.log("👀 figma-export · tokens.rules.json · tokens-config.js 감시 중...");

// 최초 1회 실행
run();

chokidar
  .watch(TARGETS, {
    ignoreInitial: true,
    // 파일 쓰기가 끝난 뒤에 실행 (큰 JSON을 덮어쓸 때 읽다 만 파일로 파싱 에러 나는 것 방지)
    awaitWriteFinish: { stabilityThreshold: 200 },
  })
  .on("all", (event, file) => {
    if (!["change", "add", "unlink"].includes(event) || !/\.(json|js)$/.test(file)) return;
    console.log(`🔄 ${path.basename(file)} 변경 감지 → 재생성`);
    run();
  });
