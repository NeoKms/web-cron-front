<template>
  <user-card :card="userCardData" />
</template>

<script setup lang="ts">
import { useAsyncData, useRoute } from '#app';
import { useUserStore } from '~/store/user';
import { UpdateUserType, UserByIdType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const userStore = useUserStore();
const route = useRoute();
const userById = computed<UserByIdType|null>(() => userStore.userById);
const userCardData = computed<UpdateUserType>(() => {
  if (userById.value !== null) {
    const splitted = userById.value?.fio.split(' ');
    return {
      id: userById.value.id,
      name: splitted[0],
      surname: splitted[1],
      secondname: splitted.length === 3 ? splitted[3] : undefined,
      phone: userById.value?.phone,
      rights: userById.value?.rights
    } as UpdateUserType;
  } else {
    return {
      name: '',
      surname: '',
      secondname: '',
      phone: '',
      rights: {}
    } as UpdateUserType;
  }
});
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
