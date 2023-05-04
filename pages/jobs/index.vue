<template>
  <div class="relative">
    <common-button-with-loading @click="$router.push('/jobs/create')">
      Добавить
    </common-button-with-loading>
    {{ jobList }}
    <common-loading-full :loading="!!loading" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { JobElementType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';
import { useJobStore } from '~/store/job';

const jobStore = useJobStore();
const jobList = computed<JobElementType[]>(() => jobStore.jobList);
const loading = ref<boolean>(false);
const apiCall = () => {
  loading.value = true;
  return jobStore.fetchList()
    .then(res => errVueHandler(res))
    .finally(() => {
      loading.value = false;
    });
};
useAsyncData('jobList', apiCall);
</script>

<style scoped>

</style>
