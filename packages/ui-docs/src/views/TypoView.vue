<script setup lang="ts">
import { TypoMap, type TypoToken } from '#/types';
import * as tokens from '#/types/tokens.generated';
import { FONT_SIZE_SCALE, FONT_WEIGHT_SCALE } from '#/types/tokens.generated';
import { Box, Container, Divider, Section, Typo } from '@ui/vue';

// variant 목록 = tokens.rules.json typography (tokens.generated.ts FONT_SIZE_SCALE에서 weight가 있는 크기)
const variants = Object.keys(TypoMap) as TypoToken[];

// 화면 너비별 값 (tokens.generated.ts RESPONSIVE — 반응형이 없는 프로젝트는 생성되지 않음)
type Responsive = Record<string, { fontSize?: Record<string, string>; fontWeight?: Record<string, number> }>;
const responsive = ((tokens as Record<string, unknown>).RESPONSIVE ?? {}) as Responsive;
const columns = ['기본', ...Object.keys(responsive)];

// "44px · bold 600 · 행간 66px" (행간 = 크기 × 1.5)
function spec(v: TypoToken, column: string) {
  const weight = (FONT_SIZE_SCALE[v] as { weight: keyof typeof FONT_WEIGHT_SCALE }).weight;
  const r = responsive[column];
  const size = r?.fontSize?.[v] ?? FONT_SIZE_SCALE[v].size;
  const weightValue = r?.fontWeight?.[weight] ?? FONT_WEIGHT_SCALE[weight];
  const lineHeight = size.endsWith('px') ? `${parseFloat(size) * 1.5}px` : `${size} × 1.5`;
  return `${size} · ${weight} ${weightValue} · 행간 ${lineHeight}`;
}
</script>

<template>
  <Container>
    <Typo variant="heading-lg" pb="15">Typo</Typo>
    
    <Section>
      <!-- variant별 크기·굵기·행간 (tokens.generated.ts 값, 화면 너비별 값은 RESPONSIVE) -->
      <!-- 좁은 화면에서는 줄바꿈 대신 가로 스크롤 -->
      <div class="overflow-x-auto">
      <table class="w-full text-left whitespace-nowrap">
        <thead>
          <tr class="border-b">
            <th class="py-5 pr-10"><Typo as="span" variant="label-md" color="caption">예시</Typo></th>
            <th class="py-5 pr-10"><Typo as="span" variant="label-md" color="caption">variant</Typo></th>
            <th v-for="c in columns" :key="c" class="py-5 pr-10"><Typo as="span" variant="label-md" color="caption">{{ c }}</Typo></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in variants" :key="v" class="border-b">
            <td class="py-5 pr-10"><Typo as="span" :variant="v">가나다 Aa</Typo></td>
            <td class="py-5 pr-10"><Typo as="span" variant="body-sm">{{ v }}</Typo></td>
            <td v-for="c in columns" :key="c" class="py-5 pr-10"><Typo as="span" variant="body-sm">{{ spec(v, c) }}</Typo></td>
          </tr>
        </tbody>
      </table>
      </div>

      <Divider type="thin" my="17" />
      
      <!-- 말줄임 ellipsis -->
      <Box>
        <Typo text="body-lg" weight="medium" ellipsis>
          말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다.
        </Typo>
      </Box>

      <Divider type="thin" my="17" />
      
      <Box>
        <Typo :multi-ellipsis="2">
          말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다.
        </Typo>
      </Box>
    </Section>

  </Container>
</template>