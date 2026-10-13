<script setup lang="ts">
import { useRadioable } from '#/composables/useRadioable';
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, type ComputedRef, type Ref } from 'vue';

export type RadioVariant = 'basic' | 'box';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  name?: string;
  variant?: RadioVariant;
  checked?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'basic',
  checked: false,
  disabled: false,
});

// 단독 사용 시 자체 v-model
const ownModel = defineModel<unknown>();

// RadioGroup 안이면 그룹의 값/이름 사용
const groupModel = inject<Ref<unknown> | null>('radioGroupModel', null);
const groupName = inject<ComputedRef<string> | null>('radioGroupName', null);

const currentModel = computed({
  get: () => (groupModel ? groupModel.value : ownModel.value),
  set: (v) => {
    if (groupModel) groupModel.value = v;
    else ownModel.value = v;
  },
});

const inputName = computed(() => props.name ?? groupName?.value);

const { internalId, isChecked } = useRadioable(props, currentModel);

function handleChange() {
  if (props.disabled) return;
  currentModel.value = props.value;
}

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-center gap-3',
    props.variant !== 'box' && 'self-start',
    props.disabled && 'opacity-50 select-none',
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
      type="radio"
      :name="inputName"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :class="inputClasses"
      @change="handleChange"
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