// src/composables/useSpacing.ts
import { spacingMap, type SpacingToken } from '@/types/spacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export interface SpacingProps {
  p?: SpacingToken; pt?: SpacingToken; pb?: SpacingToken; pl?: SpacingToken; pr?: SpacingToken; px?: SpacingToken; py?: SpacingToken;
  m?: SpacingToken; mt?: SpacingToken; mb?: SpacingToken; ml?: SpacingToken; mr?: SpacingToken; mx?: SpacingToken; my?: SpacingToken;
  gap?: SpacingToken;
}

export type { SpacingToken };

export function useSpacing(props: SpacingProps) {
  const spacingClasses = computed(() =>
    cn(
      // Padding
      props.p  && spacingMap.p[props.p],
      props.pt && spacingMap.pt[props.pt],
      props.pb && spacingMap.pb[props.pb],
      props.pl && spacingMap.pl[props.pl],
      props.pr && spacingMap.pr[props.pr],
      props.px && spacingMap.px[props.px],
      props.py && spacingMap.py[props.py],

      // Margin
      props.m  && spacingMap.m[props.m],
      props.mt && spacingMap.mt[props.mt],
      props.mb && spacingMap.mb[props.mb],
      props.ml && spacingMap.ml[props.ml],
      props.mr && spacingMap.mr[props.mr],
      props.mx && spacingMap.mx[props.mx],
      props.my && spacingMap.my[props.my],

      // Gap
      props.gap && spacingMap.gap[props.gap],
    )
  );

  return { spacingClasses };
}