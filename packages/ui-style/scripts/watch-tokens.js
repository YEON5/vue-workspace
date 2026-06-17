// chokidar로 design-tokens.json 변경을 감시하고 자동으로 generate-tokens.js를 재실행합니다. 최초 실행 시에도 1회 생성합니다.
const chokidar = require("chokidar");
const { execSync } = require("child_process");
const path = require("path");

const TARGET = path.resolve(__dirname, "../src/tokens/design-tokens.json");

console.log("👀 design-tokens.json 감시 중...");

// 최초 1회 실행
execSync("node scripts/generate-tokens.js", { stdio: "inherit" });

chokidar.watch(TARGET).on("change", () => {
  console.log("🔄 토큰 변경 감지 → 재생성");
  try {
    execSync("node scripts/generate-tokens.js", { stdio: "inherit" });
  } catch (e) {
    console.error("❌ 토큰 생성 실패:", e.message);
  }
});