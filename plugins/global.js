import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import VueCarousel from 'vue-carousel'
var VueScrollTo = require('vue-scrollto')

Vue.use(VueYoutube)
Vue.use(VueCarousel)

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 1250,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
