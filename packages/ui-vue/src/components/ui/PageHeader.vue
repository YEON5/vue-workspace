<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';
import Typo from './Typo.vue';
 
interface Props extends SpacingProps {
  title?: string;
  description?: string;
  titleClass?: string;
  descriptionClass?: string;
  class?: string;
}
 
const props = defineProps<Props>();
 
const { spacingClasses } = useSpacing(props);
 
const wrapperClasses = computed(() =>
  cn(
    'flex flex-col gap-3',
    spacingClasses.value,
    props.class,
  )
);
 
const titleClasses = computed(() =>
  cn(
    'text-2xl font-bold text-foreground',
    props.titleClass,
  )
);
 
const descriptionClasses = computed(() =>
  cn(
    'text-md text-muted-foreground',
    props.descriptionClass,
  )
);
</script>

<template>
  <div :class="wrapperClasses">
    <Typo as="h2" variant="heading-l" :class="titleClasses">
      <slot name="title">
        <span v-html="title" />
      </slot>
    </Typo>
 
    <template v-if="description || $slots.description">
      <Typo as="p" variant="body-m" color="caption" :class="descriptionClasses">
        <slot name="description">
          <span v-html="description" />
        </slot>
      </Typo>
    </template>
  </div>
</template>


<!-- 
const classes = computed(() =>
  cn(
    'ui-section relative w-full',
    props.class,
  )
)
</script>

<template>
  <div 
    class="flex flex-col"
    :class="[
      spacingClass,
      props.class
    ]"
  >
    <h2 class="text-2xl font-bold">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p class="text-sm text-muted-foreground">
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template> -->