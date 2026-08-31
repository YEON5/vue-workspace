<script setup lang="ts">
import { Container, Flex, IMy, Section, Tag, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Tag</Typo>
      
      <Flex gap="5">
        <Tag variant="solid" color="success">완료</Tag>
        <Tag variant="solid" color="warning">주의</Tag>
        <Tag variant="outline" color="error" type="rounded">실패</Tag>
        <Tag variant="outline" color="success" type="rounded">완료</Tag>
        <Tag variant="solid" color="info">
          <template #icon>
            <IMy class="size-4" />
          </template>
          모집중
        </Tag>
      </Flex>
    </Section>
  </Container>
</template>