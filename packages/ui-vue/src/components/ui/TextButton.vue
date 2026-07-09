<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'cta'
export type IconAlign = 'left' | 'right' | 'top'

interface Props extends SpacingProps {
  textSize?: ButtonSize;
  textColor?: string;
  icon?: IconAlign;
  disabled?: boolean;
  class?: string;
}
const props = withDefaults(defineProps<Props>(), {
  textSize: 'md',
  textColor: 'primary',
  IconAlign: 'left',
  disabled: false,
})

const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    'flex items-center',
    props.textColor,
    spacingClasses.value,
    props.class,
  )
)

const emit = defineEmits(['click'])

const handleControl = () => {
  emit('click')
  console.log('click')
}
</script>

<template>
  <button
    :class="classes"
    @click="handleControl"
  >
    <slot />
  </button>
</template>