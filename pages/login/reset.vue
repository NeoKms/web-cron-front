<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto" src="~/assets/img/logo.svg" alt="WebCron">
      <h2 class="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Восстановление учётной записи
      </h2>
    </div>
    <div class="mt-10 mx-auto w-full sm:w-full sm:max-w-md shadow-sm shadow-purple-300 p-10 rounded-3xl">
      <div v-if="!success" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              :disabled="loading"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>
        <div>
          <button
            :disabled="loading"
            type="submit"
            class="h-8 items-center flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="sendReset"
          >
            <common-loading-circle v-if="loading" />
            <span v-else>Reset</span>
          </button>
        </div>
      </div>
      <div v-else class="space-y-6">
        <p>
          На указанную почту отправлена ссылка для сброса пароля.
        </p>
        <p>
          Можете закрыть страницу.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';
import { useAuthStore } from '~/store/auth';
import { errVueHandler } from '~/helpers/errorResponser';

definePageMeta({
  layout: 'login'
});

const loading = ref(false);
const authStore = useAuthStore();
const email = ref('');
const success = ref(false);
const sendReset = () => {
  loading.value = true;
  return authStore.resetPassword(email.value, document.location.origin + '/login/signIn')
    .then((res) => {
      if (errVueHandler(res)) {
        success.value = true;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

</script>

<style scoped>

</style>
