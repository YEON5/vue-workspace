// @ui/vue/scripts/generate-icons.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../src/assets/icons');
const OUTPUT_FILE = path.resolve(__dirname, '../src/components/generated-icons.ts');

function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (clearAndUpper) => 
    clearAndUpper.replace(/-/, '').toUpperCase()
  );
}

function generate() {
  if (!fs.existsSync(ICONS_DIR)) return;

  const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));
  
  let exportsContent = `// 이 파일은 자동 생성됩니다. 수동으로 수정하지 마세요!\n`;
  exportsContent += `// 실행: npm run generate:icons\n\n`;

  files.forEach(file => {
    const name = file.replace('.svg', '');
    const componentName = `I${toPascalCase(name)}`;
    exportsContent += `export { default as ${componentName} } from '../assets/icons/${file}';\n`;
  });

  fs.writeFileSync(OUTPUT_FILE, exportsContent, 'utf-8');
  console.log(`✨ ${files.length}개의 아이콘 export 구문이 생성되었습니다.`);
}

generate();