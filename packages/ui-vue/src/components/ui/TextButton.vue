<script setup lang="ts">
export type ButtonType = 'fill' | 'outline' | 'transparent' | 'icon'
export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' 
export type IconAlign = 'left' | 'right' | 'top'

interface Props {
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: IconAlign;
  fullSize?: boolean;
  disabled?: boolean;
}

</script>

<template>
  <button>
    <slot />
  </button>
</template>