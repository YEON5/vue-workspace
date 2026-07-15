// src/types/fontSize.ts
// 순수 폰트 사이즈 원시(Primitive) 토큰
// 토큰 추가/변경 시 FontSizeToken 타입과 FONT_SIZE_TOKENS 만 수정

export type FontSizeToken =
  | 'xxs'  // 12px
  | 'xs'   // 13px
  | 'sm'   // 14px
  | 'md'   // 16px
  | 'lg'   // 18px
  | 'xl'   // 20px
  | '2xl'  // 24px
  | '3xl'  // 30px
  | '4xl'; // 36px

export const FONT_SIZE_TOKENS: FontSizeToken[] = [
  'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
];

export const fontSizeMap = Object.fromEntries(
  FONT_SIZE_TOKENS.map(token => [token, `text-${token}`])
) as Record<FontSizeToken, string>;