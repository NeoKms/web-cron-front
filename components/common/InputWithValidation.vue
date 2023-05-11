<template>
  <div class="mt-2 relative mb-7">
    <div class="relative">
      <input
        v-model="prop"
        :disabled="loading||disabled"
        :name="name"
        :type="type"
        autocomplete="on"
        :autofocus="autofocus"
        :placeholder="placeholder"
        class="border-0 border-gray-400 w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :class="{
          'ring-red-400': propValidator.$errors.length,
          'bg-gray-200': loading||disabled,
          'pl-11': slots['prepend'],
          'pr-11': slots['append']
        }"
      >
      <div
        v-if="slots['prepend']"
        class="absolute content-center justify-center left-0 inset-y-0 w-10 flex items-center"
      >
        <slot name="prepend" />
      </div>
      <div
        v-if="slots['append']"
        class="absolute inset-y-0 right-0 flex items-center w-10 content-center justify-center"
      >
        <slot name="append" />
      </div>
    </div>
    <div v-if="propValidator.$errors.length" class="mt-0.5 h-[22px] absolute overflow-hidden leading-[0.5rem] px-2">
      <span v-tooltip="propValidator.$errors[0].$message" class="text-xs leading-[0.6rem] text-red-500">{{
        propValidator.$errors[0].$message
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SimplePropValidatorInterface } from '~/interfaces';

const slots = useSlots();
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
    required: false
  },
  type: {
    type: String,
    default: 'text',
    required: false
  },
  autofocus: {
    type: Boolean,
    default: false,
    required: false
  },
  name: {
    type: String,
    default: '',
    required: false
  },
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  loading: {
    type: Boolean,
    default: () => false,
    required: false
  },
  disabled: {
    type: Boolean,
    default: () => false,
    required: false
  },
  propValidator: {
    type: Object as PropType<SimplePropValidatorInterface>,
    required: false,
    default: () => ({
      $errors: []
    })
  }
});
const emits = defineEmits(['update:modelValue']);
const prop = computed({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
});
</script>

<style scoped>

</style>
