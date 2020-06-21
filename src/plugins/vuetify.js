// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.blue.lighten4,
        accent: colors.indigo.base
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
}

export default new Vuetify(opts)