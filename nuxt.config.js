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
      { rel: 'shortcut icon', sizes: '256x256', href: 'https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/favicon.png?alt=media&token=09622d81-4585-45f7-bb08-1b33df903ca9' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono:600|Open+Sans:500,600|Merriweather:700|Material+Icons|PT+Serif+Caption&amp;subset=cyrillic' },
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
