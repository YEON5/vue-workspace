import { cn } from '@/utils/cn';
import { computed } from 'vue';

// 디자인 토큰 변경 시 이 부분만 수정
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

export interface FontSizeProps {
  text?: FontSizeToken;
}

// FontSizeToken에서 자동으로 클래스 맵 생성
// 토큰이 추가/변경되면 FontSizeToken 타입과 FONT_SIZE_TOKENS만 수정하면 됨
const FONT_SIZE_TOKENS: FontSizeToken[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']; // 토큰 추가 시 이부분 수정

const fontSizeMap = Object.fromEntries(
  FONT_SIZE_TOKENS.map(token => [token, `text-${token}`])
) as Record<FontSizeToken, string>;

export function useFontSize(props: FontSizeProps) {
  const fontSizeClasses = computed(() =>
    cn(props.text && fontSizeMap[props.text])
  );

  return { fontSizeClasses };
}