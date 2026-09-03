<script setup lang="ts">
import { useCheckable } from '#/composables/useCheckable';
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  checked?: boolean;
  disabled?: boolean;
  showText?: boolean; // 트랙 안에 ON/OFF 문구 노출 여부
  onText?: string;
  offText?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  showText: false,
  onText: 'ON',
  offText: 'OFF',
});

const modelValue = defineModel<unknown>();
const { internalId, isChecked } = useCheckable(props, modelValue);

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-center gap-3',
    props.disabled && 'opacity-50',
    props.class,
  )
);

const trackClasses = computed(() =>
  cn('switch-track', props.showText && 'switch-track--text')
);

const textClasses = computed(() =>
  cn(TypoMap['label-m'], colorMap['secondary'])
);
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <span class="relative inline-flex shrink-0">
      <input
        :id="internalId"
        v-model="modelValue"
        type="checkbox"
        role="switch"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        class="switch-input"
      >
      <span :class="trackClasses">
        <span v-if="showText" class="switch-text switch-text--on">{{ onText }}</span>
        <span v-if="showText" class="switch-text switch-text--off">{{ offText }}</span>
        <span class="switch-thumb" />
      </span>
    </span>
    <span v-if="label || $slots.default" :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped lang="scss">
.switch-input {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  appearance: none;
  cursor: pointer;
}

.switch-track {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  border-radius: 9999px;
  background-color: var(--gray-300);
  line-height: 26px;
  transition: background-color 0.2s ease;
}

// 텍스트 노출 모드 - 트랙 너비를 넓혀 ON/OFF 문구 공간 확보
.switch-track--text {
  width: 52px;
}

.switch-text {
  position: absolute;
  top: 50%;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  transition: opacity 0.2s ease;
  transform: translateY(-50%);
}

.switch-text--on {
  left: 8px;
  opacity: 0; // 꺼진 상태에서는 숨김
}

.switch-text--off {
  right: 6px;
  color: var(--gray-800);
  opacity: 1; // 꺼진 상태에서 노출
}

.switch-thumb {
  display: block;
  width: 20px;
  height: 20px;
  margin: 3px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.switch-input:checked + .switch-track {
  background-color: var(--mint-500);
}

.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(18px);
}

.switch-input:checked + .switch-track--text .switch-thumb {
  transform: translateX(26px); // 넓어진 트랙에 맞춰 이동 거리 조정
}

.switch-input:checked + .switch-track .switch-text--on {
  opacity: 1;
}

.switch-input:checked + .switch-track .switch-text--off {
  opacity: 0;
}

.switch-input:disabled + .switch-track {
  background-color: var(--gray-200);
}

.switch-input:disabled:checked + .switch-track {
  background-color: var(--mint-300);
}
</style>