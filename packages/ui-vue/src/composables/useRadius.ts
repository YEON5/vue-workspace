import { cn } from '@/utils/cn';
import { computed } from 'vue';

// 디자인 토큰 변경 시 이 부분만 수정
export type RadiusToken =
  | 'none'  // 0px
  | 'sm'    // 2px
  | 'md'    // 4px
  | 'lg'    // 8px
  | 'xl'    // 12px
  | '2xl'   // 16px
  | '3xl'   // 20px
  | 'full'; // 9999px

export interface RadiusProps {
  rounded?: RadiusToken;
}

// RadiusToken에서 자동으로 클래스 맵 생성
// 토큰이 추가/변경되면 RadiusToken 타입과 RADIUS_TOKENS만 수정하면 됨
const RADIUS_TOKENS: RadiusToken[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']; // 토큰 추가 시 이부분 수정

const radiusMap = Object.fromEntries(
  RADIUS_TOKENS.map(token => [token, `rounded-${token}`])
) as Record<RadiusToken, string>;

export function useRadius(props: RadiusProps) {
  const radiusClasses = computed(() =>
    cn(props.rounded && radiusMap[props.rounded])
  );

  return { radiusClasses };
}