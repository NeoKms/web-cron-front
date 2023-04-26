<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto" src="~/assets/img/logo.svg" alt="WebCron">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 mx-auto sm:w-full sm:max-w-md border-2 border-purple-100 p-10 rounded-3xl">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <common-input-with-validation
            v-model="loginData.username"
            :loading="loading"
            :prop-validator="v$.username"
            name="email"
          />
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <nuxt-link to="/login/reset" class="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </nuxt-link>
            </div>
          </div>
          <common-input-with-validation
            v-model="loginData.password"
            :loading="loading"
            :prop-validator="v$.password"
            name="password"
            type="password"
          />
        </div>
        <div>
          <common-button-with-loading class="w-full" :loading="loading" @click="sendLogin">
            Sign in
          </common-button-with-loading>
        </div>
      </div>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <NuxtLink to="/login/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          SignUp
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { definePageMeta } from '#imports';
import { useAuthStore } from '~/store/auth';
import { LoginDto } from '~/interfaces/apiTypes/auth/dto/login.dto';
import { errVueHandler } from '~/helpers/errorResponser';
import rul from '~/helpers/rulesModule';

definePageMeta({
  layout: 'login'
});
const router = useRouter();
const authStore = useAuthStore();
const loginData = ref<LoginDto>({
  username: '',
  password: ''
});
const rules = {
  username: {
    required: rul.req,
    email: rul.email
  },
  password: {
    required: rul.req
  }
};
const v$ = useVuelidate(rules, loginData, {
  $lazy: true,
  $autoDirty: true
});
const loading = ref(false);
const sendLogin = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  authStore.login(loginData.value)
    .then((res) => {
      if (errVueHandler(res)) {
        router.push('/');
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>

</style>
