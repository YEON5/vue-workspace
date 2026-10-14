<script setup lang="ts">
import { bgColorMap, borderColorMap, colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, ref, type ComputedRef, type Ref } from 'vue';

interface Props {
  label?: string;
  value: unknown;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// 부모 Tabs / TabList가 내려준 상태값
const baseId = inject<string>('tabBaseId', '');
const tabModel = inject<Ref<unknown>>('tabModel', ref());
const variant = inject<ComputedRef<'line' | 'pill'>>('tabVariant', computed(() => 'line'));
const isAnimated = inject<ComputedRef<boolean>>('tabAnimated', computed(() => false));
const isFull = inject<ComputedRef<boolean>>('tabFull', computed(() => true));

const isSelected = computed(() => tabModel.value === props.value);

// 접근성 연결용 ID (Tab <-> TabPanel 매핑)
const tabId = computed(() => `${baseId}-tab-${String(props.value)}`);
const panelId = computed(() => `${baseId}-panel-${String(props.value)}`);

function handleClick() {
  if (props.disabled) return;
  tabModel.value = props.value;
}

const tabClasses = computed(() => {
  const isPill = variant.value === 'pill';

  return cn(
    // z-[1]: pill의 슬라이딩 배경(z-0) 위에 글자가 보이도록
    'relative z-[1] inline-flex items-center justify-center transition-colors cursor-pointer select-none',
    !isPill && (isFull.value ? 'flex-1' : 'shrink-0'),
    !isPill && TypoMap['body-m'],

    // line
    !isPill && 'h-[48px] px-4',
    !isPill && (isSelected.value ? [colorMap['primary'], 'font-bold'] : colorMap['secondary']),
    // animated가 아닐 때 탭 자체의 하단 보더 처리
    !isPill && !isAnimated.value && [
      'border-b-2',
      isSelected.value ? borderColorMap['primary'] : 'border-transparent'
    ],

    // pill
    isPill && ['h-[34px] flex-none px-5 rounded-full border', TypoMap['body-s']],
    isPill && !isSelected.value && ['border-gray-300 bg-white', colorMap['secondary']],
    // animated면 배경은 TabList의 indicator가 담당, 아니면 탭 자체가 채워짐
    isPill && isSelected.value && 'text-white',
    isPill && isSelected.value && (isAnimated.value
      ? 'border-transparent'
      : [bgColorMap['primary'], borderColorMap['primary']]),

    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    props.class,
  );
});
</script>

<template>
  <button
    :id="tabId"
    type="button"
    role="tab"
    :aria-selected="isSelected"
    :aria-controls="isSelected ? panelId : undefined"
    :tabindex="isSelected ? 0 : -1"
    :disabled="disabled"
    :class="tabClasses"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>