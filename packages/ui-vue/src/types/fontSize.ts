// src/types/fontSize.ts
// 피그마 responsive font-size 토큰과 1:1 대응 (화면 크기에 따라 값이 바뀜)
// 토큰 추가/변경은 Figma export → npm run tokens -w @ui/style 로 자동 반영
import { FONT_SIZE_SCALE } from './tokens.generated';

// 토큰 목록·px 값(화면 크기별)은 tokens.generated.ts (@ui/style design-tokens.json에서 자동 생성)
export type FontSizeToken = keyof typeof FONT_SIZE_SCALE;

export const FONT_SIZE_TOKENS = Object.keys(FONT_SIZE_SCALE) as FontSizeToken[];

export const fontSizeMap = Object.fromEntries(
  FONT_SIZE_TOKENS.map(token => [token, `text-${token}`])
) as Record<FontSizeToken, string>;