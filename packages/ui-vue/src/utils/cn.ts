import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 커스텀 Tailwind 룰 추가
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xxs', 'text-xxs-2'], // 필요한 커스텀 사이즈 추가
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
