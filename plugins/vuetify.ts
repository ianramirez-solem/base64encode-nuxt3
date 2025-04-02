import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: false,
          colors: {
            background: '#031926',
            primary: '#468189',
            secondary: '#77ACA2',
            selected: '#F4E9CD'
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
