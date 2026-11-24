// src/types/radius.ts
// 피그마 semantic radius 토큰과 1:1 대응
// 토큰 추가/변경은 Figma export → npm run tokens -w @ui/style 로 자동 반영
import { RADIUS_SCALE } from './tokens.generated';

// 토큰 목록·px 값은 tokens.generated.ts (@ui/style design-tokens.json에서 자동 생성)
// 'none', 'full'은 Tailwind 기본 클래스 (rounded-none: 0 / rounded-full: 정사각형은 원, 직사각형은 알약 모양)
export type RadiusToken = 'none' | keyof typeof RADIUS_SCALE | 'full';

export const RADIUS_TOKENS = ['none', ...Object.keys(RADIUS_SCALE), 'full'] as RadiusToken[];

export const radiusMap = Object.fromEntries(
  RADIUS_TOKENS.map(token => [token, `rounded-${token}`])
) as Record<RadiusToken, string>;