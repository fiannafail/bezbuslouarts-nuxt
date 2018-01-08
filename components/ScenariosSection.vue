<template lang="pug">
  section(class="scenarios-section")
    div(class="wrapper")
      div(class="covers")
        img(v-lazy="bg")
      div(class="text")
        h2(class="section-headline") {{ language === 'ru' ? sectionsMeta.Scenarios.title : sectionsMeta.Scenarios.titleEN }}
        p(class="red-text") {{ language === 'ru' ? sectionsMeta.Scenarios.subtitle : sectionsMeta.Scenarios.subtitleEN }}
        p(class="section-text") {{ language === 'ru' ? sectionsMeta.Scenarios.text : sectionsMeta.Scenarios.textEN }}
        p(class="section-text bold") АВТОР БОЛЕЕ 20 СЦЕНАРИЕВ, СРЕДИ КОТОРЫХ
        ul(class="scenarios-list")
          li(v-for="(item, index) in scenariosMovies") {{ language === 'ru' ? item.title : item.titleEN }}
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    bg: 'https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/covers.png?alt=media&token=aeaee04d-9b1e-4e9d-93a2-597b18b81b06'
  }),
  computed: mapState({
    sectionsMeta: 'sectionsMeta',
    scenariosMovies: 'scenariosMovies',
    language: 'language'
  })
}
</script>
<style lang="scss" scoped>
@mixin red-text {
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  color: #e02106;
  text-transform: uppercase;
}
@mixin red-line {
  margin-top: 18px;
  display: block;
  content: "";
  height: 125px;
  width: 2px;
  background-color: #e02106;
}
.scenarios-section {
  background-color: #181818;
  padding: 130px 0;
  position: relative;
  .scenarios-list {
    list-style-type: none;
    color: #bbbbbb;
    columns: 2;
    line-height: 1.93;
    li::before {
      content: '一 '
    }
  }
  &::before {
    @include red-line;
    margin-top: 0;
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
  }
  .wrapper {
    width: 1180px;
    margin: 0 auto;
    display: flex;
    .covers {
      padding-right: 75px;
      img {
          width: 100%;
      }
    }
    .section-text {
      font-family: Open Sans;
      font-size: 14px;
      line-height: 1.93;
      margin: 30px 0;
      color: #bbbbbb;
      &.bold {
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 15px;
      }
    }
    .red-text {
      @include red-text;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    & > * {
      width: 50%;
      margin-top: 10px;
    }
  }
}
</style>
