<template>
  <el-config-provider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, watch } from 'vue'
import RuLocale from 'element-plus/es/locale/lang/ru'
import EnLocale from 'element-plus/es/locale/lang/en'
const i18n = useI18n()
const title = computed(() => i18n.t('title'))
watch(title, (): void => {
  document.title = title.value
})
const locale = computed(() => {
  return {
    ru: RuLocale,
    en: EnLocale
  }[i18n.locale.value]
})
</script>
<style>
.page-enter-active,
.page-leave-active {
    transition: all 1s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
