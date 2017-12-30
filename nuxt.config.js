const nodeExternals = require('webpack-node-externals')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Mono:600|Open+Sans:600|Merriweather:700|Material+Icons|PT+Serif+Caption&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.2/css/all.css' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/global.js',
    '~/plugins/functions.js',
    //  { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/firebase-client-init.js', ssr: false },
    { src: '~/plugins/multilanguage.js', ssr: false },
    { src: '~/plugins/auth-cookie.js', ssr: false }
  ],
  serverMiddleware: [
    '~/serverMiddleware/validateFirebaseIdToken'
  ],
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: [
      'axios',
      '~/plugins/firebase-client-init.js'
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-audio/]
          })
        ]
      }
    }
  }
}
