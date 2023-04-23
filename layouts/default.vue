<template>
  <div>
    default layout 1
    <slot />
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<style scoped>

</style>
