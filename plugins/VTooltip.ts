import { defineNuxtPlugin } from '#app';
import { VTooltip } from 'floating-vue';

export default defineNuxtPlugin((app) => {
  app.vueApp.directive('tooltip', VTooltip);
});
