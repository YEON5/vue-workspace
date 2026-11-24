// src/types/typo.ts
import type { ColorToken } from './color';
import { FONT_SIZE_SCALE } from './tokens.generated';

export type TypoAlign =
  | 'left'
  | 'center'
  | 'right';

// variant = 디자인 토큰 font-size 이름 (사용: <Typo variant="body-lg">)
// 크기 → 굵기 조합은 @ui/style tokens.rules.json typography에서 지정 → tokens.generated.ts FONT_SIZE_SCALE (굵기가 있는 크기만 variant)
type FontSizeScale = typeof FONT_SIZE_SCALE;
export type TypoToken = { [K in keyof FontSizeScale]: FontSizeScale[K] extends { weight: string } ? K : never }[keyof FontSizeScale];

// 크기 + 굵기 + 행간(1.5)
export const TypoMap = Object.fromEntries(
  Object.entries(FONT_SIZE_SCALE)
    .filter(([, v]) => 'weight' in v)
    .map(([size, v]) => [size, `text-${size} font-${(v as { weight: string }).weight} leading-normal`])
) as Record<TypoToken, string>;

// 정렬
export const textAlignMap: Record<TypoAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

// ColorToken을 re-export해서 Typo.vue에서 #/types/typo만 import해도 됨
export type { ColorToken };

