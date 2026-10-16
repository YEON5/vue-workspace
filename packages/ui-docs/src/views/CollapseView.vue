<script setup lang="ts">
import { Button, Collapse, CollapseContent, CollapseHead, Container, Divider, IArrowSelect, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

const CollapseOpen = ref(false);
const CollapseTest = ref(false);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Collapse</Typo>

      <!-- collapse group -->
      <Collapse v-model="CollapseOpen" class="rounded-lg border border-gray-300 p-5">
        <!-- <CollapseHead open-text="접기" close-text="더보기"> -->
        <CollapseHead text="더보기">
          <Typo variant="body-m">타이틀</Typo>
        </CollapseHead>

        <CollapseContent class="pt-4">
          <div>펼쳐지는 내용</div>
        </CollapseContent>
      </Collapse>
      
      <Divider class="h-0" my="10" />

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
          <IArrowSelect :class="['size-5 transition-transform duration-200', CollapseTest && 'rotate-180']" aria-hidden="true" />
        </template>
      </Button>
      
      <!-- 영역만 -->
      <Collapse v-model="CollapseTest" class="mt-5">
        <CollapseContent id="collapseTest">펼쳐지는 내용</CollapseContent>
      </Collapse>
    </Section>
  </Container>
</template>