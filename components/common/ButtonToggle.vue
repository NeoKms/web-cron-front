<template>
  <button
    :disabled="disabled || loading"
    class="h-8 items-center flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="classArray"
    @click="prop=!prop"
  >
    <common-loading-circle v-if="loading" />
    <span v-else><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
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
  color: {
    type: String as PropType<'red' | 'green' | 'blue' | 'indigo' | 'yellow' | 'orange'>,
    required: false,
    default: 'indigo'
  }
});
const activeTemplate = 'bg-_C_-600 focus-visible:outline-_C_-600 hover:bg-_C_-500';
const activeClass = computed(() => activeTemplate.replace(/_C_/gi, props.color));
const disabledTemplate = 'bg-_C_-900';
const disabledClass = computed(() => disabledTemplate.replace(/_C_/gi, props.color));
const classArray = computed(() => {
  const arr = [];
  if (props.disabled || !prop.value) {
    arr.push(disabledClass.value);
  } else {
    arr.push(activeClass.value);
  }
  return arr;
});
const emits = defineEmits(['update:modelValue']);
const prop = computed({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
});
</script>

<style scoped>

</style>
