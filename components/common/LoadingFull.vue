<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
    required: false
  }
});
</script>

<template>
  <client-only>
    <div v-if="loading" class="absolute top-0 right-auto bg-white opacity-95 w-full h-full text-center">
      <common-loading-circle class="w-40 h-40 mt-60" />
    </div>
  </client-only>
</template>

<style scoped>

</style>
