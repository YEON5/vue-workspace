<script setup lang="ts">
import { Button, Container, Divider, Flex, IArrowRightS, IMy, Section, TextButton, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" class="pb-9">Button</Typo>

      <Flex direction="col" gap="6" class="w-fit">
        <Button variant="fill" size="sm">버튼 fill</Button>
        <Button variant="outline" size="md" color="secondary">버튼 outline</Button>
        <Button variant="fill" size="md" disabled>버튼 disabled</Button>

        <Button variant="fill" size="lg" icon-align="left">
          <template #icon>
            <IMy class="size-6" />
          </template>
          텍스트+icon 버튼L
        </Button>
        <Button variant="outline" size="lg" color="tertiary" icon-align="right">
          <template #icon>
            <IMy class="size-6" />
          </template>
          텍스트+icon 버튼R
        </Button>
        <Button variant="outline" size="lg" icon-align="top" class="h-auto p-3">
          <template #icon>
            <IMy class="size-6" />
          </template>
          텍스트+icon 버튼T
        </Button>
          
        <Button variant="icon" class="size-[32px] p-2">
          <IMy class="size-[24px]" />
        </Button>

        <Button variant="fill" size="lg" full>버튼 full</Button>
      </Flex>
      <Flex align="center" justify="between" gap="4" mt="5">
        <Button color="secondary" size="lg" class="flex-1">버튼 lg</Button>
        <Button color="tertiary" size="lg" class="flex-1">버튼 lg</Button>
      </Flex>
    </Section>

    <Divider type="thin" class="my-10" />

    <Section>
      <Typo variant="heading-l" class="pb-9">TextButton</Typo>

      <Flex gap="6">
        <TextButton size="sm">텍스트 버튼</TextButton>
        <TextButton size="md" disabled>텍스트 버튼</TextButton>
        <TextButton size="md" color="secondary">텍스트 버튼</TextButton>
        <TextButton size="lg" color="tertiary">텍스트 버튼</TextButton>
        <TextButton size="lg" icon-align="right">
          <template #icon>
            <IArrowRightS class="size-6" />
          </template>
          텍스트+icon 버튼
        </TextButton>
      </Flex>
    </Section>
  </Container>
</template>