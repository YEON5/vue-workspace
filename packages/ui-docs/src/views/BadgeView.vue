<script setup lang="ts">
import { Badge, Box, Container, Flex, ITime, Section, Typo } from '@ui/vue';
</script>


<template>
  <Container>
    <Section>
      <Typo variant="body-l" color="display" class="pb-6">Badge</Typo>
      
      <Box>
        <Typo as="span" class="relative">
          내용5
          <Badge type="dot" />
        </Typo>
  
        <Flex align="center" gap="2">
          <Typo>내용5</Typo>
          <Badge type="count" color="warning" :count="99" />
        </Flex>
  
        <Flex align="center" gap="2">
          <Typo>내용5</Typo>
          <Badge type="count" color="warning" :count="1000" />
        </Flex>
  
        <button class="relative p-2">
          <ITime class="size-8" />
          <Badge type="dot" class="top-[5px] right-[6px] size-3" />
        </button>
      </Box>
    </Section>
  </Container>
</template>