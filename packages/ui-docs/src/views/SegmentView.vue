<script setup lang="ts">
import { Container, Divider, Section, Segment, SegmentItem, Typo } from '@ui/vue';
import { ref } from 'vue';

const period = ref('week');
const selectA = ref('option1');

const SegmentSelect = ref('select1');
const SegmentOptions = [
  { label: 'Segment1', value: 'select1' },
  { label: 'Segment2', value: 'select2' },
  { label: 'Segment3', value: 'select3' },
];
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Segment</Typo>

      <!--  segment data -->
      <Segment name="periodData">
        <SegmentItem 
          v-for="opt in SegmentOptions" 
          :key="opt.value" 
          v-model="SegmentSelect" 
          :value="opt.value"
        >
          {{ opt.label }}
        </SegmentItem>
      </Segment>

      <Divider type="thin" my="10" />

      <Segment name="period1">
        <SegmentItem v-model="period" value="day">일간</SegmentItem>
        <SegmentItem v-model="period" value="week">주간</SegmentItem>
        <SegmentItem v-model="period" value="month">월간</SegmentItem>
      </Segment>

      <Divider type="thin" my="10" />
      
      <!-- 애니메이션 indicator -->
      <Segment name="selectA" animated :model-value="selectA">
        <SegmentItem v-model="selectA" value="option1">발급</SegmentItem>
        <SegmentItem v-model="selectA" value="option2">충전</SegmentItem>
        <SegmentItem v-model="selectA" value="option3">환불</SegmentItem>
      </Segment>
    </Section>
  </Container>
</template>