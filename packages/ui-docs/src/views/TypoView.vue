<script setup lang="ts">
import { Container, Divider, Flex, Section, Typo } from '@ui/vue';
</script>


<template>
  <Container>
    <Typo variant="body-l" color="display" class="pb-6">Typo</Typo>

    <Section pb="6">
      <Typo text="lg" weight="medium" ellipsis>
        말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다.
      </Typo>
    </Section>

    <Divider type="thin" />

    <Section>
      <Typo :multi-ellipsis="2">
        말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다.
      </Typo>
    </Section>

    <Divider type="thin" />

    <Section>
      <Flex wrap align="center" justify="start" gap="3" mb="5" p="4" rounded="md" class="bg-gray-100">
        <Typo variant="body-l">variant body-l</Typo>
        <Divider direction="vertical" />
        <Typo variant="body-m">variant body-m</Typo>
        <Divider direction="vertical" />
        <Typo variant="body-s">variant body-s</Typo>
        <Divider direction="vertical" />
        <Typo variant="label-l">variant label-l</Typo>
        <Divider direction="vertical" />
        <Typo variant="label-m">variant label-m</Typo>
        <Divider direction="vertical" />
        <Typo variant="label-s">variant label-s</Typo>
        <Divider direction="vertical" />
        <Typo variant="caption-1">variant caption-1</Typo>
        <Divider direction="vertical" />
        <Typo variant="caption-2">variant caption-2</Typo>
      </Flex>
    </Section>
  </Container>
</template>