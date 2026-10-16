<script setup lang="ts">
import { Accordion, AccordionContent, AccordionHead, AccordionItem, Container, Divider, Image, IMy, Section, Typo } from '@ui/vue';


// const single = ref<string | undefined>('a');
// const multi = ref<string[]>(['a']);

// const outer = ref<string | undefined>('a')
// const inner = ref<string[]>(['x'])
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Accordion</Typo>

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