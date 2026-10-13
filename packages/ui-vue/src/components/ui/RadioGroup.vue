<script setup lang="ts">
import { Flex } from '#components';
import { computed, provide, useId } from 'vue';

interface Props {
  name?: string; // 안 넘기면 자동 생성
  ariaLabel?: string;
}

const props = defineProps<Props>();

const modelValue = defineModel<unknown>();

const autoName = useId();
provide('radioGroupName', computed(() => props.name ?? autoName));
provide('radioGroupModel', modelValue);
</script>

<template>
  <!-- direction, gap, wrap, class는 attrs로 Flex에 그대로 전달 -->
  <Flex role="radiogroup" :aria-label="ariaLabel">
    <slot />
  </Flex>
</template>