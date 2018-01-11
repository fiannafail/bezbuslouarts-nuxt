<template lang="pug">
section(class="movies-section elevation-4")
  h2(class="headline") {{ movie.order ? 'Редактировать фильм' : 'Добавить фильм' }}
  v-container(grid-list-md)
    v-form
      v-layout(row)
        v-flex(xs3)
          v-subheader Название
        v-flex(xs9)
          v-text-field(v-model="movie.title" required hide-details :label="`Название фильма (ru)`")
          v-text-field(v-model="movie.titleEN" required hide-details :label="`Название фильма (en)`")
      v-layout(row)
            v-flex(xs3)
              v-subheader Год
            v-flex(xs9)
             v-text-field(v-model="movie.year" required name="input-2" hide-details label="Год выпуска")
      v-layout(row)
        v-flex(xs3)
          v-subheader Большое изображение
        v-flex(xs9)
          v-text-field(v-model="movie.image" required name="input-3" label="URL ссылка на главное изображение")
      v-layout(row)
        v-flex(xs3)
          v-subheader Превью
        v-flex(xs9)
          v-text-field(v-model="movie.preview" required name="input-10" label="URL ссылка на превью")
      v-layout(row)
        v-flex(xs3)
          v-subheader Трейлер
        v-flex(xs9)
          v-text-field(v-model="movie.trailer" required name="input-4" label="URL ссылка на трейлер")
      v-layout(row)
        v-flex(xs3)
          v-subheader Описание
        v-flex(xs9)
          v-text-field(v-model="movie.descr" required name="input-5" textarea label="RU")
          v-text-field(v-model="movie.descrEN" required name="input-7" textarea label="EN")
      div(class="screens")
        v-layout(row)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb1" label="Скриншот 1" box hide-details required)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb2" label="Скриншот 2" box hide-details required)
        v-layout(row)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb3" label="Скриншот 3" box hide-details required)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb4" label="Скриншот 4" box hide-details required)
        v-layout(row)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb5" label="Скриншот 5" box hide-details required)
          v-flex(xs6)
            v-text-field(v-model="movie.thumb6" label="Скриншот 6" box hide-details required)
      v-btn(@click.prevent="addMovie" color="primary" type="submit" v-if="!movieEditing") Добавить
      div(v-else class="edit-buttons")
        v-btn(@click.prevent="cancel" dark color="red accent-4") Отменить
        v-btn(@click.prevent="saveMovie" color="primary" type="submit") Сохранить
        transition(name="fade")
          v-icon(v-show="showDone" flat color="success" large class="mx-3" class="done") done
      div
        v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="movieAdding")
</template>
<script>
import { mapState } from 'vuex'
import { Section } from '~/plugins/functions.js'
//  import axios from '~/plugins/axios.js'
import { database } from '~/plugins/firebase-client-init.js'
export default {
  data: () => ({
    langs: ['ru', 'en'],
    showInput: [],
    showDone: false
  }),
  methods: {
    click (item) {
      console.log(item)
    },
    cancel () {
      this.$store.dispatch('cleanMovie')
    },
    async saveMovie () {
      await database.ref('Movies/' + this.movie.key).update(this.movie)
      this.showDone = true
      this.$store.commit('set', { type: 'movieEditing', items: false })
      this.$store.dispatch('cleanMovie')
      setTimeout(() => {
        this.showDone = false
      }, 2500)
    },
    async addMovie () {
      this.$store.commit('set', { type: 'movieAdding', items: true })
      await this.movies.add()
      await this.$store.dispatch('updatePhotos')
      this.$store.commit('set', { type: 'movieAdding', items: false })
    }
  },
  computed: {
    movies () {
      const movies = new Section('Movies', this.movie)
      return movies
    },
    ...mapState({
      movieAdding: 'movieAdding',
      movie: 'movie',
      movieEditing: 'movieEditing'
    })
  }
}
</script>
<style lang="scss" scoped>
.movies-section {
  background-color: #f5f5f5;
  .edit-buttons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .done {
    position: absolute;
    right: 20%;
  }
  .fade-leave-active {
    transition: opacity 3s;
  }
  button[type="submit"] {
    margin: 32px 0;
  }
  .input-group--text-field-box label {
    font-size: 14px;
  }
  .container {
    background-color: #fff;
  }
  .input-group {
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: -8px;
    margin-right: -8px;
  }
  li {
    list-style: none;
  }
  .layout {
    padding-top: 0;
    padding-bottom: 0;
  }
  .subheader {
    text-align: left;
  }
}
</style>
