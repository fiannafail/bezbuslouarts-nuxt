<template lang="pug">
section(class="soundtrack-section")
  div(class="wrapper")
    div(class="description")
      h2(class="section-headline") {{ language === 'ru' ? sectionsMeta.Soundtrack.title : sectionsMeta.Soundtrack.titleEN }}
      p(class="red-text") {{ language === 'ru' ? sectionsMeta.Soundtrack.subtitle : sectionsMeta.Soundtrack.subtitleEN }}
      p {{ language === 'ru' ? sectionsMeta.Soundtrack.text : sectionsMeta.Soundtrack.textEN }}
    div(class="soundtracks")
      div
        div(v-for="(item, index) in Soundtracks" class="audio-controls")
          div
            div(class="track-meta")
              span {{ language === 'ru' ? item.singer : item.singerEN }}
              span {{ language === 'ru' ? item.title : item.titleEN}}
          no-ssr
            vue-audio(:file="item.url")
</template>
<script>
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'
import VueAudio from 'vue-audio'

export default {

  data: () => ({
  }),
  computed: mapState({
    Soundtracks: 'soundtracks',
    sectionsMeta: 'sectionsMeta'
  }),
  components: {
    'no-ssr': NoSSR,
    'vue-audio': VueAudio
  }
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
.soundtrack-section {
  .red-text {
    @include red-text;
    padding: 8px 0;
  }
  .track-meta {
    color: white;
  }
  .wrapper {
    width: 1140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    .soundtracks {
      width: calc(50% - 50px);
      padding-left: 50px;
    }
    .description {
      width: 50%;
    }
    .soundtracks, .description {
      .section-headline {
        line-height: 1.63;
      }
      padding-top: 135px;
      max-width: 50%;
      color: #bbbbbb;
      font-family: Open Sans;
      font-size: 14px;
      line-height: 1.93;
    }
    &:before{
      @include red-line;
      margin-top: 0;
      position: absolute;
    }
  }

  background-color: #202020;
  height: 600px;
}
</style>
