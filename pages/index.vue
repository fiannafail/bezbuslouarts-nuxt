<template lang="pug">
    div(class="wrapper")
      section(class="header-section")
        header-section
      section(class="preview-photos")
<<<<<<< HEAD
        div(v-for="(item, index) in Movies" class="photo")
          div(class="photo-meta")
            h2 {{ item.title }}
          img(:src="item.image")
      section(class="movies-section")
        v-tabs(v-model="active" centered)
          v-tabs-items
            v-tabs-content(
              v-for="(tab, i) in Movies"
              :key="i"
              :id="tab.key")
              v-card(flat)
                div(class="image-container" v-bind:style="{ backgroundImage: 'url(' + tab.image + ')' }")
                div(class="movie-meta")
                  div(class="movie-info")
                    p {{ tab.year }}
                    h2 {{ tab.title }}
                  div(class="movie-wrap")
                    div(class="movie-expand")
                      p(@click="showMovieInfo = true") О фильме
                      p(@click="showMovieTrailer = true") Смотреть трейлер
                transition(name="fadeIn")
                  div(class="movie-expanded-trailer" v-if="showMovieTrailer === true")
                    p {{ tab.trailer }}
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
            p(@click="showMovieInfo === true ? showMovieInfo = false : showMovieTrailer = false" v-if="showMovieInfo === true || showMovieTrailer === true" class="backlink") Назад к проектам
            transition(name="fadeIn")
              v-tabs-bar(dark v-if="showMovieInfo !== true || showMovieTrailer !== true")
                v-tabs-item(
                    v-for="(tab, index) in Movies"
                    :key="index"
                    :href="'#' + tab.key")
=======
        div(v-for="(item, index) in previewPhotos" key="index")
          img(:src="item")
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
</template>

<script>
//  import axios from '~/plugins/axios'
import HeaderSection from '../components/HeaderSection'
<<<<<<< HEAD
require('vue-animate-transitions/dist/vue-animate-transitions.min.css')
=======

>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
export default {
  async asyncData ({ store }) {
    await store.dispatch('getPreviewPhotos')
  },
  data () {
    return {
<<<<<<< HEAD
      active: null,
      showMovieInfo: false,
      showMovieTrailer: false,
      photos: this.previewPhotos
    }
  },
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('getPreviewPhotos'),
      store.dispatch('getMovies'),
      store.dispatch('getIssues')
    ])
  },
=======
      photos: this.previewPhotos
    }
  },
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
  components: {
    HeaderSection
  },
  computed: {
<<<<<<< HEAD
    Issues () {
      return this.$store.state.issues
    },
    Movies () {
      return this.$store.state.movies
    },
=======
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
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

<<<<<<< HEAD
<style lang="scss" scoped>
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
.movie-wrap {
  display: flex;
  align-items: flex-end;
}
.wrapper {
  background-color: #181818;
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
      margin-top: 18px;
      display: block;
      content: "";
      height: 125px;
      width: 2px;
      background-color: #e02106;
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
.movies-section {
  .backlink {
    color: white;
    font-family: Open Sans;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    padding: 24px 0;
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
=======
<style scoped>
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
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
<<<<<<< HEAD
.tabs__li {
  height: 3px !important;
  width: 25px;
  background-color: #f3f3f3;
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
=======
.preview-photos {
  display: flex;
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
  & img {
    width: 100%;
  }
}
<<<<<<< HEAD
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
=======
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
</style>
