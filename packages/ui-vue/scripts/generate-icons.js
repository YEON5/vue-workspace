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

// fill, stroke 값에서 실제 고유 색상 개수를 세는 함수
// none, transparent, currentColor, url(#...) 등은 색상 카운트에서 제외
function getUniqueColorsCount(svgContent) {
  const colorRegex = /(?:fill|stroke)="([^"]+)"/gi;
  const colors = new Set();

  let match;
  while ((match = colorRegex.exec(svgContent)) !== null) {
    const colorValue = match[1].toLowerCase();
    if (
      !['none', 'transparent', 'currentcolor'].includes(colorValue) &&
      !colorValue.startsWith('url')
    ) {
      colors.add(colorValue);
    }
  }
  return colors.size;
}

// 단색 아이콘의 fill, stroke를 currentColor로 치환 (none, transparent는 유지)
function convertToCurrentColor(svgContent) {
  return svgContent
    .replace(/fill="(?!none|transparent)[^"]+"/g, 'fill="currentColor"')
    .replace(/stroke="(?!none|transparent)[^"]+"/g, 'stroke="currentColor"');
}

function generate() {
  if (!fs.existsSync(ICONS_DIR)) return;

  const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));

  let exportsContent = `// 이 파일은 자동 생성됩니다. 수동으로 수정하지 마세요!\n`;
  exportsContent += `// 실행: npm run generate:icons\n\n`;

  files.forEach(file => {
    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const name = file.replace('.svg', '');
    const componentName = `I${toPascalCase(name)}`;
    const colorCount = getUniqueColorsCount(content);

    if (colorCount > 1) {
      // 다색 아이콘 - ?skipsvgo로 convertColors 건너뜀 → 원본 색상 유지
      exportsContent += `export { default as ${componentName} } from '../assets/icons/${file}?skipsvgo';\n`;
      console.log(`🌈 다색 아이콘 유지: ${file}`);
    } else {
      // 단색 아이콘 - SVG 파일을 currentColor로 변환 → text-* 색상 제어 가능
      const converted = convertToCurrentColor(content);
      if (converted !== content) {
        fs.writeFileSync(filePath, converted, 'utf-8');
        console.log(`🎨 currentColor 변환: ${file}`);
      }
      exportsContent += `export { default as ${componentName} } from '../assets/icons/${file}';\n`;
    }
  });

  fs.writeFileSync(OUTPUT_FILE, exportsContent, 'utf-8');
  console.log(`✨ ${files.length}개의 아이콘 export 구문이 생성되었습니다.`);
}

generate();