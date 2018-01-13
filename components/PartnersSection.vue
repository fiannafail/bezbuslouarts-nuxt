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
.partnership-section {
  background-color: #202020;
  margin-top: 150px;
  padding-bottom: 125px;
  .partners {
    img {
      width: 120px;
      filter: grayscale(100%)
    }
    .VueCarousel-inner {
      align-items: center;
    }
  }
  .partners-slider {
    padding-top: 70px;
  }
  .carousel {
    height: 450px;
    box-shadow: none;
    .carousel__item {
      height: calc(100% - 50px);
    }
  }
  .wrapper {
    width: 1180px;
    margin: 0 auto;
    display: flex;
    & > * {
      width: 50%
    }
  }
  .description {
    padding: 55px 0;
    padding-right: 65px;
    p {
      color: #bbbbbb;
      font-family: 'Open Sans';
      font-size: 14px;
      line-height: 1.93;
      color: #bbbbbb;
    }
    .red-text {
      @include red-text;
      margin: 25px 0;
      margin-top: 10px;
    }
  }
  & > p {
    @include red-text;
    text-align: center;
    margin-top: 25px;
  }
  &:before {
    @include red-line;
    position: relative;
    left: calc(50% - 1px);
  }
}
</style>