// src/types/color.ts
// 피그마 색상 토큰 기반 공통 색상 타입
// Button, TextButton, Badge, Tag, Alert, Typo 등 모든 컴포넌트에서 공유

export type ColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'display'
  | 'title'
  | 'body'
  | 'caption'
  | 'label'
  | 'disabled'
  | 'white'
  | 'black';

// text color
export const colorMap: Record<ColorToken, string> = {
  primary:   'text-mint-500',
  secondary: 'text-gray-800',
  tertiary:  'text-gray-700',
  display:   'text-gray-900',
  title:     'text-gray-950',
  body:      'text-foreground',
  caption:   'text-gray-500',
  label:     'text-gray-600',
  info:      'text-mint-600',
  error:     'text-destructive',
  success:   'text-blue-500',
  warning:   'text-orange-500',
  disabled:  'text-gray-400',
  white:     'text-white',
  black:     'text-gray-black',
};

// background color
export const bgColorMap: Partial<Record<ColorToken, string>> = {
  primary:   'bg-mint-500',
  secondary: 'bg-gray-600',
  tertiary:  'bg-gray-500',
  info:      'bg-mint-600',
  error:     'bg-destructive',
  success:   'bg-blue-500',
  warning:   'bg-orange-500',
  disabled:  'bg-gray-100',
  white:     'bg-white',
  black:     'bg-gray-black',
};

// border color
export const borderColorMap: Partial<Record<ColorToken, string>> = {
  primary:   'border-mint-500',
  secondary: 'border-gray-600',
  tertiary:  'border-gray-500',
  info:      'border-mint-600',
  error:     'border-destructive',
  success:   'border-blue-500',
  warning:   'border-orange-500',
  disabled:  'border-gray-200',
  black:     'border-gray-black',
};