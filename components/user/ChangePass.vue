<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import rul from '~/helpers/rulesModule';
import { ChangePasswordDto } from '~/interfaces/apiTypes/auth/dto/change-password.dto';
import { errVueHandler } from '~/helpers/errorResponser';
import { useAuthStore } from '~/store/auth';
import { useNotificationStore } from '~/store/notification';

const authStore = useAuthStore();
const notifStore = useNotificationStore();
const formData = ref<ChangePasswordDto>({
  current: '',
  new: '',
  newTwice: ''
});
const rules: SimpleObject = {
  current: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  new: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  newTwice: {
    sameAsNew: rul.same(computed(() => formData.value.new), 'новым паролем')
  }
};
const v$ = useVuelidate<ChangePasswordDto>(rules, formData, {
  $stopPropagation: true,
  $lazy: true,
  $autoDirty: true
});
const loading = ref(false);
watch(formData.value, () => {
  formData.value.current = formData.value.current.trim().replace(/\s/gi, '');
  formData.value.new = formData.value.new.trim().replace(/\s/gi, '');
});
const send = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  return authStore.changePassword(formData.value)
    .then((res) => {
      if (errVueHandler(res)) {
        notifStore.sendNotif({
          message: 'Пароль обновлен',
          type: 'success',
          duration: 2000,
          position: 'bottom-right'
        });
        formData.value.new = '';
        formData.value.current = '';
        formData.value.newTwice = '';
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
    <div class="sm:col-span-3">
      <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Текущий</label>
      <div class="mt-2">
        <common-input-with-validation
          v-model="formData.current"
          :loading="!!loading"
          type="password"
          :prop-validator="v$.current"
        />
      </div>
    </div>
    <div class="sm:col-span-3">
      <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Новый</label>
      <div class="mt-2">
        <common-input-with-validation
          v-model="formData.new"
          :loading="!!loading"
          type="password"
          :prop-validator="v$.new"
        />
      </div>
    </div>
    <div class="sm:col-span-3">
      <label class="block text-sm font-medium leading-6 text-gray-900">Повторить новый</label>
      <div class="mt-2">
        <common-input-with-validation
          v-model="formData.newTwice"
          :loading="!!loading"
          type="password"
          :prop-validator="v$.newTwice"
        />
      </div>
    </div>
    <div class="sm:col-span-3 sm:col-start-4">
      <common-button-with-loading color="orange" class="w-full" :loading="!!loading" @click="send">
        Изменить
      </common-button-with-loading>
    </div>
  </div>
</template>

<style scoped>

</style>
