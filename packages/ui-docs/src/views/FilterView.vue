<script setup lang="ts">
import { Container, Divider, Filter, Flex, ICheck, IRefresh, ISearch, Section, Typo } from '@ui/vue';
import { ref, type Component } from 'vue';

const selectedFilter = ref<string[]>([]);

interface FilterItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: Component;
  iconAlign?: 'left' | 'right';
}
const filterList = ref<FilterItem[]>([
  { label: 'Filter11', value: 'Filter11' },
  { label: 'Filter21', value: 'Filter21' },
  { label: 'Filter31', value: 'Filter31', disabled: true },
  { label: 'Filter41', value: 'Filter41', icon: IRefresh, iconAlign: 'right' },
]);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Filter</Typo>
      
      <Flex gap="4">
        <Filter v-model="selectedFilter" value="Filter1">Filter1</Filter>
        <Filter v-model="selectedFilter" value="Filter2">Filter2</Filter>
        <Filter v-model="selectedFilter" value="Filter3">
          <template #icon><ISearch class="size-5 mr-2" /></template>
          Filter3
        </Filter>
        <Filter v-model="selectedFilter" value="Filter4" icon-align="right" disabled>
          Filter4
          <template #icon><ICheck class="size-7" /></template>
        </Filter>
      </Flex>

      <Divider type="thin" my="10" />

      <Flex gap="4">
        <Filter
          v-for="filter in filterList"
          :key="filter.value"
          v-model="selectedFilter"
          :value="filter.value"
          :disabled="filter.disabled"
          :icon-align="filter.iconAlign"
        >
          <template v-if="filter.icon" #icon>
            <component :is="filter.icon" class="size-[16px] ml-2" />
          </template>
          {{ filter.label }}
        </Filter>
      </Flex>
    </Section>
  </Container>
</template>