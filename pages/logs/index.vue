<template>
  <div class="relative">
    <div class="flex flex-col space-y-5 mt-2">
      <div v-for="(log,index) in logList" :key="index" class="items-center flex shadow-md p-4 rounded-xl m-0 space-x-2">
        <div class="flex flex-col items-center text-xs">
          <span>{{ formatDateJS(log.timestamp_start,'DD.MM.YYYY hh:mm:ss') }}</span>
          <span> - </span>
          <span>{{ formatDateJS(log.timestamp_end,'DD.MM.YYYY hh:mm:ss') }}</span>
        </div>
        <div class="cursor-pointer">
          <common-my-svg-icon v-tooltip.auto="'Посмотреть лог'" :path="mdiTextBox" class="text-indigo-600 hover:text-indigo-500" />
        </div>
        <div>{{ log.jobEntity.name }}</div>
        <div class="flex-1" />
        <div class="cursor-pointer">
          <common-my-svg-icon v-tooltip.auto="'Удалить лог'" :path="mdiTrashCan" class="text-red-800 hover:text-indigo-500" />
        </div>
      </div>
    </div>
    <common-loading-full :loading="!!loading" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { mdiTextBox, mdiTrashCan } from '@mdi/js';
import { formatDateJS } from '../../helpers';
import { useLogStore } from '~/store/log';
import { LogElementType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const logStore = useLogStore();
const logList = computed<LogElementType[]>(() => logStore.logList);
const loading = ref<boolean>(false);
const apiCall = () => {
  loading.value = true;
  return logStore.fetchList()
    .then(res => errVueHandler(res))
    .finally(() => {
      loading.value = false;
    });
};
useAsyncData('logList', apiCall);
</script>

<style scoped>

</style>
