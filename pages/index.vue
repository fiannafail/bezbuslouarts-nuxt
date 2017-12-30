<template lang="pug">
    div(class="body")
      section(class="header-section")
        header-section
      section(class="preview-photos")
        div(v-for="(item, index) in Movies" class="photo")
          div(class="photo-meta")
            h2 {{ language === 'ru' ? item.title : item.titleEN }}
          img(:src="item.image")
      section(class="movies-section" id="movies")
        v-tabs(v-model="active" centered)
          v-tabs-items
            v-tabs-content(
              v-for="(tab, i) in Movies"
              v-bind:style="{ order: tab.order }"
              :key="i"
              :id="tab.key")
              v-card(flat)
                div(class="image-container"
                    v-bind:style="{ backgroundImage: showMovieTrailer === false && showMovieInfo === false ? 'url(' + tab.image + ')' : 'none' }"
                    v-if="")
                div(class="movie-meta")
                  div(class="movie-info")
                    p {{ tab.year }}
                    h2 {{ language === 'ru' ? tab.title : tab.titleEN }}
                  div(class="movie-wrap")
                    div(class="movie-expand" v-if="showMovieTrailer === false && showMovieInfo === false")
                      p(@click="showMovieInfo = true" class="arrow-right" v-lang.aboutMovie)
                      p(@click="showMovieTrailer = true" class="arrow-right" v-lang.watchTrailer)
                transition(name="fadeIn")
                  div(class="movie-expanded-trailer" v-if="showMovieTrailer === true")
                    youtube(:video-id="getId(tab.trailer)" width="1140" height="600" ref="youtube" @playing="playing")
                transition(name="fadeIn")
                  div(class="movie-expanded-info" v-if="showMovieInfo === true")
                    div(class="movie-info")
                      h2 {{ language === 'ru' ? tab.title : tab.titleEN }}
                      p {{ language === 'ru' ? tab.year : tab.yearEN }}
                      p {{ language === 'ru' ? tab.descr : tab.descrEN }}
                    div(class="movie-shots")
                      img(:src="tab.thumb1")
                      img(:src="tab.thumb2")
                      img(:src="tab.thumb3")
                      img(:src="tab.thumb4")
                      img(:src="tab.thumb5")
                      img(:src="tab.thumb6")
            div(class="movie-footer")
              p(@click="showMovieInfo === true ? showMovieInfo = false : showMovieTrailer = false" v-if="showMovieInfo === true || showMovieTrailer === true" class="backlink arrow-left" v-lang.toProjects)
              p(v-if="showMovieTrailer === true" class="backlink arrow-right" @click="showMovieInfo = true, showMovieTrailer = false" v-lang.aboutMovie)
            v-tabs-bar(dark v-if="showMovieInfo !== true && showMovieTrailer !== true")
              v-tabs-item(
                  v-for="(tab, index) in Movies"
                  :key="index"
                  :href="'#' + tab.key")
      section(class="partnership-section")
        p(v-lang.cooperation)
        div(class="wrapper")
          div(class="description")
            h2(class="section-headline") {{ language === 'ru' ? sectionsMeta.Partners.title : sectionsMeta.Partners.titleEN }}
            p(class="red-text") {{ language === 'ru' ? sectionsMeta.Partners.subheader : sectionsMeta.Partners.subheaderEN}}
            p {{ language === 'ru' ? sectionsMeta.Partners.text : sectionsMeta.Partners.textEN}}
          div(class="partners-slider")
            v-carousel(delimiter-icon="remove" hide-controls)
              v-carousel-item(v-for="(item, index) in PartnersImages" v-bind:src="item.image" :key="index")
      soundtrack-section
      members-section(:Members="members")
      section(class="media-section")
        p(v-lang.massMedia)
        h1(class="section-headline" v-lang.written)
        no-ssr
          carousel(perPage="4")
            slide(v-for="(item, index) in Issues" :key="index")
              div
                img(:src="item.image")
                div(class="meta-info")
                  h3 {{ language === 'ru' ? item.title : item.titleEN }}
                  p {{ language === 'ru' ? item.magazine : item.magazineEN }}
      contacts-section
</template>

<script>
//  import axios from '~/plugins/axios'
import MembersSection from '../components/MembersSection'
import HeaderSection from '../components/HeaderSection'
import SoundtrackSection from '../components/SoundtrackSection'
import ContactsSection from '../components/ContactsSection'
import VueAudio from 'vue-audio'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'

require('vue-animate-transitions/dist/vue-animate-transitions.min.css')
export default {
  async asyncData ({ store }) {
    return Promise.all([
      store.dispatch('getPreviewPhotos'),
      store.dispatch('getMovies'),
      store.dispatch('getIssues'),
      store.dispatch('getSoundtracks'),
      store.dispatch('getPartnersImages'),
      store.dispatch('getTexts'),
      store.dispatch('getMembers')
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
    MembersSection,
    ContactsSection,
    SoundtrackSection,
    'vue-audio': VueAudio,
    'no-ssr': NoSSR,
    Carousel,
    Slide
  },
  computed: mapState({
    PartnersImages: 'partnersImages',
    player: 'player',
    Soundtracks: 'soundtracks',
    Issues: 'issues',
    Movies: 'movies',
    data: 'data',
    all: 'all',
    previewPhotos: 'previewPhotos',
    sectionsMeta: 'sectionsMeta',
    members: 'members'
  }),
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

<style lang="scss">
.body {
    background-color: #181818;
}
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
.header-section {
  background-image: url(https://i.pinimg.com/originals/c7/f9/72/c7f97257deca8f7f111c4b37438f5721.jpg);
  background-size: cover;
}
.partnership-section {
  background-color: #202020;
  margin-top: 150px;
  height: 1000px;
  .partners-slider {
    padding-left: 100px;
    padding-top: 70px;
  }
  .carousel {
    height: 300px;
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
  order: 99;
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
      margin-bottom: 0;
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
  margin-top: 150px;
  .tabs__items {
    display: flex;
    flex-direction: column;
  }

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
    margin-top: 45px;
    height: 3px;
    order: 100;
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
@media screen and (max-width: 480px) {
  .media-section .VueCarousel {
    width: 100%;
  }
  .media-section .meta-info {
    padding: 10px;
  }
  .media-section .VueCarousel-slide > div {
    margin: 5px;
  }
  .members-section .member-block,
  .soundtrack-section .wrapper {
    flex-direction: column;
    padding: 0 15px;
  }
  .soundtrack-section .wrapper .description,
  .soundtrack-section .wrapper .soundtracks {
    max-width: 100% !important;
    width: 100% !important;
  }
  .title-block {
    width: 80% !important;
    p {
      font-size: 32px !important;
    }
  }
  .movie-meta {
    width: 100%;
    padding: 25px;
  }
}
</style>
