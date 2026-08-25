<script setup lang="ts">
import { Container, Lottie, Section, Typo } from '@ui/vue';
</script>


<template>
  <Container>
    <Section>
      <Typo variant="body-l" color="display" class="pb-6">Lottie Player</Typo>
      
      <Lottie 
        path="/lottie/lottie-test.json"
        :width="326"
        :height="220"
        class="mx-auto"
      />
    </Section>
  </Container>
</template>