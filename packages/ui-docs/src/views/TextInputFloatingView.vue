<script setup lang="ts">
import { Container, Flex, FormGroup, Section, TextInputFloating, Typo } from '@ui/vue';
import { ref } from 'vue';


// formData
const formData = ref({
})
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" class="pb-9">Textinput Floating</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          info-msg="정보메세지"
        >
          <TextInputFloating
            id="floatingId"
            label="레이블"
            placeholder="-없이 입력"
            required
          />
          <TextInputFloating 
            id="floatingId2"
            placeholder="placeholder"
          />
        </FormGroup>
        <FormGroup
          error
          error-msg="에러메시지"
        >
          <TextInputFloating
            label="레이블고정"
          />
        </FormGroup>
        <FormGroup>
          <TextInputFloating
            label="레이블고정"
            readonly
          />
        </FormGroup>
        <FormGroup
          disabled
        >
          <TextInputFloating
            label="레이블고정"
            disabled
          />
        </FormGroup>
      </Flex>
    </Section>
  </Container>
</template>