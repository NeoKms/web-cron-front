import { defineStore } from 'pinia';
import { EnvConfig } from '~/interfaces';

export const useEnvStore = defineStore('envStore', () => {
  const env = ref<EnvConfig>({
    API_HOST: '',
    PRODUCTION: false
  });
  const nuxtServerInit = (): void => {
    Object.keys(env.value).forEach((key) => {
      if (process.env[key]) {
        // @ts-ignore
        env.value[key] = process.env[key];
      }
    });
  };
  return { env, nuxtServerInit };
});
