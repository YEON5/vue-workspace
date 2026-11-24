<script setup lang="ts">
import { TypoMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props {
  forId?: string; // input의 id와 연결
  required?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
});

const classes = computed(() =>
  cn(
    'relative inline-flex items-center',
    TypoMap['label-md'],
    props.disabled ? colorMap['disabled'] : colorMap['secondary'],
    props.class
  )
);
</script>

<template>
  <label :for="forId" :class="classes">
    <slot />
    <span v-if="required" class="inline-flex absolute top-[3px] -right-[8px] w-[4px] h-[4px] ml-[2px] rounded-full element-danger" />
    <!-- <span v-if="required" class="text-body-lg text-danger ml-[2px]">*</span> -->
  </label>
</template>