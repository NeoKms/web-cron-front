<template>
  <div class="mx-auto sm:max-w-2xl p-8 sm:p-2">
    <form class="mt-8 mb-8">
      <div class="space-y-5">
        <div class="border-b border-gray-900/10">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Sign Up
          </h2>
          <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6 items-center">
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="formData.email"
                  :loading="loading"
                  :prop-validator="v$.email"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <template v-if="codeSent">
                <label class="block text-sm font-medium leading-6 text-gray-900">Verify code</label>
                <div class="mt-2">
                  <common-input-with-validation
                    v-model="formData.code"
                    :loading="loading"
                    :prop-validator="v$.code"
                  />
                </div>
              </template>
              <template v-else>
                <common-button-with-loading class="w-full" :loading="loading" @click="sendVerifyCode">
                  Send verify code
                </common-button-with-loading>
              </template>
            </div>
          </div>
        </div>
        <div class="border-b border-gray-900/10 pb-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div class="mt-2">
                <common-input-with-validation v-model="formData.name" :loading="loading" :prop-validator="v$.name" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Surname</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="formData.surname"
                  :loading="loading"
                  :prop-validator="v$.surname"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Secondname (optional)</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="formData.secondname"
                  :loading="loading"
                  :prop-validator="v$.secondname"
                />
              </div>
            </div>
            <div class="sm:col-span-9">
              <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="formData.password"
                  :loading="loading"
                  :prop-validator="v$.password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <nuxt-link to="/login/signIn" class="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </nuxt-link>
        <common-button-with-loading class="w-auto" :loading="loading" @click="sendSignUp">
          Save
        </common-button-with-loading>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { definePageMeta } from '#imports';
import { SignUpDto } from '~/interfaces/apiTypes/auth/dto/sign-up.dto';
import rul from '~/helpers/rulesModule';

definePageMeta({
  layout: 'login'
});
const loading = ref<boolean>(false);
const codeSent = ref(false);
type FDType = Omit<SignUpDto, 'fio' | 'toEntity'>;
const formData = ref<FDType>({
  verifyKey: '',
  code: 0,
  email: '',
  name: '',
  surname: '',
  secondname: '',
  password: '',
  rights: {}
});
const rules = {
  email: {
    required: rul.req,
    email: rul.email
  },
  code: {
    required: rul.req,
    number: rul.num
  },
  verifyKey: {
    required: rul.req
  },
  name: {
    required: rul.req,
    maxLen: rul.mal(100)
  },
  surname: {
    required: rul.req,
    maxLen: rul.mal(100)
  },
  secondname: {
    maxLen: rul.mal(100)
  },
  password: {
    required: rul.req,
    minLen: rul.mil(8),
    maxLen: rul.mil(100)
  }
};
const v$ = useVuelidate<FDType>(rules, formData, {
  $lazy: true,
  $autoDirty: true
});
const sendVerifyCode = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    codeSent.value = true;
  }, 2000);
};
const sendSignUp = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    codeSent.value = true;
  }, 2000);
};
</script>

<style scoped>

</style>
