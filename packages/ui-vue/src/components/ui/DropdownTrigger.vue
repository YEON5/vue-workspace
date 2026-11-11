<script setup lang="ts">
import { computed, inject, type Component, type ComputedRef } from 'vue';

interface Props {
  as?: string | Component;
}

const props = withDefaults(defineProps<Props>(), { as: 'button' });

const triggerProps = inject<ComputedRef<Record<string, unknown>>>('dropdownTriggerProps', computed(() => ({})));
</script>

<template>
  <component
    :is="props.as"
    v-bind="triggerProps"
    :type="props.as === 'button' ? 'button' : undefined"
  >
    <slot />
  </component>
</template>