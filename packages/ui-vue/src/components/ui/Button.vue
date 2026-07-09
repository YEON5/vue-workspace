<script setup lang="ts">
import { useFontSize, type FontSizeProps } from '@/composables/useFontSize';
import { useRadius, type RadiusProps } from '@/composables/useRadius';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type ButtonVariant = 'fill' | 'outline' | 'transparent' | 'icon';
// cta(Call To Action)는 하단 고정형 버튼을 의미합니다.
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'cta';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary';
export type IconAlign = 'left' | 'right' | 'top';

interface Props extends FontSizeProps, SpacingProps, RadiusProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  iconAlign?: IconAlign | boolean;
  full?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'fill',
  size: 'md',
  color: 'primary',
  iconAlign: 'left',
  full: false,
  disabled: false,
});

const { spacingClasses } = useSpacing(props);
const { radiusClasses } = useRadius(props);
const { fontSizeClasses } = useFontSize(props);

// 📏 1. 사이즈 매핑 (높이, 패딩, 기본 폰트 사이즈)
const sizeMap: Record<ButtonSize, string> = {
  xs: 'h-6 px-2 text-xs',
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-md',
  lg: 'h-12 px-6 text-lg',
  cta: 'flex-1 h-[60px] text-lg rounded-xl',
};

// 🎨 2. 스타일 매핑 (Variant와 Color의 2차원 조합)
// ※ 실제 pds-style에 정의된 색상 토큰(예: mint, gray)에 맞춰 수정해주세요.
const styleMap: Record<ButtonVariant, Record<ButtonColor, string>> = {
  fill: {
    primary: 'bg-mint-500 text-white hover:bg-mint-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    tertiary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  },
  outline: {
    primary: 'border border-mint-500 text-mint-500 bg-white hover:bg-mint-50',
    secondary: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50',
    tertiary: 'border border-gray-200 text-gray-500 bg-white hover:bg-gray-50',
  },
  transparent: {
    primary: 'text-mint-500 bg-transparent hover:bg-mint-50',
    secondary: 'text-gray-900 bg-transparent hover:bg-gray-100',
    tertiary: 'text-gray-500 bg-transparent hover:bg-gray-50',
  },
  icon: { // icon 타입일 때는 보통 패딩을 줄이고 정사각형(size-N) 형태를 만듭니다.
    primary: 'bg-mint-500 text-white hover:bg-mint-600 p-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 p-2',
    tertiary: 'bg-transparent text-gray-500 hover:bg-gray-100 p-2',
  }
};

// 🧠 3. 클래스 최종 병합
const classes = computed(() =>
  cn(
    // 공통
    'inline-flex items-center justify-center font-medium transition-colors shrink-0',
    // Disabled 상태
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    
    // 매핑된 스타일 주입
    sizeMap[props.size],
    styleMap[props.variant][props.color],
    
    // 조건부 유틸리티
    props.full && props.size !== 'cta' && 'w-full', // cta는 이미 w-full 포함
    
    // 시스템 토큰 (우선순위 부여)
    // 💡 사용자가 radius 나 text 프롭스를 명시적으로 넘기면 그걸 최우선으로 적용합니다.
    fontSizeClasses.value,
    spacingClasses.value,
    props.size !== 'cta' && (radiusClasses.value || 'rounded-md'), // cta가 아닐 때만 둥근 모서리

    props.class,
  )
);

// 이벤트 처리 (emit 최적화)
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();
const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit('click', e);
};
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>