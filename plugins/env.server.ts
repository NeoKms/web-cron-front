import { useEnvStore } from '~/store/env';

export default defineNuxtPlugin(() => useEnvStore().nuxtServerInit());
