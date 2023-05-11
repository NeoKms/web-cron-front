<template>
  <div class="my-2 relative">
    <select
      v-model="prop"
      :autofocus="autofocus"
      class="border-0 border-gray-400 w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :class="{
        'ring-red-400': propValidator.$errors.length,
      }"
    >
      <option v-for="(item,index) in items" :key="index" class="w-2" :value="item[itemValue]">
        {{ item[itemName] }}
      </option>
    </select>
    <div v-if="propValidator.$errors.length" class="mt-0.5 h-[22px] absolute overflow-hidden leading-[0.5rem] px-2">
      <span v-tooltip="propValidator.$errors[0].$message" class="text-xs leading-[0.6rem] text-red-500">{{
        propValidator.$errors[0].$message
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SimplePropValidatorInterface } from '~/interfaces';

const props = defineProps({
  propValidator: {
    type: Object as PropType<SimplePropValidatorInterface>,
    required: false,
    default: () => ({
      $errors: []
    })
  },
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
    type: Number,
    required: true,
    default: -99999
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
