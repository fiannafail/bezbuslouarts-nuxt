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
<style lang="scss" scoped>
@mixin red-line {
  margin-top: 18px;
  display: block;
  content: "";
  height: 125px;
  width: 2px;
  background-color: #e02106;
}
@mixin red-text {
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  color: #e02106;
  text-transform: uppercase;
}
	.media-section {
  height: 800px;
  background-color: #222222;
  & > p {
    @include red-text;
    margin-top: 25px;
    text-align: center;
  }
  .section-headline {
    text-align: center;
    margin-bottom: 60px;
  }
  .meta-info {
    text-align: left;
    padding: 20px;
  }
  img {
    width: 100%
  }
  .VueCarousel-slide {
    max-height: 350px;
    .meta-info {
      h3 {
        color: #ffffff;
        font-family: Merriweather;
        font-size: 14px;
        line-height: 1.57;
      }
      p {
        color: #bababa;
        font-family: Open Sans;
        font-size: 13px;
        line-height: 1.92;
        margin-bottom: 0;
      }
      width: 100%;
    }
    & > div {
      border: solid 1px #4d4d4d;
      border-radius: 3px;
      margin: 15px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
  .VueCarousel {
    width: 1180px;
    margin: 0 auto;
  }
  &:before {
    @include red-line;
    position: relative;
    left: calc(50% - 1px);
  }
}
</style>