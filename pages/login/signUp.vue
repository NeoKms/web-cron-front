<template>
  <div class="mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="mt-8 mb-8">
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
                  :loading="!!loading"
                  :prop-validator="v$.email"
                  :autofocus="true"
                  type="email"
                  name="email"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <transition name="mbody">
                <template v-if="codeSent">
                  <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Verify code</label>
                    <div class="mt-2">
                      <common-input-with-validation
                        v-model="formData.code"
                        :loading="!!loading"
                        :prop-validator="v$.code"
                      />
                    </div>
                  </div>
                </template>
              </transition>
              <template v-if="!codeSent">
                <common-button-with-loading class="w-full" :loading="!!loading" @click="sendVerifyCode">
                  Send verify code
                </common-button-with-loading>
              </template>
            </div>
          </div>
        </div>
        <transition name="mbody">
          <div v-if="codeSent" class="border-b border-gray-900/10 pb-5">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div class="mt-2">
                  <common-input-with-validation v-model="formData.name" :loading="!!loading" :prop-validator="v$.name" />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Surname</label>
                <div class="mt-2">
                  <common-input-with-validation
                    v-model="formData.surname"
                    :loading="!!loading"
                    :prop-validator="v$.surname"
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Secondname (optional)</label>
                <div class="mt-2">
                  <common-input-with-validation
                    v-model="formData.secondname"
                    :loading="!!loading"
                    :prop-validator="v$.secondname"
                  />
                </div>
              </div>
              <div class="sm:col-span-9">
                <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <common-input-with-validation
                    v-model="formData.password"
                    :loading="!!loading"
                    :prop-validator="v$.password"
                  />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <nuxt-link to="/login/signIn" class="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </nuxt-link>
        <common-button-with-loading :disabled="!codeSent" :loading="!!loading" @click="sendSignUp">
          Create Account
        </common-button-with-loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { definePageMeta } from '#imports';
import rul from '~/helpers/rulesModule';
import { useAuthStore } from '~/store/auth';
import { errVueHandler } from '~/helpers/errorResponser';
import { SignUpFormDataType } from '~/interfaces';

definePageMeta({
  layout: 'login'
});
const router = useRouter();
const authStore = useAuthStore();
const loading = ref<boolean>(false);
const codeSent = ref(false);

const formData = ref<SignUpFormDataType>({
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
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  surname: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  secondname: {
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  password: {
    required: rul.req,
    minLen: rul.mil(8),
    maxLen: rul.mal(100)
  }
};
watch(formData.value, () => {
  formData.value.email = formData.value.email.toLowerCase().trim();
  formData.value.secondname && (formData.value.secondname = formData.value.secondname.trim());
  formData.value.name = formData.value.name.trim();
  formData.value.surname = formData.value.surname.trim();
});
const v$ = useVuelidate<SignUpFormDataType>(rules, formData, {
  $lazy: true,
  $autoDirty: true
});
const sendVerifyCode = () => {
  v$.value.email.$validate();
  if (v$.value.email.$error) {
    return;
  }
  loading.value = true;
  return authStore.verifyEmail(formData.value.email)
    .then((res) => {
      if (errVueHandler(res)) {
        formData.value.verifyKey = authStore.verifyCode;
        codeSent.value = true;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const sendSignUp = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  return authStore.signUp(formData.value)
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
.mbody-enter-active {
    transition: all 1.3s ease-out;
}

.mbody-leave-active {
    transition: all 1.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.mbody-enter-from,
.mbody-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.vcode-enter-active,
.vcode-leave-active {
    transition: opacity 1.9s ease;
}

.vcode-enter-from,
.vcode-leave-to {
    opacity: 0;
}
</style>
