<template>
  <div>
    {{ userById }}
  </div>
<!--  <user-card :card="userById" />-->
</template>

<script setup lang="ts">
import { useAsyncData, useRoute } from '#app';
import { useUserStore } from '~/store/user';
import { UserByIdType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const userStore = useUserStore();
const route = useRoute();
const userById = computed<UserByIdType|null>(() => userStore.userById);
const { error } = await useAsyncData(
  'userById',
  () => userStore.fetchById(+route.params.id)
    .then((res) => {
      if (!errVueHandler(res)) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
      }
    })
);
if (error.value) {
  await navigateTo('/404', { redirectCode: 301 });
}
</script>
