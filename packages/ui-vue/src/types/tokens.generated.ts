// Auto-generated from @ui/style design-tokens.json — do not edit manually
// Run: npm run tokens -w @ui/style
// PREFIX(@ui/style tokens-config.js)는 CSS 변수에만 붙고 클래스 이름에는 붙지 않습니다.

// spacing: p-*, m-*, gap-* … (primitive number, 값 = 기본 화면)
export const SPACING_SCALE = {
  '0':  '0px',
  '1':  '1px',
  '2':  '2px',
  '3':  '4px',
  '4':  '6px',
  '5':  '8px',
  '6':  '10px',
  '7':  '12px',
  '8':  '14px',
  '9':  '16px',
  '10': '20px',
  '11': '24px',
  '12': '28px',
  '13': '32px',
  '14': '36px',
  '15': '40px',
  '16': '44px',
  '17': '48px',
  '18': '56px',
  '19': '64px',
  '20': '72px',
  '21': '80px',
  '22': '96px',
} as const;

// radius: rounded-*
export const RADIUS_SCALE = {
  'min': '4px',
  'xs':  '6px',
  'sm':  '8px',
  'md':  '10px',
  'lg':  '12px',
  'xl':  '14px',
  'max': '16px',
} as const;

// font-size: text-* / weight = typo 굵기 (tokens.rules.json typography, 없으면 typo variant 아님)
export const FONT_SIZE_SCALE = {
  'display-lg':               { size: '44px', weight: 'bold' },
  'display-md':               { size: '32px', weight: 'bold' },
  'display-sm':               { size: '28px', weight: 'bold' },
  'heading-xl':               { size: '28px', weight: 'bold' },
  'heading-lg':               { size: '24px', weight: 'bold' },
  'heading-md':               { size: '20px', weight: 'bold' },
  'heading-sm':               { size: '18px', weight: 'bold' },
  'heading-xs':               { size: '16px', weight: 'bold' },
  'heading-2xs':              { size: '14px', weight: 'bold' },
  'body-lg':                  { size: '18px', weight: 'medium' },
  'body-md':                  { size: '16px', weight: 'regular' },
  'body-sm':                  { size: '15px', weight: 'regular' },
  'body-xs':                  { size: '13px', weight: 'regular' },
  'label-lg':                 { size: '18px', weight: 'medium' },
  'label-md':                 { size: '16px', weight: 'regular' },
  'label-sm':                 { size: '15px', weight: 'regular' },
  'label-xs':                 { size: '13px', weight: 'regular' },
  'navigation-title-md':      { size: '22px' },
  'navigation-title-sm':      { size: '18px' },
  'navigation-depth-md-bold': { size: '16px' },
  'navigation-depth-md':      { size: '16px' },
  'navigation-depth-sm':      { size: '14px' },
  'navigation-depth-sm-bold': { size: '14px' },
} as const;

// font-weight: font-*
export const FONT_WEIGHT_SCALE = {
  'regular': 400,
  'medium':  500,
  'bold':    600,
} as const;

// 화면 너비별로 바뀌는 값 (그 너비에서 실제로 보이는 값 중 기본값과 다른 것)
export const RESPONSIVE = {
  '≥1280px': {
    fontSize: {
      'display-lg':          '60px',
      'display-md':          '44px',
      'display-sm':          '36px',
      'heading-xl':          '40px',
      'heading-lg':          '32px',
      'heading-md':          '24px',
      'heading-sm':          '20px',
      'heading-xs':          '18px',
      'heading-2xs':         '16px',
      'navigation-title-md': '24px',
    },
    fontWeight: {
      'medium': 600,
      'bold':   700,
    },
  },
} as const;

