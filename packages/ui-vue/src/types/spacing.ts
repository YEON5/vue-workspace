// src/types/spacing.ts
// 피그마 primitive number 토큰과 1:1 대응 (p-9 = gap-9 = mt-9 = 16px)
// 토큰 추가/변경은 Figma export → npm run tokens -w @ui/style 로 자동 반영
import { SPACING_SCALE } from './tokens.generated';

// 토큰 목록·px 값은 tokens.generated.ts (@ui/style design-tokens.json에서 자동 생성)
// 'none'은 p-0 등 0 간격 (Tailwind 기본 클래스)
export type SpacingToken = 'none' | keyof typeof SPACING_SCALE;

export const SPACING_TOKENS = ['none', ...Object.keys(SPACING_SCALE)] as SpacingToken[];

export const SPACING_PREFIXES = [
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py',
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my',
  'gap'
] as const;

export type SpacingPrefix = typeof SPACING_PREFIXES[number];

export const spacingMap = Object.fromEntries(
  SPACING_PREFIXES.map(prefix => [
    prefix,
    Object.fromEntries(
      SPACING_TOKENS.map(token => [
        token,
        token === 'none' ? `${prefix}-0` : `${prefix}-${token}`
      ])
    ) as Record<SpacingToken, string>,
  ])
) as Record<SpacingPrefix, Record<SpacingToken, string>>;