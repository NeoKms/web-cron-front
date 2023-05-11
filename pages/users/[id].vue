<template>
  <user-card :key="pending" :card="userCardData" :loading-ext="pending" />
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from '#app';
import { useUserStore } from '~/store/user';
import { UpdateUserType } from '~/interfaces';
import { errVueHandler } from '~/helpers/errorResponser';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const def = {
  name: '',
  surname: '',
  secondname: '',
  phone: '',
  rights: {}
} as UpdateUserType;
const {
  error,
  pending,
  data: userCardData
} = await useAsyncData<UpdateUserType>(
  'userById_' + route.params.id,
  async () => {
    await userStore.fetchById(+route.params.id)
      .then((res) => {
        if (!errVueHandler(res)) {
          if (process.server) {
            throw createError({
              statusCode: 404,
              statusMessage: 'Page Not Found'
            });
          } else {
            router.push('/404');
          }
        }
      });
    if (userStore.userById !== null) {
      const splitted = userStore.userById?.fio.split(' ');
      return {
        id: userStore.userById.id,
        name: splitted[0],
        surname: splitted[1],
        secondname: splitted.length === 3 ? splitted[3] : undefined,
        phone: userStore.userById.phone,
        rights: userStore.userById.rights
      } as UpdateUserType;
    } else {
      return def;
    }
  },
  {
    default: () => def,
    lazy: true
  }
);
if (error.value) {
  await navigateTo('/404', { redirectCode: 301 });
}
</script>
