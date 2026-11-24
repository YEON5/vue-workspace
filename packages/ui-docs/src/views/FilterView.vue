<script setup lang="ts">
import { Container, Divider, Filter, Flex, ICheck, IRefresh, ISearch, ScrollArea, Section, Typo } from '@ui/vue';
import { ref, type Component } from 'vue';

// pub data
interface FilterItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: Component;
  iconAlign?: 'left' | 'right';
}
const filterData = ref<FilterItem[]>([
  { label: 'Filter11', value: 'Filter11' },
  { label: 'Filter21', value: 'Filter21' },
  { label: 'Filter31', value: 'Filter31' },
  { label: 'Filter41', value: 'Filter41' },
  { label: 'Filter51', value: 'Filter51', disabled: true },
  { label: 'Filter61', value: 'Filter61', icon: IRefresh, iconAlign: 'right' },
]);
const selectedFilter = ref<string[]>(['Filter11']);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-lg" pb="15">Filter</Typo>

      <!-- filter data -->
      <ScrollArea
        bleed="right"
        class="gap-7"
      >
        <Filter
          v-for="filter in filterData"
          :key="filter.value"
          v-model="selectedFilter"
          :value="filter.value"
          :disabled="filter.disabled"
          :icon-align="filter.iconAlign"
        >
          <template v-if="filter.icon" #icon>
            <component :is="filter.icon" class="size-[16px] ml-3" />
          </template>
          {{ filter.label }}
        </Filter>
      </ScrollArea>

      <!-- <Flex gap="7">
        <Filter
          v-for="filter in filterData"
          :key="filter.value"
          v-model="selectedFilter"
          :value="filter.value"
          :disabled="filter.disabled"
          :icon-align="filter.iconAlign"
        >
          <template v-if="filter.icon" #icon>
            <component :is="filter.icon" class="size-[16px] ml-3" />
          </template>
          {{ filter.label }}
        </Filter>
      </Flex> -->

      <Divider type="thin" my="17" />

      <Flex gap="7">
        <Filter v-model="selectedFilter" value="Filter1">Filter1</Filter>
        <Filter v-model="selectedFilter" value="Filter2">Filter2</Filter>
        <Filter v-model="selectedFilter" value="Filter3">
          <template #icon><ISearch class="size-9 mr-3" /></template>
          Filter3
        </Filter>
        <Filter v-model="selectedFilter" value="Filter4" icon-align="right" disabled>
          Filter4
          <template #icon><ICheck class="size-11" /></template>
        </Filter>
      </Flex>
    </Section>
  </Container>
</template>