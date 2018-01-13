<template lang="pug">
  div(class="body")
    header-section
    movies-slider-section
    movies-section
    partners-section
    scenarios-section
    soundtrack-section
    members-section(:Members="members")
    media-section
    contacts-section
</template>

<script>
//  import axios from '~/plugins/axios'
import MoviesSliderSection from '../components/MoviesSliderSection'
import MembersSection from '../components/MembersSection'
import HeaderSection from '../components/HeaderSection'
import SoundtrackSection from '../components/SoundtrackSection'
import PartnersSection from '../components/PartnersSection'
import ScenariosSection from '../components/ScenariosSection'
import MoviesSection from '../components/MoviesSection'
import ContactsSection from '../components/ContactsSection'
import MediaSection from '../components/MediaSection'
import VueAudio from 'vue-audio'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'

require('vue-animate-transitions/dist/vue-animate-transitions.min.css')
export default {
  async asyncData ({ store }) {
    return Promise.all([
      store.dispatch('getMovies'),
      store.dispatch('getIssues'),
      store.dispatch('getSoundtracks'),
      store.dispatch('getPartnersImages'),
      store.dispatch('getPartners'),
      store.dispatch('getTexts'),
      store.dispatch('getMembers'),
      store.dispatch('getScenarioMovies')
    ])
  },
  data () {
    return {
      issues: [],
      active: null,
      showenTab: null,
      mediaSlides: 4,
      partnersSlides: 3,
      showMovieInfo: false,
      showMovieTrailer: false,
      photos: this.previewPhotos
    }
  },
  components: {
    HeaderSection,
    MembersSection,
    MoviesSliderSection,
    ContactsSection,
    MediaSection,
    MoviesSection,
    PartnersSection,
    SoundtrackSection,
    ScenariosSection,
    'vue-audio': VueAudio,
    'no-ssr': NoSSR,
    Carousel,
    Slide
  },
  computed: mapState({
    PartnersImages: 'partnersImages',
    Partners: 'partners',
    player: 'player',
    Soundtracks: 'soundtracks',
    Movies: 'movies',
    Issues: 'issues',
    data: 'data',
    sectionsMeta: 'sectionsMeta',
    members: 'members',
    activeSlider: 'activeSlider',
    language: 'language'
  }),
  head () {
    return {
      title: 'BezbuslouArts - Мы создаем независимое белорусское кино'
    }
  },
  methods: {
    choseTab (index) {
      this.active = index.toString()
      console.log(this.active)
    },
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
  },
  mounted () {
    this.issues = this.Issues.reverse()
  }
}
</script>

<style lang="scss">
.body {
    background-color: #181818;
}
.hidden {
  display: none;
}
a {
  text-decoration: none;
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
  background-image: url(https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/img.png?alt=media&token=ed824509-052b-4389-9049-b5e0b721bddb);
  background-size: cover;
}
.section-headline {
  font-family: Merriweather;
  font-size: 40px;
  color: white;
  text-shadow: 0 0 10px rgba(24, 24, 24, 0.5);
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

.photo {
  position: relative;
  cursor: pointer;
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
    font-family: Merriweather;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
}
.photo:hover .photo-meta {
  opacity: 1;
  transition: .4s;
  background-color: rgba(255, 255, 255, 0.1);
}
@media screen and (max-width: 480px) {
  .media-section .VueCarousel-inner {
    flex-direction: column;
  }
  .partnership-section .partners img {
    width: 80%;
  }
  .movie-meta .movie-info h2 {
    margin-bottom: 10px;
  }
  .movie-expanded-info {
    flex-direction: column;
  }
  .movies-slider {
    flex-direction: column;
    height: auto;
    margin-bottom: 35px;
    & > div {
      margin-top: -3px
    }
  }
  .menu ul {
    flex-wrap: wrap;
  }
  .soundtrack-section, .members-section {
    height: auto !important;
  }
  .soundtrack-section .wrapper .soundtracks {
    padding: 0 !important;
  }
  .partnership-section .description {
    padding-top: 0 !important;
  }
  .media-section .VueCarousel {
    width: 100%;
  }
  .movies-section .card--flat {
    flex-direction: column;
    & > * {
      width: auto;
      margin: 15px;
      position: relative;
    }
  }
  .media-section .meta-info {
    padding: 10px;
  }
  .contacts-section .wrapper {
    margin-top: 25px !important;
  }
  .media-section, .soundtrack-section .wrapper {
    padding-bottom: 50px !important;
  }
  .contacts-section .contacts-wrapper, .media-section {
    height: auto !important;
  }
  .contacts-wrapper .map {
    overflow: visible !important;
    padding-top: 15px;
  }
  .media-section .VueCarousel-slide > div {
    margin: 15px;
  }
  .members-section .member-block,
  .soundtrack-section .wrapper,
  .partnership-section .wrapper,
  .scenarios-section .wrapper,
  .contacts-section .wrapper,
  .contacts-wrapper {
    flex-direction: column;
    padding: 0 15px;
  }
  .partnership-section .partners-slider {
    padding: 10px;
  }
  .contacts-section .sectiom-meta {
    position: inherit !important;
    top: 0 !important;
  }
  .section-footer {
    width: 90% !important;
    padding: 15px;
  }
  .movies-section {
    margin-top: 0;
  }
  .soundtrack-section {
    height: auto;
    padding-bottom: 15px;
  }
  .members-section .member-block>.extended .bio {
    padding: 10px !important;
  }
  .soundtrack-section .wrapper .description,
  .soundtrack-section .wrapper .soundtracks,
  .partnership-section .description,
  .partnership-section .partners-slider,
  .scenarios-section .wrapper .covers
  .scenarios-section .wrapper .text,
  .contacts-section .sectiom-meta,
  .contacts-section .contacts-wrapper,
  .contacts-section .contacts-wrapper .map,
  .contacts-section .contacts-wrapper .contacts,
  .scenarios-section .wrapper > *
   {
    max-width: 100% !important;
    width: 100% !important;
  }
  .scenarios-section .wrapper .covers {
    padding: 0 !important;
  }
  .title-block {
    width: 80% !important;
    h1 {
      font-size: 32px !important;
    }
  }
  .movies-section .image-container {
    height: 250px;
  }
  .movie-meta {
    width: 100%;
    text-align: center;
    flex-direction: column;
    .movie-info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .movie-expand {
      margin-top: 10px;
      width: 100%;
      &:after {
        display: none;
      }
    }
  }
  .menu {
    width: 75% !important;
  }
  .movie-expanded-info .movie-shots>img {
    height: 50%;
  }
  .movie-footer {
    width: 100%;
  }
}
</style>