// semantic 색상 클래스 (utils/cn.ts에서 tailwind-merge 충돌 그룹 등록용)
export const BACKGROUND_COLOR_CLASSES = ["background-default","background-subtler","background-subtle","background-inverse","background-dimmed","surface-elevated-01","surface-elevated-02","surface-elevated-03","surface-white-static","surface-white-alpha","surface-inverse","surface-inverse-static","surface-disabled","surface-dimmed","surface-neutral-subtler","surface-neutral-subtle","surface-primary-subtler","surface-secondary-subtler","surface-terairy-subtler","surface-danger-subtler","surface-warning-subtler","surface-success-subtler","surface-info-subtler","action-default","action-transparency","action-disabled","action-primary-on","action-primary-on-hover","action-primary-hover","action-primary-pressed","action-primary-selected","action-primary-active","action-primary-active-subtle","action-neutral-hover","action-neutral-pressed","action-neutral-selected","action-neutral-active","action-neutral-on","action-neutral-on-hover","action-neutral-on-dark","element-neutral-lighter","element-neutral-light","element-neutral","element-neutral-dark","element-neutral-darker","element-white","element-black","element-white-static","element-black-static","element-disabled","element-disabled-on","element-primary","element-primary-light","element-primary-lighter","element-secondary","element-secondary-light","element-secondary-lighter","element-point","element-point-light","element-point-lighter","element-danger","element-danger-lighter","element-warning","element-warning-lighter","element-success","element-success-lighter","element-information","element-information-lighter","button-primary-fill","button-primary-fill-hover","button-primary-fill-pressed","button-secondary-fill","button-secondary-fill-hover","button-secondary-fill-pressed","button-tertiary-fill","button-tertiary-fill-hover","button-tertiary-fill-pressed","button-text-fill","button-text-fill-hover","button-text-fill-pressed","button-disabled-fill","button-disabled-dimed","input-surface","input-surface-gray","input-surface-disabled"] as const;
export const BORDER_COLOR_CLASSES = ["border-neutral-light","border-neutral","border-neutral-dark","border-neutral-darker","border-transparency","border-inverse","border-disabled","border-disabled-on","border-primary-light","border-primary","border-secondary-light","border-secondary","border-terairy-light","border-terairy","border-danger-light","border-danger","border-warning-light","border-warning","border-success-light","border-success","border-info-light","border-info","divider-neutral-light","divider-neutral","divider-neutral-dark","divider-neutral-darker","divider-inverse","divider-primary-light","divider-primary","divider-secondary-light","divider-secondary","divider-error","divider-point","border-element-neutral-lighter","border-element-neutral-light","border-element-neutral","border-element-neutral-dark","border-element-neutral-darker","border-element-white","border-element-black","border-element-white-static","border-element-black-static","border-element-disabled","border-element-disabled-on","border-element-primary","border-element-primary-light","border-element-primary-lighter","border-element-secondary","border-element-secondary-light","border-element-secondary-lighter","border-element-point","border-element-point-light","border-element-point-lighter","border-element-danger","border-element-danger-lighter","border-element-warning","border-element-warning-lighter","border-element-success","border-element-success-lighter","border-element-information","border-element-information-lighter","button-secondary-border","button-tertiary-border","button-text-border","button-disabled-border","input-border","input-border-active","input-border-error","input-border-disabled"] as const;
export const TEXT_COLOR_CLASSES = ["text-bolder","text-basic","text-subtle","text-subtler","text-static","text-disabled","text-disabled-on","text-bolder-inverse","text-basic-inverse","text-subtle-inverse","text-inverse-static","text-primary","text-secondary","text-point","text-danger","text-warning","text-success","text-information","text-element-neutral-lighter","text-element-neutral-light","text-element-neutral","text-element-neutral-dark","text-element-neutral-darker","text-element-white","text-element-black","text-element-white-static","text-element-black-static","text-element-disabled","text-element-disabled-on","text-element-primary","text-element-primary-light","text-element-primary-lighter","text-element-secondary","text-element-secondary-light","text-element-secondary-lighter","text-element-point","text-element-point-light","text-element-point-lighter","text-element-danger","text-element-danger-lighter","text-element-warning","text-element-warning-lighter","text-element-success","text-element-success-lighter","text-element-information","text-element-information-lighter","icon-gray","icon-gray-light","icon-gray-fill","icon-inverse","icon-disabled","icon-disabled-on","icon-primary","icon-secondary","icon-taiery","icon-danger","icon-warning","icon-success","icon-information","icon-inverse-static","icon-gray-static","icon-primary-static","icon-secondary-static","icon-point-static","icon-danger-static","icon-warning-static","icon-success-static","icon-information-static","link-default","link-hover","link-pressed","link-visited"] as const;
