// src/types/radius.ts
// 피그마 radius 토큰과 1:1 대응
// 토큰 추가/변경 시 RadiusToken 타입과 RADIUS_TOKENS 만 수정

export type RadiusToken =
  | 'none'  // 0px
  | 'sm'    // 2px
  | 'md'    // 4px
  | 'lg'    // 8px
  | 'xl'    // 12px
  | '2xl'   // 16px
  | '3xl'   // 20px
  | 'full'; // 9999px

export const RADIUS_TOKENS: RadiusToken[] = [
  'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'
];

export const radiusMap = Object.fromEntries(
  RADIUS_TOKENS.map(token => [token, `rounded-${token}`])
) as Record<RadiusToken, string>;