<template>
  <div class="mt-4">
    <div class="flex">
      <div class="flex-1" />
      <common-button-with-loading @click="$router.push('/users/create')">
        Добавить
      </common-button-with-loading>
    </div>
    <common-data-table
      :items="userList"
      :options="options"
      :headers="headers"
      :loading="!!loading"
      :sticky-head="true"
    >
      <template #[`item.actions`]="{ item }">
        <common-my-svg-icon
          v-if="item.isActive"
          class="text-green-600 pa-1 rounded-2xl border-2 cursor-pointer"
          :path="mdiPowerPlugOutline"
        />
        <common-my-svg-icon v-else :path="mdiPowerPlugOffOutline" />
        <common-my-svg-icon v-if="item.banned_to > (Date.now() / 1000)" :path="mdiLockOpenCheckOutline" />
      </template>
    </common-data-table>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { mdiLockOpenCheckOutline, mdiPowerPlugOffOutline, mdiPowerPlugOutline } from '@mdi/js';
import { useUserStore } from '~/store/user';
import { computed } from '#imports';
import { DataTableHeaderElement, DataTableOptions, UserListElementType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const userStore = useUserStore();
const userList = computed<UserListElementType[]>(() => userStore.userList);
const loading = ref(false);
const apiCall = () => {
  loading.value = true;
  return userStore.fetchList()
    .then(res => errVueHandler(res))
    .finally(() => {
      loading.value = false;
    });
};
useAsyncData('userList', apiCall);
const options = ref<DataTableOptions>({
  sortDesc: [],
  sortBy: [],
  itemsPerPage: 10,
  page: 1,
  groupBy: []
});
const headers = ref<DataTableHeaderElement[]>([
  {
    text: 'ФИО',
    value: 'fio'
  },
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'Действия',
    value: 'actions',
    sort: false
  }
]);
</script>

<style scoped>

</style>
