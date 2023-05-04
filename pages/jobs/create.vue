<template>
  <job-card />
</template>

<script setup lang="ts">

import { useSshStore } from '~/store/ssh';
import { errVueHandler } from '~/helpers/errorResponser';

const sshStore = useSshStore();
const apiCall = () => {
  return sshStore.fetchList()
    .then((res) => {
      if (!errVueHandler(res)) {
        throw createError('500');
      }
    });
};
useAsyncData('sshList', apiCall);
</script>

<style scoped>

</style>
