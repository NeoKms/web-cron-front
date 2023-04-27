<template>
  <div>
    <div>
      <common-button-with-loading @click="$router.push('/users/create')">
        Добавить
      </common-button-with-loading>
    </div>
    <common-data-table :items="userList" :options="options" :headers="headers" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
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
  itemsPerPage: 4,
  page: 1,
  groupBy: []
});
const headers = ref<DataTableHeaderElement[]>([
  {
    name: 'Активность',
    value: 'is_active'
  }
]);
</script>

<style scoped>

</style>
