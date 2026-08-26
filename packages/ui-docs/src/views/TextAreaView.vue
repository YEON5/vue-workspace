<script setup lang="ts">
import {
  Container,
  Flex,
  FormGroup,
  FormLabel,
  Section,
  TextArea,
  Typo
} from '@ui/vue';
import { ref } from 'vue';


// formData
const formData = ref({
  labelTextarea: '',
  labelTextarea2: '',
})
</script>


<template>
  <Container>
    <Section>
      <Typo variant="heading-l" class="pb-9">TextArea</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          label="레이블"
          info-msg="300자 이내로 입력해주세요"
        >
          <TextArea
            v-model="formData.labelTextarea2"
            placeholder="Textarea placeholder"
          />
        </FormGroup>

        <FormGroup
          label="레이블"
        >
          <TextArea
            v-model="formData.labelTextarea2"
            placeholder="Textarea placeholder"
            show-count
            :max-length="100"
          />
        </FormGroup>

        <!-- info msg / count 나란히 배치 (예외케이스) -->
        <Flex direction="col" gap="3">
          <FormLabel>레이블</FormLabel>
          <TextArea 
            v-model="formData.labelTextarea"
            placeholder="Textarea placeholder"
            :max-length="100" 
          />
          <Flex align="center" justify="between">
            <Typo variant="body-s" color="caption">100자 이내로 입력해주세요</Typo>
            <Typo as="span" variant="body-s" color="caption">{{ formData.labelTextarea.length }}/100</Typo>
          </Flex>

        </Flex>
      </Flex>
    </Section>
  </Container>
</template>