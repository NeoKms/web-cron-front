<template>
  <div class="relative mx-auto sm:max-w-5xl p-8 sm:p-2 sm:mt-10">
    <div class="space-y-5">
      <div class="border-b border-gray-900/10">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span>Добавление задания</span>
        </h2>
      </div>
      <div class="border-b border-gray-900/10 pb-5">
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
      <div class="border-b border-gray-900/10 pb-5">
        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-5">
          <span>Расписание</span>
        </h2>
        {{ formData.time }}
        <div class="mt-5 grid grid-cols-1 gap-x-2 lg:grid-cols-5 gap-y-0 items-center">
          <div class="col-span-1">
            <common-input-with-validation
              v-model="formData.time.minute.value"
              :loading="!!loading"
              :prop-validator="v$.minute"
              placeholder="min (0-59)"
            >
              <template #append>
                <common-button-toggle v-model="formData.time.minute.period" class="w-full scale-105">
                  <div class="flex items-center justify-center">
                    <common-my-svg-icon class="h-4 w-4" :path="mdiSlashForward" />
                    <common-my-svg-icon class="h-3 w-3" :path="mdiAsterisk" />
                  </div>
                </common-button-toggle>
              </template>
            </common-input-with-validation>
          </div>
          <div class="col-span-1">
            <common-input-with-validation
              v-model="formData.time.hour.value"
              :loading="!!loading"
              :prop-validator="v$.hour"
              placeholder="hour (0-23)"
            >
              <template #append>
                <common-button-toggle v-model="formData.time.hour.period" class="w-full scale-105">
                  <div class="flex items-center justify-center">
                    <common-my-svg-icon class="h-4 w-4" :path="mdiSlashForward" />
                    <common-my-svg-icon class="h-3 w-3" :path="mdiAsterisk" />
                  </div>
                </common-button-toggle>
              </template>
            </common-input-with-validation>
          </div>
          <div class="col-span-1">
            <common-input-with-validation
              v-model="formData.time.day.value"
              :loading="!!loading"
              :prop-validator="v$.day"
              placeholder="day of month (1-31)"
            >
              <template #append>
                <common-button-toggle v-model="formData.time.day.period" class="w-full scale-105">
                  <div class="flex items-center justify-center">
                    <common-my-svg-icon class="h-4 w-4" :path="mdiSlashForward" />
                    <common-my-svg-icon class="h-3 w-3" :path="mdiAsterisk" />
                  </div>
                </common-button-toggle>
              </template>
            </common-input-with-validation>
          </div>
          <div class="col-span-1">
            <common-input-with-validation
              v-model="formData.time.month.value"
              :loading="!!loading"
              :prop-validator="v$.month"
              placeholder="month (1-12)"
            >
              <template #append>
                <common-button-toggle v-model="formData.time.month.period" class="w-full scale-105">
                  <div class="flex items-center justify-center">
                    <common-my-svg-icon class="h-4 w-4" :path="mdiSlashForward" />
                    <common-my-svg-icon class="h-3 w-3" :path="mdiAsterisk" />
                  </div>
                </common-button-toggle>
              </template>
            </common-input-with-validation>
          </div>
          <div class="col-span-1">
            <common-input-with-validation
              v-model="formData.time.weekDay.value"
              :loading="!!loading"
              :prop-validator="v$.weekDay"
              placeholder="day of week (0-6)"
            >
              <template #append>
                <common-button-toggle v-model="formData.time.weekDay.period" class="w-full scale-105">
                  <div class="flex items-center justify-center">
                    <common-my-svg-icon class="h-4 w-4" :path="mdiSlashForward" />
                    <common-my-svg-icon class="h-3 w-3" :path="mdiAsterisk" />
                  </div>
                </common-button-toggle>
              </template>
            </common-input-with-validation>
          </div>
        </div>
        <div class="w-full items-center flex justify-end">
          <common-button-with-loading color="yellow" @click="panelRight=true">
            Шаблоны
          </common-button-with-loading>
        </div>
      </div>
    </div>
    <div class="bg-white sticky bottom-0 py-2 mt-6 flex items-center justify-end gap-x-6">
      <common-button-with-loading color="red" @click="$router.push('/jobs')">
        Отмена
      </common-button-with-loading>
      <common-button-with-loading :disabled="!changed" @click="save">
        Сохранить
      </common-button-with-loading>
    </div>
    <common-loading-full :loading="!!loading" />
    <common-panel-right v-model="panelRight">
      <template #title>
        Шаблоны расписания крона
      </template>
      <button-with-loading v-for="(btn,index) in cronJobsTemplates" :key="index">
        {{ btn.name }}
      </button-with-loading>
    </common-panel-right>
  </div>
</template>

<script setup lang="ts">

import useVuelidate from '@vuelidate/core';
import { useRouter } from '#app';
import { mdiAsterisk, mdiSlashForward } from '@mdi/js';
import { CreateJobType } from '~/interfaces';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import rul from '~/helpers/rulesModule';
import { errVueHandler } from '~/helpers/errorResponser';
import { useJobStore } from '~/store/job';
import ButtonWithLoading from '~/components/common/ButtonWithLoading.vue';

const jobStore = useJobStore();
const router = useRouter();
const loading = ref(false);
const formData = ref<CreateJobType>({
  job: '',
  sshEntityId: -1,
  time: {
    minute: {
      period: false,
      value: ''
    },
    hour: {
      period: false,
      value: ''
    },
    day: {
      period: false,
      value: ''
    },
    month: {
      period: false,
      value: ''
    },
    weekDay: {
      period: false,
      value: ''
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
  },
  time: {
    minute: {
      required: rul.req,
      minVal: rul.miv(0),
      maxVal: rul.mav(59)
    },
    hour: {
      required: rul.req,
      minVal: rul.miv(0),
      maxVal: rul.mav(23)
    },
    day: {
      required: rul.req,
      minVal: rul.miv(1),
      maxVal: rul.mav(31)
    },
    month: {
      required: rul.req,
      minVal: rul.miv(1),
      maxVal: rul.mav(12)
    },
    weekDay: {
      required: rul.req,
      minVal: rul.miv(0),
      maxVal: rul.mav(6)
    }
  }
};
const v$ = useVuelidate<CreateJobType>(rules, formData, {
  $lazy: true,
  $autoDirty: true,
  $stopPropagation: true
});
console.log(v$);
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
const panelRight = ref(false);
const cronJobsTemplates = ref([
  {
    name: 'Каждую минуту'
  }
]);
</script>

<style scoped>

</style>
