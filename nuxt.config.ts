export default defineNuxtConfig({
    modules: [
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxtjs/device',
        '@element-plus/nuxt'
    ],
    eslint: {
        /* module options */
    }
    // elementPlus: { /** Options */ },
    // i18n: {
    //     vueI18n: '@/i18n.config.ts
    // },
    // app: {
    //     head: {
    //         charset: 'utf-8',
    //         viewport: 'width=device-width, initial-scale=1',
    //     },
    //     pageTransition: { name: 'page', mode: 'out-in' }
    // }
})
