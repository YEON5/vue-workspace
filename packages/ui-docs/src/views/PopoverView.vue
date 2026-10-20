<script setup lang="ts">
import TextButton from '#/components/ui/TextButton.vue';
import { Box, Button, Container, Divider, Popover, PopoverContent, PopoverTrigger, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Popover</Typo>

      <!-- Button 컴포넌트 안쓴 경우 PopoverTrigger 직접 구현 -->
      <Popover v-model="open1" placement="bottom-start">
        <PopoverTrigger class="rounded-full border border-gray-300 px-5 py-3">내용 보기</PopoverTrigger>

        <PopoverContent arrow class="w-64 p-4" aria-label="팝오버 내용">
          팝오버 내용입니다.
          <Button variant="fill" size="sm">버튼 fill</Button>
        </PopoverContent>
      </Popover>

      <Divider class="h-0" my="10" />

      <!-- Button 컴포넌트 사용한 경우 / arrow 말풍선 꼬리 / closable 내부 닫기 버튼 -->
      <Popover v-slot="{ close }" v-model="open2" placement="right">
        <PopoverTrigger :as="Button" variant="fill" size="md">Popover 내용 보기</PopoverTrigger>
  
        <PopoverContent arrow closable class="w-64 p-4" aria-label="팝오버 내용">
          <Box class="mb-4">
            팝오버 내용입니다.
            <TextButton size="sm" color="black" @click="close">여기를 클릭해도 닫힘</TextButton>
          </Box>
          <Button variant="outline" size="sm" rounded="full">버튼 fill</Button>
        </PopoverContent>
      </Popover>
    </Section>
  </Container>
</template>