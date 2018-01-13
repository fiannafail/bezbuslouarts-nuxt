<template lang="pug">
section(class="partnership-section")
  p(v-lang.cooperation)
  div(class="wrapper")
    div(class="description")
      h2(class="section-headline") {{ language === 'ru' ? sectionsMeta.Partners.title : sectionsMeta.Partners.titleEN }}
      p(class="red-text") {{ language === 'ru' ? sectionsMeta.Partners.subheader : sectionsMeta.Partners.subheaderEN}}
      p {{ language === 'ru' ? sectionsMeta.Partners.text : sectionsMeta.Partners.textEN}}
      no-ssr
        carousel(:perPage="3" class="partners")
          slide(v-for="(item, index) in Partners" :key="index")
            div
            img(v-lazy="item.url")
    div(class="partners-slider")
      v-carousel(delimiter-icon="remove" hide-controls :lazy="true")
        v-carousel-item(v-for="(item, index) in PartnersImages" v-bind:src="item.image" :key="index")
  </template>
<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'

export default {
  components: {
    'no-ssr': NoSSR,
    Carousel,
    Slide
  },
  computed: mapState({
    PartnersImages: 'partnersImages',
    Partners: 'partners',
    sectionsMeta: 'sectionsMeta'
  })
}
</script>
<style lang="scss">
  
</style>