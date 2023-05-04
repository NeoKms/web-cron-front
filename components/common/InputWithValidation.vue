<template>
  <div class="mt-2 relative mb-7">
    <!--    <div class="relative mb-6">-->
    <!--          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
    <!--            <svg-->
    <!--              class="w-5 h-5 text-gray-500 dark:text-gray-400"-->
    <!--              fill="currentColor"-->
    <!--              viewBox="0 0 20 20"-->
    <!--              xmlns="http://www.w3.org/2000/svg"-->
    <!--            >-->
    <!--              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />-->
    <!--              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />-->
    <!--            </svg>-->
    <!--          </div>-->
    <!--      <input-->
    <!--        id="input-group-1"-->
    <!--        type="text"-->
    <!--        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
    <!--        placeholder="name@flowbite.com"-->
    <!--      >-->
    <!--    </div>-->
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
          'pl-10': slots['prepend'],
          'pr-10': slots['append']
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
