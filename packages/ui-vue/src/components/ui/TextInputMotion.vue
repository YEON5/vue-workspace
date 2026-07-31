<script setup lang="ts">
import { type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap } from '@/types';
import { computed } from 'vue';

export type InputType = 'text' | 'password' | 'tel';

interface Props extends SpacingProps {
  modelValue: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  innerBtn?: string;
  maxLength?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  readonly: false,
  disabled: false,
  required: false,
  innerBtn: '',
  maxLength: 0,
});


const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 px-3 py-1',
    TypoMap['label-m'],
    bgColorMap['white'],
    borderColorMap['secondary'],
    spacingClasses.value,
    props.class,
  )
);
</script>

<template>
  <label>
    {{ label }}
  </label>
  <input 
    v-model="model"
    placeholder=""
    class="border rounded-md px-3 py-2 w-full ..."
  >
</template>