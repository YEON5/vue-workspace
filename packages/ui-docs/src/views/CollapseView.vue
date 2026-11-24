<script setup lang="ts">
import { Button, Collapse, CollapseContent, CollapseHead, Container, Divider, IArrowSelect, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

const CollapseOpen = ref(false);
const CollapseTest = ref(false);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-lg" pb="15">Collapse</Typo>

      <!-- collapse group -->
      <Collapse v-model="CollapseOpen" class="rounded-sm border border-neutral-light background-default p-9">
        <!-- <CollapseHead open-text="접기" close-text="더보기"> -->
        <CollapseHead text="더보기">
          <!-- 
            이미지 또는 아이콘 필요시 Image 컴포넌트 / 아이콘 컴포넌트 (IMy)
            <Image src="..." alt="" class="size-9 shrink-0" />
            <IMy class="size-9 shrink-0" aria-hidden="true" />
          -->
          <Typo variant="body-md">타이틀</Typo>
        </CollapseHead>

        <CollapseContent class="pt-7">
          <div>펼쳐지는 내용</div>
        </CollapseContent>
      </Collapse>
      
      <Divider class="h-0" my="17" />

      <!-- 버튼: 어디에 있어도 됨 (Collapse 바깥) -->
      <Button 
        aria-controls="collapseTest"
        :aria-expanded="CollapseTest"
        icon-align="right"
        @click="CollapseTest = !CollapseTest"
      >
        <!-- {{ CollapseTest ? '접기' : '더보기' }} -->
        상세보기
        <template #icon>
          <IArrowSelect :class="['size-9 transition-transform duration-200', CollapseTest && 'rotate-180']" aria-hidden="true" />
        </template>
      </Button>
      
      <!-- 영역만 -->
      <Collapse v-model="CollapseTest" class="mt-9">
        <CollapseContent id="collapseTest">펼쳐지는 내용</CollapseContent>
      </Collapse>
    </Section>
  </Container>
</template>