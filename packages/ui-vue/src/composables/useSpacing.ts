import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type SpacingToken = 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13'; // 토큰 추가 시 이부분 수정

export interface SpacingProps {
  p?: SpacingToken; pt?: SpacingToken; pb?: SpacingToken; pl?: SpacingToken; pr?: SpacingToken; px?: SpacingToken; py?: SpacingToken;
  m?: SpacingToken; mt?: SpacingToken; mb?: SpacingToken; ml?: SpacingToken; mr?: SpacingToken; mx?: SpacingToken; my?: SpacingToken;
  gap?: SpacingToken;
}

// SpacingToken에서 자동으로 클래스 맵 생성
// 토큰이 추가/변경되면 SpacingToken 타입만 수정하면 됨
const PREFIXES = ['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'gap'] as const;
type Prefix = typeof PREFIXES[number];

const TOKENS: SpacingToken[] = ['none', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']; // 토큰 추가 시 이부분 수정

const maps = Object.fromEntries(
  PREFIXES.map(prefix => [
    prefix,
    Object.fromEntries(
      TOKENS.map(token => [token, token === 'none' ? `${prefix}-0` : `${prefix}-${token}`])
    ) as Record<SpacingToken, string>,
  ])
) as Record<Prefix, Record<SpacingToken, string>>;

export function useSpacing(props: SpacingProps) {
  const spacingClasses = computed(() =>
    cn(
      // Padding
      props.p  && maps.p[props.p],
      props.pt && maps.pt[props.pt],
      props.pb && maps.pb[props.pb],
      props.pl && maps.pl[props.pl],
      props.pr && maps.pr[props.pr],
      props.px && maps.px[props.px],
      props.py && maps.py[props.py],

      // Margin
      props.m  && maps.m[props.m],
      props.mt && maps.mt[props.mt],
      props.mb && maps.mb[props.mb],
      props.ml && maps.ml[props.ml],
      props.mr && maps.mr[props.mr],
      props.mx && maps.mx[props.mx],
      props.my && maps.my[props.my],

      // Gap
      props.gap && maps.gap[props.gap],
    )
  );

  return { spacingClasses };
}