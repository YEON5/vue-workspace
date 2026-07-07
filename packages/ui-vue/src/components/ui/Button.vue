<script setup lang="ts">

export type ButtonType = 'fill' | 'outline' | 'transparent' | 'icon'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'cta'
export type ButtonColor = 'primary' | 'secondary' | 'tertiary'
export type IconAlign = 'left' | 'right' | 'top'

interface Props {
  variant?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
  textSize?: string;
  textColor?: string;
  iconAlign?: IconAlign | boolean;
  full?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'fill',
  size: 'md',
  color: 'primary',
  textSize: '',
  textColor: '',
  IconAlign: 'left',
  full: false,
  disabled: false,
})

const emit = defineEmits(['click', 'update'])

const handleControl = () => {
  emit('click')
  console.log('click')
}
const handleSubmit = () => {
  emit('update')
  console.log('update')
}
</script>

<template>
  <button
    :class="computedClass"
    @click="handleControl"
  >
    <slot />
  </button>
</template>