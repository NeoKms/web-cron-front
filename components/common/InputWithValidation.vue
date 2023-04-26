<template>
  <div class="mt-2 relative mb-7">
    <input
      id="email"
      v-model="prop"
      :disabled="loading"
      name="email"
      type="email"
      autocomplete="email"
      required=""
      class="border-0 border-gray-400 w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :class="{'ring-red-400': propValidator.$errors.length}"
    >
    <div v-if="propValidator.$errors.length" class="h-[22px] absolute overflow-hidden">
      <span v-tooltip="'lll'" class="text-xs text-red-500 px-2">{{
        propValidator.$errors[0].$message
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { SimplePropValidatorInterface } from '~/interfaces';

const props = defineProps({
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
  propValidator: {
    type: Object as PropType<SimplePropValidatorInterface>,
    required: false,
    default: () => ({
      $errors: []
    })
  }
});
const emit = defineEmits(['update:modelValue']);
const prop = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
});
</script>

<style scoped>

</style>
