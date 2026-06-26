<script setup lang="ts">

export type ButtonType = 'fill' | 'outline' | 'transparent' | 'icon' | 'text'
export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' 
export type IconAlign = 'left' | 'right' | 'top'

interface Props {
  variant?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
  iconAlign?: IconAlign | boolean;
  fullSize?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'fill',
  size: 'md',
  color: 'primary',
  IconAlign: false,
  fullSize: false,
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
  >
    <slot />
  </button>
</template>