// src/composables/useFontSize.ts
import { fontSizeMap, type FontSizeToken } from '#/types/fontSize';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

export interface FontSizeProps {
  text?: FontSizeToken;
}

export type { FontSizeToken };

export function useFontSize(props: FontSizeProps) {
  const fontSizeClasses = computed(() =>
    cn(props.text && fontSizeMap[props.text])
  );

  return { fontSizeClasses };
}