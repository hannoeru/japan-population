// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: '2024-08-14',

  // https://nuxt.com/docs/api/nuxt-config#future
  future: {
    // https://nuxt.com/docs/api/nuxt-config#compatibilityversion
    compatibilityVersion: 4,
  },

  // https://nuxt.com/docs/api/nuxt-config#modules-1
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
  ],

  // https://devtools.nuxt.com/guide/getting-started
  devtools: { enabled: true },

  // https://nuxt.com/docs/api/nuxt-config#css
  css: [
    '@unocss/reset/tailwind.css',
  ],

  // https://eslint.nuxt.com/packages/module
  eslint: {
    config: {
      standalone: false,
    },
  },

  // https://nuxt.com/docs/api/nuxt-config#runtimeconfig-1
  runtimeConfig: {
    public: {
      siteUrl: 'https://japan-population.hanlee.co/',
    },
    resasApiKey: '',
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    // https://hub.nuxt.com/docs/features/cache
    cache: true,
  },

  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: '',
  },

  nitro: {
    routeRules: {
      '/': {
        prerender: true,
      },
    },
  },
})
