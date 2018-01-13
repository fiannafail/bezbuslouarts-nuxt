<template lang="pug">
section(class="movie-list elevation-4")
  div(class="photos-block")
    h2(class="headline") Фильмы
    v-list(two-line)
      div(v-for="(item, index) in Movies" :key="index")
        v-list-tile(avatar v-bind:class="{ active: showRemovedMovies(index) === true, isEditing: editing === index && movie.title }")
          transition(name="fade")
            div(class="photo-overlay" v-if="showRemovedMovies(index) === true")
          v-list-tile-avatar
            img(:src="item.image" @click="pickPhoto(item)")
          v-list-tile-content
            v-flex
              v-list-tile-title(class="body-2") Order: {{ item.order }}
              v-list-tile-sub-title
                span(class="body-2") {{ item.title }}
                span  &#8212; {{ item.descr }}
          v-list-tile-action
            v-flex(xs2 d-flex)
              v-icon(@click="removeMovie(item, index)") delete
            v-flex(xs2 d-flex)
              v-icon(@click="editMovie(index, item)") edit
        v-divider
</template>
<script>
import { mapState } from 'vuex'
import { Section } from '~/plugins/functions.js'

export default {
  data: () => ({
    data: [],
    editing: null,
    selected: [],
    select: null,
    orders: null,
    removedMovies: [],
    orderedMovies: []
  }),
  methods: {
    editMovie (index, item) {
      this.$store.dispatch('editMovie', item)
      this.editing = index
    },
    showRemovedMovies (index) {
      return this.movies.showRemovedItems(index)
    },
    removeMovie (item, index) {
      const removed = this.movies.remove(item, index)
      this.removedMovies = removed
    }
  },
  computed: {
    movies () {
      const movies = new Section('Movies', null, this.removedMovies)
      return movies
    },
    ...mapState({
      Movies: 'movies',
      movie: 'movie'
    })
  },
  created () {
    for (let i = 1; i < this.Movies.length + 1; i++) {
      this.data.push(i)
      console.log(this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.movie-list {
  .isEditing {
    transition: .4s;
    background-color: #eee!important;
  }
  .list__tile__content, .list__tile__action {
    width: 50%;
  }
  .icon {
    transition: .3s;
    cursor: pointer;
    &:hover {
      color: #B71C1C;
    }
  }
  & .buttons {
    align-items: center;
      max-width: 104px;
  }
  .list__tile__action {
    justify-content: flex-end;
  }
  & .input-group__input{
    background-color: white;
  }
}
</style>
