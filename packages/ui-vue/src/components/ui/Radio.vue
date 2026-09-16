<script setup lang="ts">
// 사용 시 주의: 같은 그룹(하나만 선택 가능해야 하는 Radio들)은 반드시 동일한 name을 지정해야 함
// - v-model 없이 checked만 쓸 때: name이 없으면 브라우저가 그룹을 인식 못해 전부 개별 선택됨
// - v-model 사용 시: 시각적 동작은 name 없이도 되지만, 스크린리더가 그룹 정보를 인식하려면 name이 필요함 (접근성)
import { useRadioable } from '#/composables/useRadioable';
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

export type RadioVariant = 'basic' | 'box';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  name?: string;
  variant?: RadioVariant;
  checked?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'basic',
  checked: false,
  disabled: false,
});

const modelValue = defineModel<unknown>();
const { internalId, isChecked } = useRadioable(props, modelValue);

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-center gap-3',
    props.disabled && 'opacity-50 pointer-events-none',
    props.variant === 'box' && 'relative w-full h-[50px] justify-center',
    props.class,
  )
);

const inputClasses = computed(() => cn(`radio radio--${props.variant}`));

const textClasses = computed(() => {
  let colorClass = colorMap['secondary'];

  if (props.disabled) {
    colorClass = colorMap['disabled'];
  } else if (props.variant === 'box' && isChecked.value) {
    colorClass = colorMap['primary'];
  }

  return cn(
    'chk-txt',
    TypoMap['label-m'],
    colorClass,
    props.variant === 'box' && 'relative z-[1] whitespace-nowrap',
  );
});
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <input
      :id="internalId"
      v-model="modelValue"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :class="inputClasses"
    >
    <span v-if="label || $slots.default" :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped lang="scss">
// 기본형(basic)
.radio--basic {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  appearance: none;
  border: 1px solid var(--gray-500);
  border-radius: 9999px;
  background-color: #fff;

  // radio dot
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background-color: var(--gray-300);
    transform: translate(-50%, -50%);
  }

  // checked
  &:checked {
    border-color: var(--mint-500);

    &::after {
      background-color: var(--mint-500);
    }

    // checked & disabled
    &:disabled {
      border-color: var(--mint-300);
      background-color: #fff;

      &::after {
        background-color: var(--mint-300);
      }
    }
  }

  // disabled(unchecked)
  &:disabled:not(:checked) {
    border-color: var(--gray-300);
    background-color: var(--gray-100);

    &::after {
      background-color: var(--gray-200);
    }
  }
}

// 박스형(box)
.radio--box {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  border: 1px solid var(--gray-500);
  border-radius: 8px;
  background-color: #fff;

  &::after {
    display: none; // 박스형은 dot 숨김
  }

  // checked
  &:checked {
    border-color: var(--mint-500);

    + .chk-txt {
      color: var(--mint-500);
    }

    // checked & disabled
    &:disabled {
      border-color: var(--mint-300);

      + .chk-txt {
        color: var(--mint-300);
      }
    }
  }

  &:disabled:not(:checked) {
    border-color: var(--gray-300);
    background-color: var(--gray-100);
  }
}
</style>