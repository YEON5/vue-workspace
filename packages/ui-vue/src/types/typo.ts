// src/types/typo.ts
import type { ColorToken } from './color';

export type TypoToken =
  | 'display'
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'body-l'
  | 'body-m'
  | 'body-s'
  | 'label-l'
  | 'label-m'
  | 'label-s'
  | 'label-xs'
  | 'caption-1'
  | 'caption-2';

export type TypoAlign =
  | 'left'
  | 'center'
  | 'right';

// 크기 + 굵기 + line-height + letter-spacing
export const TypoMap: Record<TypoToken, string> = {
  'display': 'text-4xl font-bold tracking-[-0.1px]',
  'heading-xl': 'text-3xl font-bold tracking-[-0.1px]',
  'heading-l': 'text-2xl font-bold tracking-[-0.2px]',
  'heading-m': 'text-xl font-bold tracking-[-0.2px]',
  'heading-s': 'text-lg font-bold tracking-[-0.2px]',
  'body-l':    'text-lg font-medium tracking-[-0.2px]',
  'body-m':    'text-md font-normal tracking-[-0.2px]',
  'body-s':    'text-sm font-normal tracking-[-0.2px]',
  'label-l':   'text-lg font-medium tracking-[-0.2px]',
  'label-m':   'text-md font-normal tracking-[-0.2px]',
  'label-s':   'text-sm font-normal tracking-[-0.2px]',
  'label-xs':  'text-xs font-normal tracking-[-0.2px]',
  'caption-1': 'text-xs font-normal tracking-[-0.2px]',
  'caption-2': 'text-xxs font-normal tracking-[-0.2px]',
};

// 정렬
export const textAlignMap: Record<TypoAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

// ColorToken을 re-export해서 Typo.vue에서 #/types/typo만 import해도 됨
export type { ColorToken };

