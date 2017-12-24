<template lang="pug">
    div(class="wrapper")
      section(class="header-section")
        header-section
      section(class="preview-photos")
        div(v-for="(item, index) in Movies" class="photo")
          div(class="photo-meta")
            h2 {{ item.title }}
          img(:src="item.image")
      section(class="movies-section" id="movies")
        v-tabs(v-model="active" centered)
          v-tabs-items
            v-tabs-content(
              v-for="(tab, i) in Movies"
              :key="i"
              :id="tab.key")
              v-card(flat)
                div(class="image-container"
                    v-bind:style="{ backgroundImage: showMovieTrailer === false && showMovieInfo === false ? 'url(' + tab.image + ')' : 'none' }"
                    v-if="")
                div(class="movie-meta")
                  div(class="movie-info")
                    p {{ tab.year }}
                    h2 {{ tab.title }}
                  div(class="movie-wrap")
                    div(class="movie-expand" v-if="showMovieTrailer === false && showMovieInfo === false")
                      p(@click="showMovieInfo = true" class="arrow-right") О фильме
                      p(@click="showMovieTrailer = true" class="arrow-right") Смотреть трейлер
                transition(name="fadeIn")
                  div(class="movie-expanded-trailer" v-if="showMovieTrailer === true")
                    youtube(:video-id="getId(tab.trailer)" width="1140" height="600" ref="youtube" @playing="playing")
                transition(name="fadeIn")
                  div(class="movie-expanded-info" v-if="showMovieInfo === true")
                    div(class="movie-info")
                      h2 {{ tab.title }}
                      p {{ tab.year }}
                      p {{ tab.descr }}
                    div(class="movie-shots")
                      img(:src="tab.thumb1")
                      img(:src="tab.thumb2")
                      img(:src="tab.thumb3")
                      img(:src="tab.thumb4")
                      img(:src="tab.thumb5")
                      img(:src="tab.thumb6")
            div(class="movie-footer")
              p(@click="showMovieInfo === true ? showMovieInfo = false : showMovieTrailer = false" v-if="showMovieInfo === true || showMovieTrailer === true" class="backlink arrow-left") Назад к проектам
              p(v-if="showMovieTrailer === true" class="backlink arrow-right" @click="showMovieInfo = true, showMovieTrailer = false") О фильме
            v-tabs-bar(dark v-if="showMovieInfo !== true && showMovieTrailer !== true")
              v-tabs-item(
                  v-for="(tab, index) in Movies"
                  :key="index"
                  :href="'#' + tab.key")
      section(class="partnership-section")
        p Сотрудничество
        div(class="wrapper")
          div(class="description")
            h2(class="section-headline") Партнерство в кино
            p(class="red-text") Product Placement
            p Начиная с “Вышэй за неба”, BezBuslou arts занимается интеграцией брендов в кино. Дальше будет еще n-ое количество строк текста о том, что это такое. Заключающийся в том, что реквизит, которым пользуются герои в фильмах, телевизионных передачах, компьютерных играх, музыкальных клипах, книгах, на иллюстрациях и картинах — имеет реальный коммерческий аналог. Обычно демонстрируется сам рекламируемый продукт, либо его логотип, или упоминается о его хорошем качестве. В профессиональной литературе product placement принято обозначать аббревиатурой PP. В product placement принято выделять несколько основных составляющих. В product placement принято выделять несколько основных составляющих: источник (компания-заказчик), сообщение (подразумеваются типы и виды РР), канал (любой телевизионный продукт), получатель (целевая аудитория выбранного канала)
          div(class="slider")
      section(class="soundtrack-section")
        div(class="wrapper")
          div(class="description")
            h2(class="section-headline") Разработка музыки и саундтреков
            p Текст про то, как можно заказать разработку музыки и саундтреков от такого талантилвого музыканта, как Дмитрий. Ключевые моменты какие-то. Звуковая дорожка — музыкальное сопровождение какого-либо материала: фильма, мюзикла, аниме, телепередачи, компьютерной игры, книги и так далее, а также музыкальный альбом содержащий композиции из данного произведения.
          div(class="soundtracks")
            div
              div(v-for="(item, index) in Soundtracks" class="audio-controls")
                no-ssr
                div
                  div(class="track-meta")
                    span {{ item.Singer }}
                    span {{ item.Title }}
                vue-audio(file="https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/ShibayanRecords%20nachi%20%E3%81%A8%E3%81%B3%E3%81%A0%E3%81%9B%E3%83%90%E3%83%B3%E3%82%AD%E3%83%83%E3%82%AD(Casual%20Killer%20remix).mp3?alt=media&token=b8b0c32f-abdc-4621-a076-50db4a9bcbb5")
      section(class="media-section")
        p СМИ
        h1(class="section-headline") О нас пишут
        no-ssr
          carousel(perPage="4")
            slide(v-for="(item, index) in Issues" :key="index")
              div
                img(:src="item.image")
                div(class="meta-info")
                  h3 {{ item.title }}
                  p {{ item.magazine }}
