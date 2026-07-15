// src/types/typo.ts
import type { ColorToken } from './color';

export type TypoToken =
  | 'display-l'
  | 'display-m'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'body-l'
  | 'body-m'
  | 'body-s'
  | 'label-l'
  | 'label-m'
  | 'label-s'
  | 'caption-1'
  | 'caption-2';

export type TypoAlign =
  | 'left'
  | 'center'
  | 'right';

// 크기 + 굵기 + line-height + letter-spacing
export const TypoMap: Record<TypoToken, string> = {
  'display-l': 'text-4xl font-bold leading-tight tracking-[-0.5px]',
  'display-m': 'text-3xl font-bold leading-tight tracking-[-0.5px]',
  'heading-l': 'text-2xl font-bold leading-snug tracking-[-0.3px]',
  'heading-m': 'text-xl font-bold leading-snug tracking-[-0.3px]',
  'heading-s': 'text-lg font-bold leading-snug tracking-[-0.3px]',
  'body-l':    'text-lg font-medium leading-normal tracking-[-0.24px]',
  'body-m':    'text-md font-normal leading-normal tracking-[-0.24px]',
  'body-s':    'text-sm font-normal leading-normal tracking-[-0.24px]',
  'label-l':   'text-lg font-bold leading-snug tracking-[-0.3px]',
  'label-m':   'text-md font-normal leading-normal tracking-[-0.24px]',
  'label-s':   'text-sm font-normal leading-normal tracking-[-0.24px]',
  'caption-1': 'text-xs font-normal leading-normal tracking-[-0.2px]',
  'caption-2': 'text-xxs font-normal leading-normal tracking-[-0.2px]',
};

// 정렬
export const textAlignMap: Record<TypoAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

// ColorToken을 re-export해서 Typo.vue에서 @/types/typo만 import해도 됨
export type { ColorToken };

