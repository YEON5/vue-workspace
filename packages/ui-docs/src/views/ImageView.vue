<script setup lang="ts">
import { Box, Container, Divider, Flex, Image, ScrollArea, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

interface ImgList {
  src: string
  alt: string
}
const bannerData = ref<ImgList[]>([
  { src: '/images/temp_img.webp', alt: '이미지설명' },
  { src: '/images/temp_img.webp', alt: '이미지설명' },
  { src: '/images/temp_img.webp', alt: '이미지설명' },
])
const imgData = ref<ImgList[]>([
  { src: '/images/temp_img.webp', alt: '이미지설명' },
  { src: '/images/temp_img.webp', alt: '이미지설명' },
  { src: '/images/temp_img.webp', alt: '이미지설명' },
])
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Image</Typo>
      <!-- images scroll data -->
      <ScrollArea
        snap
        snap-align="center"
        bleed="right"
        class="gap-4"
      >
        <Image
          v-for="img in bannerData"
          :key="img.src"
          v-bind="img"
          object-fit="cover"
          width="310px"
          ratio="310/167"
          class="bg-slate-400"
        />
      </ScrollArea>
      
      <Divider type="thin" my="10" />

      <!-- images data -->
      <Flex wrap>
        <Image
          v-for="img in imgData"
          :key="img.src"
          v-bind="img"
          object-fit="cover"
          width="310px"
          ratio="310/167"
        />
      </Flex>
        
      <Divider type="thin" my="10" />

      <Box>
        <Image
          src="/images/temp_img.webp"
          object-fit="cover"
          width="310px"
          ratio="310/167"
          alt="이미지설명"
        />
      </Box>

      <Divider type="thin" my="10" />

      <Box>
        <Image
          src="/images/temp_img.webp"
          object-fit="cover"
          width="310px"
          height="167px"
          radius="xl"
          alt="이미지설명"
        />
      </Box>

    </Section>
  </Container>
</template>