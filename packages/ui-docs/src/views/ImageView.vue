<script setup lang="ts">
import Divider from '#/components/ui/Divider.vue';
import { Box, Container, Flex, Image, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

interface ImgBanner {
  src: string
  alt: string
}
const imgList = ref<ImgBanner[]>([
  { src: '/images/temp_img.webp', alt: 'cat' },
  { src: '/images/temp_img.webp', alt: 'dog' },
  { src: '/images/temp_img.webp', alt: 'bird' },
])
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Image</Typo>
      
      <Box>
        <Image
          src="/images/temp_img.webp"
          object-fit="cover"
          width="310px"
          ratio="310/167"
          alt="cat"
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
          alt="cat"
        />
      </Box>
      
      <Divider type="thin" my="10" />

      <Flex>
        <Image
          v-for="img in imgList"
          :key="img.src"
          v-bind="img"
          object-fit="cover"
          width="310px"
          ratio="310/167"
        />
      </Flex>
    </Section>
  </Container>
</template>