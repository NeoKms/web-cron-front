<template>
  <div class="relative">
    <div class="flex flex-col space-y-5 mt-2">
      <div
        v-for="(log,index) in logList"
        :key="index"
        class="items-center flex shadow-md p-4 rounded-xl m-0 space-x-2 ring-2"
        :class="{
          'ring-yellow-200': log.status===1,
          'ring-green-200': log.status===2,
          'ring-red-200': log.status===3
        }"
      >
        <div class="flex flex-col items-center text-xs">
          <span>{{ formatDateJS(log.timestamp_start,'DD.MM.YYYY hh:mm:ss') }}</span>
          <span> - </span>
          <span>{{ formatDateJS(log.timestamp_end,'DD.MM.YYYY hh:mm:ss') }}</span>
        </div>
        <div class="cursor-pointer">
          <button-with-loading v-tooltip.auto="'Посмотреть лог'" :loading="loadingByKey.has(getKey(log))" @click="fetchContent(log)">
            <common-my-svg-icon :path="mdiTextBox" />
          </button-with-loading>
        </div>
        <div>{{ log.jobEntity.name }}</div>
        <div class="flex-1" />
        <div v-if="log.status!==1" v-tooltip.auto="'Удалить лог'" class="cursor-pointer">
          <common-button-with-loading color="red">
            <common-my-svg-icon :path="mdiTrashCan" />
          </common-button-with-loading>
        </div>
      </div>
    </div>
    <common-panel-right v-model="panelModal">
      <template #title>
        <div class="flex flex-col">
          <div>
            {{ panelModalLog.jobEntity.name }}
          </div>
          <div class="text-xs">
            {{ formatDateJS(panelModalLog.timestamp_start,'DD.MM.YYYY hh:mm:ss') }}
            -
            {{ formatDateJS(panelModalLog.timestamp_end,'DD.MM.YYYY hh:mm:ss') }}
          </div>
        </div>
      </template>
      <div class="flex flex-col text-xs">
        <pre v-if="panelModalData.text" class="shadow-md p-2 sm:max-h-[300px] max-h-full overflow-auto">
          {{ panelModalData.text }}
        </pre>
        <pre v-if="panelModalData.error" class="text-red-800 shadow-md p-2  sm:max-h-[300px] max-h-full overflow-auto">
          {{ panelModalData.error }}
        </pre>
      </div>
    </common-panel-right>
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
import ButtonWithLoading from '~/components/common/ButtonWithLoading.vue';
import { ContentDto } from '~/interfaces/apiTypes/log/dto/content.dto';

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
const loadingByKey = ref(new Set());
const getKey = (item: LogElementType|null) => item ? `${item.jobEntity.sshEntityId}_${item.jobEntity.id}_${item.timestamp_start}` : '';
const panelModal = ref(false);
const panelModalLog = ref<LogElementType|null>(null);
const panelModalData = computed<ContentDto>(() => logStore.contentByKey[getKey(panelModalLog.value)] ?? { error: '', text: '' });
const fetchContent = (item: LogElementType) => {
  if (loadingByKey.value.has(getKey(item))) { return; }
  loadingByKey.value.add(getKey(item));
  return logStore.fetchContent({
    ts: item.timestamp_start,
    jobId: item.jobEntity.id,
    sshId: item.jobEntity.sshEntityId
  })
    .then((res) => {
      if (errVueHandler(res)) {
        panelModal.value = true;
        panelModalLog.value = item;
      }
    })
    .finally(() => {
      loadingByKey.value.delete(getKey(item));
    });
};
</script>

<style scoped>

</style>
