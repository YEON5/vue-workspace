<script setup lang="ts">
import { Container, Flex, Section, Switch, Typo } from '@ui/vue';
import { ref } from 'vue';

const notifyEnabled = ref(false);
const darkMode = ref(false);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Switch</Typo>

      <Flex direction="col" gap="6">
        <Switch />
        <Switch checked>Switch</Switch>

        <!-- ON/OFF 텍스트 포함 -->
        <Switch v-model="notifyEnabled" show-text>알림 받기</Switch>

        <!-- 커스텀 텍스트 -->
        <Switch v-model="darkMode" show-text on-text="Dark" off-text="Light" class="custom-text">테마</Switch>
      </Flex>
    </Section>
  </Container>
</template>


<style scoped lang="scss">
:deep(.custom-text .switch-track--text) {
  width: 58px;
}
:deep(.custom-text .switch-input:checked + .switch-track--text .switch-thumb) {
  transform: translateX(32px);
}
</style>