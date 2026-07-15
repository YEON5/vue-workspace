// src/types/spacing.ts
// 피그마 spacing 토큰과 1:1 대응
// 토큰 추가/변경 시 SpacingToken 타입과 SPACING_TOKENS 만 수정

export type SpacingToken =
  | 'none' // 0px
  | '1'    // 2px
  | '2'    // 4px
  | '3'    // 8px
  | '4'    // 12px
  | '5'    // 16px
  | '6'    // 20px
  | '7'    // 24px
  | '8'    // 32px
  | '9'    // 40px
  | '10'   // 48px
  | '11'   // 60px
  | '12'   // 72px
  | '13';  // 80px

export const SPACING_TOKENS: SpacingToken[] = [
  'none', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'
];

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