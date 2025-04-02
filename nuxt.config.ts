import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
    }
  ],
  build: { transpile: ["vuetify"] },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
