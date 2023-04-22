import { NuxtConfig } from '@nuxt/schema';

const config: NuxtConfig = {
  app: {
    head: {
      title: 'WebCron',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device'
    // '@nuxtjs/axios'
  ],
  // axios: {},
  eslint: {},
  i18n: {
    vueI18n: './plugins/i18n/i18n.config.ts'
  },
  tailwindcss: {
    cssPath: './assets/css/tailwind.css',
    configPath: './tailwind.config.js',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true
  }
};
if (process.env.NODE_ENV === 'development') {
  config.devServer = {
    port: 82,
    host: 'vlad.dev.lan'
  };
}

// @ts-ignore
export default defineNuxtConfig(config);
