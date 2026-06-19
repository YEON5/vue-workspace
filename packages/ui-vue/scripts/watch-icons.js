// @ui/vue/scripts/watch-icons.js
import chokidar from 'chokidar';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET = path.resolve(__dirname, '../src/assets/icons');

console.log('SVG 아이콘 폴더 감시 중...');

execSync('node scripts/generate-icons.js', { stdio: 'inherit' });

chokidar.watch(TARGET, { ignoreInitial: true })
  .on('add', () => {
    console.log('새 아이콘 감지됨. export 구문 재생성!');
    execSync('node scripts/generate-icons.js', { stdio: 'inherit' });
  })
  .on('unlink', () => {
    console.log('아이콘 삭제 감지됨. export 구문 재생성!');
    execSync('node scripts/generate-icons.js', { stdio: 'inherit' });
  });