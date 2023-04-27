<template>
  <div>
    <div>
      <common-button-with-loading @click="$router.push('/users/create')">
        Добавить
      </common-button-with-loading>
    </div>
    users page
    {{ userList }}
  </div>
</template>

<script setup lang="ts">

import { useAsyncData } from '#app';
import { useUserStore } from '~/store/user';
import { computed } from '#imports';
import { UserListElementType } from '~/interfaces';
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
</script>

<style scoped>

</style>
