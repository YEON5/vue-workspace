<script setup lang="ts">
import { IInfo } from '#components';
import { useFormField } from '@/composables/useFormField';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import type { FormFieldProps } from '@/types/form';
import { cn } from '@/utils/cn';
import { computed, provide } from 'vue';
import FormLabel from './FormLabel.vue';


interface Props extends SpacingProps, FormFieldProps {
  inputId?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  disabled: false,
  readonly: false,
  error: false,
  errorMsg: '',
  infoMsg: '',
});

// 내부에 들어오는 모든 자식 컴포넌트들에게 error 상태 전달
provide('formGroupError', computed(() => props.error));

const { spacingClasses } = useSpacing(props);
const { errorMsgClasses, infoMsgClasses, showError, showInfo } = useFormField(props);

const formFieldClasses = computed(() =>
  cn(
    'relative flex flex-col gap-3 flex-1',
    spacingClasses.value,
    props.class
  )
);
</script>

<template>
  <div class="form-field" :class="formFieldClasses">
    <!-- label : FormLabel 컴포넌트 연결 -->
    <div v-if="label || $slots.label" class="form-label">
      <slot name="label" :for-id="inputId">
        <FormLabel :for-id="inputId" :required="required" :disabled="disabled">
          {{ label }}
        </FormLabel>
      </slot>
    </div>

    <!-- input slot -->
    <slot />

    <!-- error msg -->
    <Flex v-if="showError" align="center" gap="2">
      <IInfo class="size-5" />
      <p :class="errorMsgClasses">{{ errorMsg }}</p>
    </Flex>
    
    <!-- info msg -->
    <Flex v-else-if="showInfo" align="center" gap="2">
      <IInfo class="size-5" />
      <p :class="infoMsgClasses">{{ infoMsg }}</p>
    </Flex>
  </div>
</template>