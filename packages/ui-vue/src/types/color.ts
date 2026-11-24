// src/types/color.ts
// 역할(primary, caption …) → 피그마 색상 변수 클래스 매핑
// Button, TextButton, Badge, Tag, Alert, Typo 등 모든 컴포넌트에서 공유
// 클래스 이름 = 피그마 변수: color/text/basic → text-basic, color/border/neutral → border-neutral,
//               color/background/default → background-default, color/element/primary → element-primary
// CSS 속성은 Figma 용도로 정해짐 (채우기→배경, 선→테두리, 텍스트→글자색)
// 값은 디자인 토큰에 있는 클래스만 가능 (tokens.generated.ts) — 토큰에 없으면 타입 오류 → 해당 역할을 ColorToken에서 뺌
import type { BACKGROUND_COLOR_CLASSES, BORDER_COLOR_CLASSES, TEXT_COLOR_CLASSES } from './tokens.generated';

type TextColorClass = (typeof TEXT_COLOR_CLASSES)[number];
type BgColorClass = (typeof BACKGROUND_COLOR_CLASSES)[number];
type BorderColorClass = (typeof BORDER_COLOR_CLASSES)[number];

export type ColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'display'
  | 'heading'
  | 'body'
  | 'caption'
  | 'label'
  | 'disabled'
  | 'white'
  | 'black';

// text color
export const colorMap: Record<ColorToken, TextColorClass> = {
  primary:   'text-primary',
  secondary: 'text-subtle',
  tertiary:  'text-subtler',
  display:   'text-bolder',
  heading:   'text-bolder',
  body:      'text-basic',
  caption:   'text-subtler',
  label:     'text-subtler',
  info:      'text-information',
  error:     'text-danger',
  success:   'text-success',
  warning:   'text-warning',
  disabled:  'text-disabled',
  white:     'text-inverse-static',
  black:     'text-bolder',
};

// background color
// base: 페이지·화면 기본 배경 (다크모드에서 색이 바뀌므로 white가 아닌 용도 이름 사용, style.css body와 동일)
export const bgColorMap: Partial<Record<ColorToken | 'base', BgColorClass>> = {
  base:      'background-default',
  primary:   'element-primary',
  secondary: 'element-neutral-dark',
  tertiary:  'element-neutral',
  info:      'element-information',
  error:     'element-danger',
  success:   'element-success',
  warning:   'element-warning',
  disabled:  'surface-disabled',
  white:     'surface-white-static',
  black:     'element-black-static',
};

// border color
// default: 기본 테두리 (다크모드 대비 용도 이름, style.css 기본 border 색과 동일)
export const borderColorMap: Partial<Record<ColorToken | 'default', BorderColorClass>> = {
  default:   'border-neutral-light',
  primary:   'border-primary',
  secondary: 'border-neutral',
  tertiary:  'border-neutral-light',
  info:      'border-info',
  error:     'border-danger',
  success:   'border-success',
  warning:   'border-warning',
  disabled:  'border-disabled',
  black:     'border-neutral-darker',
};