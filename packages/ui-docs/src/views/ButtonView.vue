<script setup lang="ts">
import { Button, Container, Divider, Flex, IArrowRightS, IconButton, IMy, Section, TextButton, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <!-- Button -->
      <Typo variant="heading-lg" pb="15">Button</Typo>

      <Flex direction="col" gap="10" class="w-fit">
        <Button variant="fill" size="sm">버튼 fill</Button>
        <Button variant="outline" size="md" color="secondary">버튼 outline</Button>
        <Button variant="fill" size="md" disabled>버튼 disabled</Button>

        <Button variant="fill" size="lg" icon-align="left">
          <template #icon>
            <IMy class="size-10" />
          </template>
          텍스트+icon 버튼L
        </Button>
        <Button variant="outline" size="lg" color="tertiary" icon-align="right">
          <template #icon>
            <IMy class="size-10" />
          </template>
          텍스트+icon 버튼R
        </Button>
        <Button variant="outline" size="lg" icon-align="top" class="h-auto p-5">
          <template #icon>
            <IMy class="size-10" />
          </template>
          텍스트+icon 버튼T
        </Button>

        <Button variant="fill" size="lg" full>버튼 full</Button>
      </Flex>

      <Flex align="center" justify="between" gap="7" mt="9">
        <Button color="secondary" size="lg" class="flex-1">버튼 lg</Button>
        <Button color="tertiary" size="lg" class="flex-1">버튼 lg</Button>
      </Flex>

      <Divider type="thin" my="17" />

      <!-- IconButton -->
      <Typo variant="heading-lg" pb="15">IconButton</Typo>

      <Flex align="center" gap="10">
        <IconButton size="sm" aria-label="내 정보 sm">
          <IMy class="size-9" aria-hidden="true" />
        </IconButton>
        <IconButton size="md" aria-label="내 정보 md">
          <IMy class="size-11" aria-hidden="true" />
        </IconButton>
        <IconButton size="lg" aria-label="내 정보 lg">
          <IMy class="size-11" aria-hidden="true" />
        </IconButton>
        <IconButton size="md" disabled aria-label="내 정보 disabled">
          <IMy class="size-11" aria-hidden="true" />
        </IconButton>
        <!-- hover 배경이 필요하면 쓰는 쪽에서 class로 지정 -->
        <IconButton size="lg" rounded="full" class="hover:action-neutral-hover" aria-label="내 정보 hover">
          <IMy class="size-11" aria-hidden="true" />
        </IconButton>
      </Flex>

      <Divider type="thin" my="17" />

      <!-- TextButton -->
      <Typo variant="heading-lg" pb="15">TextButton</Typo>

      <Flex gap="10">
        <TextButton size="sm">텍스트 버튼</TextButton>
        <TextButton size="md" disabled>텍스트 버튼</TextButton>
        <TextButton size="md" color="secondary">텍스트 버튼</TextButton>
        <TextButton size="lg" color="tertiary">텍스트 버튼</TextButton>
        <TextButton size="lg" icon-align="right">
          <template #icon>
            <IArrowRightS class="size-10" />
          </template>
          텍스트+icon 버튼
        </TextButton>
      </Flex>
    </Section>
  </Container>
</template>