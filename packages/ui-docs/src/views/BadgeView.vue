<script setup lang="ts">
import { Badge, Box, Container, Flex, ITime, Section, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-lg" pb="15">Badge</Typo>
      
      <Flex direction="col" gap="10">
        <Typo as="span" class="relative">
          내용5
          <Badge type="dot" />
        </Typo>
  
        <Flex align="center" gap="3">
          <Typo>내용5</Typo>
          <Badge type="count" color="success" :count="99" />
        </Flex>
  
        <Flex align="center" gap="3">
          <Typo>내용5</Typo>
          <Badge type="count" color="warning" :count="1000" />
        </Flex>
        
        <Box class="relative w-fit">
          <button class="p-3">
            <ITime class="size-13" />
            <Badge type="dot" class="top-[5px] right-4 size-5" />
          </button>
        </Box>
      </Flex>
    </Section>
  </Container>
</template>