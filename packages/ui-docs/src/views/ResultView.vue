<script setup lang="ts">
import { BottomSticky, Box, Button, Divider, Flex, ResultView, TextButton, Typo } from '@ui/vue';

// ResultView(완료/실패)
const emit = defineEmits(['click', 'update']);
const handleBannerClick = () => {
  // emit('click');
  console.log('click');
}
</script>

<template>
  <ResultView
    title="완료되었습니다"
    description="처리 결과를 확인해주세요."
  >
    <template #action>
      <Flex align="center" gap="3">
        <TextButton size="md" color="secondary" class="underline">텍스트 버튼</TextButton>
        <Divider direction="vertical" />
        <TextButton size="md" color="secondary" class="underline">텍스트 버튼</TextButton>
      </Flex>
    </template>

    <template #extra>
      <Box class="p-4 bg-muted rounded-lg text-center">
        <Typo variant="body-m">문의사항은 고객센터로 연락주세요.</Typo>
      </Box>
    </template>
    
    <!-- 이미지를 사용하는 베너는 html button 태그 사용 -->
    <template #banner>
      <button
        type="button"
        @click="handleBannerClick"
      >
        <img src="/images/temp-banner.webp">
      </button>
    </template>
  </ResultView>

  <BottomSticky>
    <Button variant="fill" size="cta">확인</Button>
  </BottomSticky>
</template>