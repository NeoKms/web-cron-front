<template>
  <div class="relative mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="overflow-auto px-2">
      <div class="space-y-5">
        <div class="border-b border-gray-900/10">
          <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
            <span>Профиль</span>
          </h2>
        </div>
        <div class="border-b border-gray-900/10 pb-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Смена пароля
          </h2>
          <user-change-pass />
        </div>
        <div class="border-b border-gray-900/10 pb-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Личная информация
          </h2>
          <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
            <div class="sm:col-span-9">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="authStore.user.email"
                  :disabled="true"
                  :prop-validator="v$.name"
                />
              </div>
            </div>
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
              <label class="block text-sm font-medium leading-6 text-gray-900">Secondname (optional)</label>
              <div class="mt-2">
                <common-input-with-validation
                  v-model="formData.secondname"
                  :loading="!!loading"
                  :prop-validator="v$.secondname"
                />
              </div>
            </div>
            <div class="sm:col-span-3 sm:col-start-4">
              <common-button-with-loading class="w-full" :disabled="!changed" @click="save">
                Обновить
              </common-button-with-loading>
            </div>
          </div>
        </div>
      </div>
      <common-loading-full :loading="!!loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '~/store/auth';
import { useUserStore } from '~/store/user';
import { UpdateProfileType } from '~/interfaces';
import { useNotificationStore } from '~/store/notification';
import { errVueHandler } from '~/helpers/errorResponser';
import { getSplittedFio } from '~/helpers';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import rul from '~/helpers/rulesModule';

const authStore = useAuthStore();
const userStore = useUserStore();
const notifStore = useNotificationStore();
const loading = ref(false);
const user = computed<ResponseUserDto>(() => authStore.user as ResponseUserDto);
const save = () => {
  v$.value.$validate();
  console.log(v$.value);
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  return userStore.update(formData.value.id, formData.value)
    .then((res) => {
      if (errVueHandler(res)) {
        notifStore.sendNotif({
          message: 'Профиль обновлен',
          type: 'success',
          duration: 2000,
          position: 'bottom-right'
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const formData = ref<UpdateProfileType>({
  id: user.value.id,
  ...getSplittedFio(user.value.fio),
  phone: user.value.phone
});
const savedFormData = JSON.stringify(formData.value);
const changed = computed<boolean>(() => savedFormData !== JSON.stringify(formData.value));
const rules: SimpleObject = {
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
  }
};
watch(formData.value, () => {
  formData.value.name = formData.value.name.trim().replace(/\s/gi, '');
  formData.value.surname = formData.value.surname.trim().replace(/\s/gi, '');
  formData.value.secondname && (formData.value.secondname = formData.value.secondname.trim().replace(/\s/gi, ''));
});
const v$ = useVuelidate<UpdateProfileType>(rules, formData, {
  $stopPropagation: true,
  $lazy: true,
  $autoDirty: true
});
</script>

<style scoped>

</style>
