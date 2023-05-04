<template>
  <div class="relative mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="space-y-5">
      <div class="border-b border-gray-900/10">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span v-if="isCreate">Добавление пользователя</span>
          <span v-else>Редактирование пользователя</span>
        </h2>
        <div v-if="formData.hasOwnProperty('email')" class="grid grid-cols-1 gap-x-6 sm:grid-cols-6 items-center">
          <div class="sm:col-span-6">
            <label class="block text-sm font-medium leading-6 text-gray-900">Email</label>
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
        </div>
      </div>
      <div class="border-b border-gray-900/10 pb-5">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Личная информация
        </h2>
        <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <common-input-with-validation v-model="formData.name" :loading="!!loading" :prop-validator="v$.name" />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Surname</label>
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
          <div v-if="formData.hasOwnProperty('password')" class="sm:col-span-9">
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
      <div class="border-b border-gray-900/10 pb-5">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Права
        </h2>
        <div class="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-9 items-center">
          <div v-for="(oneRight,ind) in rights" :key="ind" class="sm:col-span-3">
            <user-rights-chooser v-model="formData.rights[oneRight]" :name="oneRight" :disabled="!!loading" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white sticky bottom-2 mt-6 flex items-center justify-end gap-x-6">
      <common-button-with-loading color="red" @click="$router.push('/users')">
        Отмена
      </common-button-with-loading>
      <common-button-with-loading :disabled="!changed" @click="sendSave">
        Сохранить
      </common-button-with-loading>
    </div>
    <common-loading-full :loading="!!(loading||loadingExt)" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import useVuelidate from '@vuelidate/core';
import { CreateUserType, UpdateUserType } from '~/interfaces';
import { copyObject } from '~/helpers';
import rul from '~/helpers/rulesModule';
import { useAuthStore } from '~/store/auth';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';
import { useUserStore } from '~/store/user';
import { errVueHandler } from '~/helpers/errorResponser';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
const props = defineProps({
  card: {
    type: Object as PropType<CreateUserType | UpdateUserType>,
    required: false,
    default: () => ({
      id: 0,
      rights: {},
      email: '',
      name: '',
      surname: '',
      secondname: '',
      phone: '',
      password: ''
    } as CreateUserType)
  },
  loadingExt: {
    type: Boolean,
    default: false,
    required: false
  }
});
const loading = ref(false);
const isCreate = computed<boolean>(() => router.currentRoute.value.fullPath.includes('create'));
const formData = ref<CreateUserType | UpdateUserType>(copyObject(props.card));
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
if (Object.prototype.hasOwnProperty.call(formData.value, 'email')) {
  rules.email = {
    required: rul.req,
    email: rul.email
  };
}
if (Object.prototype.hasOwnProperty.call(formData.value, 'password')) {
  rules.password = {
    required: rul.req,
    minLen: rul.mil(8),
    maxLen: rul.mal(100)
  };
}
watch(formData.value, () => {
  if ((formData.value as CreateUserType).email) {
    (formData.value as CreateUserType).email = (formData.value as CreateUserType).email.toLowerCase().trim();
  }
  if ((formData.value as CreateUserType).password) {
    (formData.value as CreateUserType).password = (formData.value as CreateUserType).password.trim().replace(/\s/gi, '');
  }
  formData.value.secondname && (formData.value.secondname = formData.value.secondname.trim());
  formData.value.name = formData.value.name.trim().replace(/\s/gi, '');
  formData.value.surname = formData.value.surname.trim().replace(/\s/gi, '');
  formData.value.secondname = formData.value?.secondname?.trim()?.replace(/\s/gi, '');
});
const currentUser = computed<ResponseUserDto>(() => authStore.user as ResponseUserDto);
// @ts-ignore
const rights = Object.keys(currentUser.value.rights).filter((r: string) => currentUser.value.rights[r] >= 1);
const v$ = useVuelidate<CreateUserType | UpdateUserType>(rules, formData, {
  $lazy: true,
  $autoDirty: true,
  $stopPropagation: true
});
const sendSave = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  const payload = copyObject<CreateUserType | UpdateUserType>(formData.value);
  if (!payload.phone) {
    delete payload.phone;
  }
  let req = null;
  if (formData.value.id > 0) {
    req = userStore.update(formData.value.id, formData.value as UpdateUserType);
  } else {
    req = userStore.create(formData.value as CreateUserType);
  }
  return req
    .then((res) => {
      if (errVueHandler(res)) {
        router.push('/users');
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>

</style>
