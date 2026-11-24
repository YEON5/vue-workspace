import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { BACKGROUND_COLOR_CLASSES, BORDER_COLOR_CLASSES, FONT_SIZE_SCALE, RADIUS_SCALE, TEXT_COLOR_CLASSES } from '#/types/tokens.generated';

// 디자인 토큰 클래스를 tailwind-merge에 등록
// (모르는 이름이면 text-body-md를 글자색으로 오인해 text-basic과 충돌로 보고 하나를 지우거나,
//  surface-disabled와 background-default처럼 같은 속성 클래스를 둘 다 남겨 충돌함)
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: Object.keys(FONT_SIZE_SCALE) }],
      'font-weight': [{ font: ['regular'] }],
      rounded: [{ rounded: Object.keys(RADIUS_SCALE) }],
      // Figma 경로 색상 클래스 (surface-*, element-*, button-*, input-*, divider-*, icon-* …)
      'bg-color': [...BACKGROUND_COLOR_CLASSES],
      'border-color': [...BORDER_COLOR_CLASSES],
      'text-color': [...TEXT_COLOR_CLASSES],
    },
  },
});

/**
 * 조건부 클래스를 조합하고 Tailwind CSS 클래스 충돌을 안전하게 병합
 * 기존 twMerge 대신 customTwMerge 사용
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
