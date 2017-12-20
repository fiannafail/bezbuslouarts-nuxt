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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Mono:600|Open+Sans:600|Material+Icons|PT+Serif+Caption&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/functions.js',
    //  { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/firebase-client-init.js', ssr: false },
    { src: '~/plugins/auth-cookie.js', ssr: false }
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
    }
  }
}
