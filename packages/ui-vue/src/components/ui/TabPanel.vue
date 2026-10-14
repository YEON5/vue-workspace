<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { cn } from '#/utils/cn';
import { computed, inject, ref, type Ref } from 'vue';

interface Props extends SpacingProps {
  value: unknown;
  class?: string;
}

const props = defineProps<Props>();

const baseId = inject<string>('tabBaseId', '');
const tabModel = inject<Ref<unknown>>('tabModel', ref());

const { spacingClasses } = useSpacing(props);

const isSelected = computed(() => tabModel.value === props.value);

const tabId = computed(() => `${baseId}-tab-${String(props.value)}`);
const panelId = computed(() => `${baseId}-panel-${String(props.value)}`);

const panelClasses = computed(() =>
  cn(
    'w-full pt-6 focus:outline-none focus-visible:outline',
    spacingClasses.value,
    props.class
  )
);
</script>

<template>
  <div
    v-if="isSelected"
    :id="panelId"
    role="tabpanel"
    :aria-labelledby="tabId"
    tabindex="0"
    :class="panelClasses"
  >
    <slot />
  </div>
</template>