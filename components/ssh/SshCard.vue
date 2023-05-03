<template>
  <div class="relative mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="space-y-5">
      <div class="border-b border-gray-900/10">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span>Добавление сервера</span>
        </h2>
      </div>
      <div class="border-b border-gray-900/10 pb-5">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Личная информация
        </h2>
        <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Surname</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Secondname (optional)</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-9">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <common-input-with-validation />
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
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Surname</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Secondname (optional)</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
          <div class="sm:col-span-9">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <common-input-with-validation />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-full">
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          :class="{
            'bg-gray-200': dragInProgress
          }"
          @drop="drop"
          @dragover="$event.preventDefault()"
          @dragenter="dragInProgress=true"
          @dragleave="dragInProgress=false"
        >
          <div
            v-if="!privateKeyFile"
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
          <div v-else class="text-center">
            {{ privateKeyFile.name }}
          </div>
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
import { mdiFileKeyOutline } from '@mdi/js';
import { useNotificationStore } from '~/store/notification';

const notifStore = useNotificationStore();
const uploadFile = ref<HTMLInputElement | null>(null);
const privateKeyFile = ref<File | null>(null);
const loading = ref(false);
const dragInProgress = ref<boolean>(false);
const changeFileInput = (file?: File) => {
  const fileObj = file || (uploadFile?.value?.files?.length ? uploadFile.value.files[0] : null);
  console.log(fileObj);
  if (fileObj && (fileObj.type.includes('application/') || fileObj.type === '')) {
    privateKeyFile.value = fileObj;
    console.log(fileObj);
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
  if (privateKeyFile.value) { return; }
  evt.preventDefault();
  evt.stopPropagation();
  const file = evt.dataTransfer?.files[0];
  file && changeFileInput(file);
};
const changed = computed(() => false);
const save = () => {
  // todo
};
</script>
<style scoped>

</style>
