import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
    }
  ],
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
