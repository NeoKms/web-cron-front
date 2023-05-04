<template>
  <div class="relative mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="space-y-5">
      <div class="border-b border-gray-900/10">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span>Добавление сервера</span>
        </h2>
      </div>
      <div class="border-b border-gray-900/10">
        <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-2">
              <common-input-with-validation
                v-model="formData.username"
                :loading="!!loading"
                :prop-validator="v$.username"
                placeholder="root"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Host</label>
            <div class="mt-2">
              <common-input-with-validation
                v-model="formData.host"
                :loading="!!loading"
                :prop-validator="v$.host"
                placeholder="192.168.1.1"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Port</label>
            <div class="mt-2">
              <common-input-with-validation
                v-model="formData.port"
                :loading="!!loading"
                :prop-validator="v$.port"
                placeholder="22"
              />
            </div>
          </div>
          <div class="sm:col-span-9">
            <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <div class="mt-2">
              <common-textarea-with-validation
                v-model="formData.description"
                :loading="!!loading"
                :prop-validator="v$.description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-full">
        <div
          class="mt-2 flex justify-center rounded-lg border px-6 py-10 relative h-48"
          :class="{
            'bg-gray-200': dragInProgress||loading,
            'border-red-600': v$.privateKey.$errors.length,
            'border-gray-900/25 border-dashed': !v$.privateKey.$errors.length
          }"
          @drop="drop"
          @dragover="$event.preventDefault()"
          @dragenter="dragInProgress=true"
          @dragleave="dragInProgress=false"
        >
          <div
            v-if="!formData.privateKey"
            class="text-center"
          >
            <common-my-svg-icon :path="mdiFileKeyOutline" class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a SSH private key file</span>
                <input
                  id="file-upload"
                  ref="uploadFile"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="changeFileInput()"
                >
              </label>
              <p class="pl-1">
                or drag and drop
              </p>
            </div>
            <p class="text-xs leading-5 text-gray-600">
              OpenSSH, PuTTY etc.
            </p>
          </div>
          <div v-else class="flex justify-center items-center">
            <span>{{ formData.privateKey.name }}</span>
            <common-my-svg-icon
              :path="mdiTrashCanOutline"
              class="cursor-pointer text-red-500 hover:scale-105 rounded-2xl"
              @click="formData.privateKey=null"
            />
          </div>
        </div>
        <div
          v-if="v$.privateKey.$errors.length"
          class="mt-0.5 h-[22px] absolute overflow-hidden leading-[0.5rem] px-2"
        >
          <span v-tooltip="v$.privateKey.$errors[0].$message" class="text-xs leading-[0.6rem] text-red-500">{{
            v$.privateKey.$errors[0].$message
          }}</span>
        </div>
      </div>
    </div>
    <div class="bg-white sticky bottom-2 mt-6 flex items-center justify-end gap-x-6">
      <common-button-with-loading color="red" @click="$router.push('/ssh')">
        Отмена
      </common-button-with-loading>
      <common-button-with-loading :disabled="!changed" @click="save">
        Сохранить
      </common-button-with-loading>
    </div>
    <common-loading-full :loading="!!loading" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app';
import { mdiFileKeyOutline, mdiTrashCanOutline } from '@mdi/js';
import useVuelidate from '@vuelidate/core';
import { useNotificationStore } from '~/store/notification';
import { CreateSshType } from '~/interfaces';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import rul from '~/helpers/rulesModule';
import { useSshStore } from '~/store/ssh';
import { errVueHandler } from '~/helpers/errorResponser';

const notifStore = useNotificationStore();
const sshStore = useSshStore();
const uploadFile = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const router = useRouter();
const dragInProgress = ref<boolean>(false);
const formData = ref<CreateSshType>({
  host: '',
  port: 22,
  username: '',
  description: '',
  privateKey: null
});
watch(formData.value, () => {
  formData.value.host = formData.value.host.trim().replace(/\s/gi, '');
  formData.value.username = formData.value.username.trim().replace(/\s/gi, '');
  formData.value.description = formData.value?.description?.trim()?.replace(/\s/gi, '');
});
const savedFormData = JSON.stringify(formData.value);
const changed = computed<boolean>(() => savedFormData !== JSON.stringify(formData.value));
const rules: SimpleObject = {
  username: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(100)
  },
  host: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(100),
    ip: rul.ip
  },
  port: {
    minLen: rul.mil(2),
    maxLen: rul.mal(6)
  },
  privateKey: {
    required: rul.req
  }
};
const v$ = useVuelidate<CreateSshType>(rules, formData, {
  $lazy: true,
  $autoDirty: true,
  $stopPropagation: true
});
const changeFileInput = (file?: File) => {
  const fileObj = file || (uploadFile?.value?.files?.length ? uploadFile.value.files[0] : null);
  if (fileObj && (fileObj.type.includes('application/') || fileObj.type === '')) {
    formData.value.privateKey = fileObj;
  } else {
    notifStore.sendNotif({
      message: 'Неверный тип файла',
      type: 'error',
      duration: 1500,
      position: 'bottom-right'
    });
  }
};
const drop = (evt: DragEvent) => {
  dragInProgress.value = false;
  if (formData.value.privateKey || loading.value) {
    return;
  }
  evt.preventDefault();
  evt.stopPropagation();
  const file = evt.dataTransfer?.files[0];
  file && changeFileInput(file);
};
const save = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  return sshStore.create(formData.value)
    .then((res) => {
      if (errVueHandler(res)) {
        router.push('/ssh');
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style scoped>

</style>
