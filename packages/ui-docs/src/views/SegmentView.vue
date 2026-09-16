<script setup lang="ts">
import { Container, Divider, Section, Segment, SegmentItem, Typo } from '@ui/vue';
import { ref } from 'vue';

const period = ref('week');
const periodA = ref('day');
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Segment</Typo>

      <Segment name="period1">
        <SegmentItem v-model="period" value="day">일간</SegmentItem>
        <SegmentItem v-model="period" value="week">주간</SegmentItem>
        <SegmentItem v-model="period" value="month">월간</SegmentItem>
      </Segment>

      <Divider type="thin" my="10" />
      
      <!-- 애니메이션 indicator -->
      <Segment name="period2" animated :model-value="periodA">
        <SegmentItem v-model="periodA" value="day">일간</SegmentItem>
        <SegmentItem v-model="periodA" value="week">주간</SegmentItem>
        <SegmentItem v-model="periodA" value="month">월간</SegmentItem>
      </Segment>
    </Section>
  </Container>
</template>