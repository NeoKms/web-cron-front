<template>
  <div class="mt-4">
    <div class="flex">
      <div class="flex-1" />
      <common-button-with-loading @click="$router.push('/users/create')">
        Добавить
      </common-button-with-loading>
    </div>
    <div>
      filter
    </div>
    <common-data-table
      :options="options"
      :items="userList"
      :headers="headers"
      :loading="!!loading"
      :sticky-head="true"
    >
      <template #[`item.actions`]="{ item }">
        <div class="flex space-x-2">
          <common-my-svg-icon :path="mdiPencil" class="text-orange-500 cursor-pointer focus:outline-none" @click="$router.push('/users/1'+item.id)" />
          <common-my-svg-icon
            v-if="item.isActive"
            v-tooltip.auto="'Деактивировать'"
            class="text-green-600 cursor-pointer focus:outline-none"
            :path="mdiToggleSwitchVariant"
            :class="{
              'text-gray-500 cursor-default': changeStatusLoadingByUserId.has(item.id),
              'text-green-600 cursor-pointer': !changeStatusLoadingByUserId.has(item.id)
            }"
            @click="changeActive(item,0)"
          />
          <common-my-svg-icon
            v-else
            v-tooltip.auto="'Активировать'"
            class="text-green-600 cursor-pointer focus:outline-none"
            :path="mdiToggleSwitchVariantOff"
            :class="{
              'text-gray-500 cursor-default': changeStatusLoadingByUserId.has(item.id),
              'text-red-600 cursor-pointer': !changeStatusLoadingByUserId.has(item.id)
            }"
            @click="changeActive(item,1)"
          />
          <common-my-svg-icon
            v-if="item.banned_to > (Date.now() / 1000)"
            v-tooltip.auto="'Разбанить'"
            :path="mdiLockClock"
            class="focus:outline-none"
            :class="{
              'text-gray-500 cursor-default': unbanLoadingByUserId.has(item.id),
              'text-red-600 cursor-pointer': !unbanLoadingByUserId.has(item.id)
            }"
            @click="unban(item)"
          />
        </div>
      </template>
    </common-data-table>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import {
  mdiLockClock, mdiPencil,
  mdiToggleSwitchVariant,
  mdiToggleSwitchVariantOff
} from '@mdi/js';
import { useUserStore } from '~/store/user';
import { computed } from '#imports';
import { DataTableHeaderElement, DataTableOptions, UserListElementType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';
import { useNotificationStore } from '~/store/notification';

const notifStore = useNotificationStore();
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
const unbanLoadingByUserId = ref<Set<number>>(new Set());
const changeStatusLoadingByUserId = ref<Set<number>>(new Set());

const unban = (user: UserListElementType) => {
  unbanLoadingByUserId.value.add(user.id);
  return userStore.unban(user.id)
    .then((res) => {
      if (errVueHandler(res)) {
        notifStore.sendNotif({
          type: 'success',
          position: 'top',
          message: 'Пользователь успешно разбанен',
          duration: 2000
        });
      }
    })
    .finally(() => {
      unbanLoadingByUserId.value.delete(user.id);
    });
};
const changeActive = (user: UserListElementType, status: 1 | 0) => {
  changeStatusLoadingByUserId.value.add(user.id);
  return userStore[status === 1 ? 'activate' : 'deactivate'](user.id)
    .then((res) => {
      if (errVueHandler(res)) {
        notifStore.sendNotif({
          type: 'success',
          position: 'top',
          message: `Пользователь успешно ${status === 1 ? 'активирован' : 'деактивирован'}`,
          duration: 2000
        });
      }
    })
    .finally(() => {
      changeStatusLoadingByUserId.value.delete(user.id);
    });
};
</script>

<style scoped>

</style>
