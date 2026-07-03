<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  title?: string;
  description?: string;
  bottomSpacing?: 'none' | 'sm' | 'md' | 'lg'
  titleClass?: string;
  descriptionClass?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bottomSpacing: 'md',
});
const spacingClass = {
  none: 'pb-0',
  sm: 'pb-6',
  md: 'pb-8',
  lg: 'pb-10'
}[props.bottomSpacing];


const wrapperClasses = computed(() =>
  cn(
    'flex flex-col gap-3',
    spacingClass,         
    props.class           
  )
);
const titleClasses = computed(() =>
  cn(
    'text-2xl font-bold text-foreground',
    props.titleClass                     
  )
);
const descriptionClasses = computed(() =>
  cn(
    'text-md text-muted-foreground',
    props.descriptionClass          
  )
);
</script>

<template>
  <div :class="wrapperClasses">
    <h2 :class="titleClasses">
      <slot name="title">
        <span v-html="title" />
      </slot>
    </h2>
    
    <template v-if="description || $slots.description">
      <p :class="descriptionClasses">
        <slot name="description">
          <span v-html="description" />
        </slot>
      </p>
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