</template>

<script>
//  import axios from '~/plugins/axios'
import HeaderSection from '../components/HeaderSection'
import VueAudio from 'vue-audio'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'

require('vue-animate-transitions/dist/vue-animate-transitions.min.css')
export default {
  async asyncData ({ store }) {
    return Promise.all([
      store.dispatch('getPreviewPhotos'),
      store.dispatch('getMovies'),
      store.dispatch('getIssues'),
      store.dispatch('getSoundtracks')
    ])
  },
  data () {
    return {
      active: null,
      showMovieInfo: false,
      showMovieTrailer: false,
      photos: this.previewPhotos
    }
  },
  components: {
    HeaderSection,
    'vue-audio': VueAudio,
    'no-ssr': NoSSR,
    Carousel,
    Slide
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    },
    Soundtracks () {
      return this.$store.state.soundtracks
    },
    Issues () {
      return this.$store.state.issues
    },
    Movies () {
      return this.$store.state.movies
    },
    data () {
      return this.$store.state.data
    },
    all () {
      return this.$store.state.all
    },
    previewPhotos () {
      return this.$store.state.previewPhotos
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    playVideo () {
      this.$refs.youtube.player.playVideo()
    },
    playing () {
      console.log('we are watching!!!')
    },
    get () {
      this.$firebase.database().ref('data').once('value')
        .then(response => {
          var childData = response.val()
          console.log(childData)
        })
    }
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
.partnership-section {
  background-color: #202020;
  height: 1000px;
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
    p {
      color: #bbbbbb;
      font-family: Open Sans;
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
    max-height: 290px;
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
.section-headline {
  font-family: Merriweather;
  font-size: 40px;
  color: white;
}
.soundtrack-section {
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
@mixin movie-expanded-window {
  width: 1140px;
  height: 100%;
  position: absolute;
  background-color: #252525;
}
.movie-expanded-trailer {
  @include movie-expanded-window;
}
.movie-expanded-info {
  @include movie-expanded-window;
  padding: 10px;
  color: white;
  display: flex;
  .movie-shots {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    & > img {
      margin-right: 10px;
      margin-bottom: 10px;
      width: calc(50% - 5px;);
      height: 50%;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  & > div {
    flex: 1 1;
  }
}
.movie-footer {
  display: flex;
  width: 1140px;
  margin: 0 auto;
  justify-content: space-between;
}
.movie-wrap {
  display: flex;
  align-items: flex-end;
}
.movie-meta {
  width: 1140px;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  font-family: Open Sans;
  font-weight: 600;
  color: white;
  h2 {
    font-family: PTSerif-Caption;
    text-shadow: 0 0 10px rgba(24, 24, 24, 0.5);
    font-size: 55px;
    line-height: 1;
  }
  .movie-expand {
    text-transform: uppercase;
    p {
      margin-bottom: 10px;
      letter-spacing: 0;
      cursor: pointer;
    }
    &:after {
      @include red-line;
    }
  }
  .movie-info {
    p {
      padding: 24px 0;
      padding-top: 34px;
      color: #e02106;
    }
    &:before {
      display: block;
      content: "";
      height: 125px;
      width: 2px;
      background-color: #e02106;
    }
  }
}
@mixin arrow {
  display: inline-block;
  line-height: 1;
  font-size: 28px;
  top: -4px;
  position: absolute;
  color: #e02106;
  font-family: roboto;
}
.movies-section {
  background-color: #181818;
  .arrow-left {
    position: relative;
    &:before {
      @include arrow;
      content: "←";
    }
    &.backlink:before {
      padding: 24px 0;
      margin-left: -32px;
    }
  }
  .arrow-right {
    position: relative;
    &:after {
      @include arrow;
      content: "\2192";
    }
    &.backlink:after {
      padding: 24px 0;
      margin-right: 24px;
    }
  }
  .backlink {
    color: white;
    font-family: Open Sans;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    padding: 24px;
    position: relative;
  }
  .tabs__bar {
    height: 92px;
  }
  .image-container {
    background-size: cover;
    background-position: center;
    width: 800px;
    height: 600px;
  }
  .card--flat {
    background-color: transparent;
    display: flex;
    justify-content: center;
    .card__text {
      position: absolute;
    }
  }
}
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
.tabs__li {
  height: 3px !important;
  width: 30px;
  color: #5c5c5c !important;
  & > {
    background-color: red;
  }
}
.preview-photos {
  display: flex;
  height: 250px;
  & > div {
    flex: 1 1;
    overflow: hidden;
    & > img {
      width: 100%;
    }
  }
  & img {
    width: 100%;
  }
}
.photo {
  position: relative;
}
.photo-meta {
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  transition: .4s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  & h2 {
    font-size: 36px;
    font-family: PT Serif Caption;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
}
.photo:hover .photo-meta {
  opacity: 1;
  transition: .4s;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
