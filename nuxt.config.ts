// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: '2024-04-03',

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
    '@nuxthub/core',
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
  }
})
