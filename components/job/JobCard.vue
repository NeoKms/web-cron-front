<template>
  <div class="relative mx-auto sm:max-w-2xl p-8 sm:p-2">
    <div class="space-y-5">
      <div class="border-b border-gray-900/10">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span>Добавление задания</span>
        </h2>
      </div>
      <div class="border-b border-gray-900/10">
        <div class="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-9 items-center">
          <div class="col-span-full">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Job</label>
            <div class="mt-2">
              <common-input-with-validation
                v-model="formData.job"
                :loading="!!loading"
                :prop-validator="v$.job"
                placeholder="ls -a"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white sticky bottom-2 mt-6 flex items-center justify-end gap-x-6">
      <common-button-with-loading color="red" @click="$router.push('/jobs')">
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

import useVuelidate from '@vuelidate/core';
import { useRouter } from '#app';
import { mdiFileKeyOutline, mdiTrashCanOutline } from '@mdi/js';
import { CreateJobType } from '~/interfaces';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import rul from '~/helpers/rulesModule';
import { errVueHandler } from '~/helpers/errorResponser';
import { useJobStore } from '~/store/job';

const jobStore = useJobStore();
const router = useRouter();
const loading = ref(false);
const formData = ref<CreateJobType>({
  job: '',
  sshEntityId: -1,
  time: {
    minute: {
      period: false,
      value: 0
    },
    hour: {
      period: false,
      value: 0
    },
    day: {
      period: false,
      value: 0
    },
    month: {
      period: false,
      value: 0
    },
    weekDay: {
      period: false,
      value: 0
    }
  }
});
const savedFormData = JSON.stringify(formData.value);
const changed = computed<boolean>(() => savedFormData !== JSON.stringify(formData.value));
const rules: SimpleObject = {
  job: {
    required: rul.req,
    minLen: rul.mil(2),
    maxLen: rul.mal(500)
  },
  sshEntityId: {
    required: rul.req,
    isNum: rul.num
  }
};
const v$ = useVuelidate<CreateJobType>(rules, formData, {
  $lazy: true,
  $autoDirty: true,
  $stopPropagation: true
});
const save = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  loading.value = true;
  return jobStore.create(formData.value)
    .then((res) => {
      if (errVueHandler(res)) {
        router.push('/jobs');
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>

</style>
