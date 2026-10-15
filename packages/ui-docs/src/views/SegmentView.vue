<script setup lang="ts">
import { Container, Divider, Section, Segment, SegmentItem, Typo } from '@ui/vue';
import { ref } from 'vue';

// pub data
const segmentSelect = ref('select1');
const segmentOptions = [
  { label: 'Segment1', value: 'select1' },
  { label: 'Segment2', value: 'select2' },
  { label: 'Segment3', value: 'select3' },
];


// 기본형
const period = ref('week');
// animated
const action = ref('option1');
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Segment</Typo>

      <!-- Segment data -->
      <Segment v-model="segmentSelect" aria-label="세그먼트">
        <SegmentItem
          v-for="opt in segmentOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </SegmentItem>
      </Segment>

      <Divider type="thin" my="10" />

      <!-- 기본형 -->
      <Segment v-model="period" aria-label="조회 기간">
        <SegmentItem value="day">일간</SegmentItem>
        <SegmentItem value="week">주간</SegmentItem>
        <SegmentItem value="month">월간</SegmentItem>
      </Segment>

      <Divider type="thin" my="10" />

      <!-- 애니메이션 indicator -->
      <Segment v-model="action" animated aria-label="거래 유형">
        <SegmentItem value="option1">발급</SegmentItem>
        <SegmentItem value="option2">충전</SegmentItem>
        <SegmentItem value="option3">환불</SegmentItem>
      </Segment>
    </Section>
  </Container>
</template>