<script setup lang="ts">
import { Container, Divider, IconButton, IMy, Section, Tooltip, TooltipContent, TooltipTrigger, Typo } from '@ui/vue';

</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Tooltip</Typo>

      <!-- 아이콘 버튼: 이름은 aria-label, 보충 설명은 tooltip -->
      <Tooltip placement="top-start">
        <TooltipTrigger :as="IconButton" aria-label="툴팁 내용">
          <IMy class="size-[32px]" />
        </TooltipTrigger>
        <TooltipContent arrow class="max-w-[150px]">1회 이체 한도는 최대 1천만원입니다.</TooltipContent>
      </Tooltip>

      <Divider class="h-0" my="10" />

      <!-- 일반 텍스트: tabindex가 자동으로 붙음 -->
      <Tooltip placement="right">
        <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
        <TooltipContent class="max-w-[200px]">보충 설명이 들어가는 영역입니다.</TooltipContent>
      </Tooltip>
    </Section>
  </Container>
</template>