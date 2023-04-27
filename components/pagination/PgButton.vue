<template>
  <button
    aria-current="page"
    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20"
    :class="{
      'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600': current,
      'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0' : !current
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  current: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>

</style>
