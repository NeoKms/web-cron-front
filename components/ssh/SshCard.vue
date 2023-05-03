<template>
  <div class="col-span-full">
    <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div v-if="!privateKeyFile" class="text-center" @drop="drop">
        <common-my-svg-icon :path="mdiFileKeyOutline" class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        <div class="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            for="file-upload"
            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
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
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
      <div v-else class="text-center">
        {{ privateKeyFile.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { mdiFileKeyOutline } from '@mdi/js';

const uploadFile = ref<HTMLInputElement | null>(null);
const privateKeyFile = ref<File | null>(null);
const changeFileInput = (file?: File) => {
  const fileObj = file || (uploadFile?.value?.files?.length ? uploadFile.value.files[0] : null);
  console.log(fileObj);
  if (fileObj && fileObj.type.includes('application/')) {
    privateKeyFile.value = fileObj;
    console.log(fileObj);
  } else {
    // todo file error
    console.log('errorr');
  }
};
const drop = (evt: DragEvent) => {
  evt.preventDefault();
  evt.stopPropagation();
  const file = evt.dataTransfer?.files[0];
  file && changeFileInput(file);
};
</script>
<style scoped>

</style>
