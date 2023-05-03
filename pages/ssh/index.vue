<template>
  <div class="relative">
    <common-button-with-loading @click="$router.push('/ssh/create')">
      Добавить
    </common-button-with-loading>
    {{ sshList }}
    <common-loading-full :loading="!!loading" />
  </div>
</template>

<script setup lang="ts">

import { useAsyncData } from '#app';
import { useSshStore } from '~/store/ssh';
import { SshElementType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const sshStore = useSshStore();
const sshList = computed<SshElementType[]>(() => sshStore.sshList);
const loading = ref<boolean>(false);
const apiCall = () => {
  loading.value = true;
  return sshStore.fetchList()
    .then(res => errVueHandler(res))
    .finally(() => {
      loading.value = false;
    });
};
useAsyncData('sshList', apiCall);
</script>

<style scoped>

</style>
