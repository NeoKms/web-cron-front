<template>
  <button
    :disabled="disabled || loading"
    class="h-8 items-center flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="{
      'bg-gray-600': disabled,
      'hover:bg-indigo-500': !disabled
    }"
  >
    <common-loading-circle v-if="loading" />
    <span v-else><slot /></span>
  </button>
</template>

<script setup lang="ts">
defineProps({
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
</script>

<style scoped>

</style>
