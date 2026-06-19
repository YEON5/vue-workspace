// @ui/vue/scripts/watch-icons.js
import chokidar from 'chokidar';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET = path.resolve(__dirname, '../src/assets/icons');

console.log('👀 SVG 아이콘 폴더 감시 중...');

// 최초 1회 실행
try {
  execSync('node scripts/generate-icons.js', { stdio: 'inherit' });
} catch (e) {
  console.error('❌ 아이콘 생성 실패:', e.message);
}

function regenerate(event) {
  console.log(`🔄 아이콘 ${event} 감지됨. export 구문 재생성!`);
  try {
    execSync('node scripts/generate-icons.js', { stdio: 'inherit' });
  } catch (e) {
    console.error('❌ 아이콘 생성 실패:', e.message);
  }
}

chokidar.watch(TARGET, { ignoreInitial: true })
  .on('add', () => regenerate('추가'))
  .on('unlink', () => regenerate('삭제'))
  .on('change', () => regenerate('변경'));