// src/composables/useRadius.ts
import { radiusMap, type RadiusToken } from '@/types/radius';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export interface RadiusProps {
  rounded?: RadiusToken;
}

export type { RadiusToken };

export function useRadius(props: RadiusProps) {
  const radiusClasses = computed(() =>
    cn(props.rounded && radiusMap[props.rounded])
  );

  return { radiusClasses };
}