<script setup lang="ts">
import TextAreaFloating from '#/components/ui/TextAreaFloating.vue';
import { Container, Divider, Flex, FormGroup, Section, TextInputFloating, Typo } from '@ui/vue';
import { ref } from 'vue';


// formData
const formData = ref({
  labelText: '입력데이터',
})
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Textinput Floating</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          info-msg="정보메세지"
        >
          <TextInputFloating
            id="floatingId"
            label="레이블고정"
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
            required
          />
        </FormGroup>

        <FormGroup>
          <TextInputFloating
            v-model="formData.labelText"
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

      <Divider type="thin" my="10" />

      <Typo variant="heading-l" pb="9">TextArea Floating</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          info-msg="300자 이내로 입력해주세요"
        >
          <TextAreaFloating 
            label="레이블"
            placeholder="Textarea placeholder"
          />
        </FormGroup>
      </Flex>
    </Section>
  </Container>
</template>