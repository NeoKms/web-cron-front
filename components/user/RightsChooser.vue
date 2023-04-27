<template>
  <fieldset class="px-2">
    <div class="text-sm font-semibold leading-6 text-gray-900 cursor-default">
      {{ name }}
    </div>
    <div class="pl-2">
      <template v-for="v in [0,1,2]" :key="v">
        <div
          class="flex items-center gap-x-3 cursor-pointer hover:opacity-70"
          :class="{
            'cursor-default': disabled
          }"
          @click="setVal(v)"
        >
          <input
            v-model="prop"
            :disabled="disabled"
            :value="v"
            :name="name"
            type="radio"
            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            :class="{
              'text-indigo-200': disabled,
              'cursor-pointer': !disabled
            }"
          >
          <label
            class="block text-sm font-medium leading-6 text-gray-900"
            :class="
              {'cursor-pointer': !disabled}"
          >{{ rightsTypes[v] }}</label>
        </div>
      </template>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  modelValue: {
    type: Number,
    default: 0,
    required: true
  },
  name: {
    type: String,
    default: '',
    required: true
  }
});
const prop = computed({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
});
const rightsTypes = ['Нет доступа', 'Чтение', 'Чтение и запись'];
const setVal = (v: number) => {
  if (props.disabled) { return; }
  prop.value = v;
};
</script>

<style scoped>

</style>
