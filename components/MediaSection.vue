<template lang="pug">
  section(class="media-section")
    p(v-lang.massMedia)
    h1(class="section-headline" v-lang.written)
    no-ssr
      carousel(:perPage="4")
        slide(v-for="(item, index) in Issues" :key="index")
          div
            a(:href="item.url")
              img(v-lazy="item.image")
              div(class="meta-info")
                h3 {{ language === 'ru' ? item.title : item.titleEN }}
                p {{ language === 'ru' ? item.magazine : item.magazineEN }}
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'

export default {
  computed: mapState({
    Issues: 'issues'
  }),
  components: {
    'no-ssr': NoSSR,
    Carousel,
    Slide
  }
}
</script>
<<style lang="scss">
	
</style>