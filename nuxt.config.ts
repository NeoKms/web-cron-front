import { NuxtConfig } from '@nuxt/schema'
import { ConfigInterface } from '~/interfaces'

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
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@element-plus/nuxt'
  ],
  eslint: {},
  i18n: {
    vueI18n: './plugins/i18n/i18n.config.ts'
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss'
  },
  runtimeConfig: {
    public: {
      API_HOST: process.env.API_HOST,
      PRODUCTION: false
    } as ConfigInterface
  }
}
if (process.env.NODE_ENV === 'development') {
  config.devServer = {
    port: 82,
    host: 'vlad.dev.lan'
  }
}

// @ts-ignore
export default defineNuxtConfig(config)
