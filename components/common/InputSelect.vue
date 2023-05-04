<template>
  <div class="my-2 relative">
    <select
      v-model="prop"
      :autofocus="autofocus"
      class="border-0 border-gray-400 w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option v-for="(item,index) in items" :key="index" :value="item[itemValue]">
        {{ item[itemName] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true
  },
  itemName: {
    type: String,
    default: 'name',
    required: true
  },
  itemValue: {
    type: String,
    default: 'value',
    required: true
  },
  autofocus: {
    type: Boolean,
    default: false,
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
