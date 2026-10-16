<script setup lang="ts">
import { Accordion, AccordionContent, AccordionHead, AccordionItem, Container, Divider, Image, IMy, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

const accordionData = ref([
  {
    value: 'multipleA',
    title: 'multiple 제목1',
    content: 'multiple 내용1',
  },
  {
    value: 'multipleB',
    title: 'multiple 제목2',
    content: 'multiple 내용2',
  },
  {
    value: 'multipleC',
    title: 'multiple 제목3',
    content: 'multiple 내용3',
  },
  {
    value: 'multipleIcon',
    title: 'multiple 제목4',
    content: 'multiple 내용4',
    icon: IMy, 
    iconClass: 'size-[20px]',
  },
  {
    value: 'multipleImg',
    title: 'multiple 제목5',
    content: 'multiple 내용5',
    imgSrc: '/images/hero.png',
    imgWidth: '20px',
    imgHeight: '20px',
  },
  {
    value: 'multipleD',
    title: 'multiple 제목6 (비활성화)',
    content: '이 내용은 열어볼 수 없습니다.',
    disabled: true, // 필요시
  }
]);

const activeItem = ref<string[]>(['multipleA']);
// const singleItem = ref<string[]>(['singleA']);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Accordion</Typo>

      <!-- accordion data -->
      <Accordion v-model="activeItem" type="multiple">
        <AccordionItem 
          v-for="item in accordionData" 
          :key="item.value" 
          :value="item.value"
          :disabled="item.disabled"
        >
          <AccordionHead>
            <!-- prefix 슬롯 안에서 데이터 타입에 따라 분기 처리 -->
            <template v-if="item.icon || item.imgSrc" #prefix>
              <!-- 컴포넌트 데이터가 있으면 동적 렌더링 -->
              <component 
                :is="item.icon" 
                v-if="item.icon" 
                :class="item.iconClass" 
              />
          
              <!-- 이미지 데이터가 있으면 Image 컴포넌트 렌더링 -->
              <Image 
                v-else-if="item.imgSrc" 
                :src="item.imgSrc" 
                alt="" 
                :width="item.imgWidth" 
                :height="item.imgHeight" 
              />
            </template>
            {{ item.title }}
          </AccordionHead>
          <AccordionContent>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Divider class="h-0" my="10" />

      <!-- single -->
      <Accordion>
        <AccordionItem value="singleA">
          <AccordionHead>single 제목1</AccordionHead>
          <AccordionContent>single 내용1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="singleB">
          <AccordionHead>single 제목2</AccordionHead>
          <AccordionContent>single 내용2</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Divider class="h-0" my="10" />

      <!-- multiple -->
      <Accordion type="multiple">
        <AccordionItem value="multipleA">
          <AccordionHead>multiple 제목1</AccordionHead>
          <AccordionContent>multiple 내용1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="multipleB">
          <AccordionHead>multiple 제목2</AccordionHead>
          <AccordionContent>multiple 내용2</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Divider class="h-0" my="10" />
      
      <!-- icon 추가 -->
      <Accordion type="multiple">
        <AccordionItem value="multipleA">
          <AccordionHead>
            <template #prefix>
              <IMy class="size-[20px]" />
            </template>
            multiple 제목1
          </AccordionHead>
          <AccordionContent>multiple 내용1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="multipleB">
          <AccordionHead>
            <template #prefix>
              <Image src="/images/hero.png" alt="" width="20px" height="20px" />
            </template>
            multiple 제목2
          </AccordionHead>
          <AccordionContent>multiple 내용2</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Divider class="h-0" my="10" />

      <!-- accordion 중첩 -->
      <Accordion>
        <AccordionItem value="multipleOuterA">
          <AccordionHead>multipleOuter 제목</AccordionHead>
          <AccordionContent>
            <!-- inner accordion -->
            <Accordion type="multiple">
              <AccordionItem value="multipleInnerA">
                <AccordionHead class="pl-4">multipleInner 제목</AccordionHead>
                <AccordionContent class="pl-4">multipleInner 내용</AccordionContent>
              </AccordionItem>
            </Accordion>
            <!-- //inner accordion -->
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  </Container>
</template>