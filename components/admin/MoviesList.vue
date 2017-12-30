<template lang="pug">
section(class="movie-list elevation-4")
  div(class="photos-block")
    h2(class="headline") Фильмы
    v-list(two-line)
      div(v-for="(item, index) in Movies" key="index")
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
              v-icon(@click="removeMovie(index)") delete
            v-flex(xs2 d-flex)
              v-icon(@click="editMovie(index, item)") edit
        v-divider
</template>
<script>
import { mapState } from 'vuex'
import { database } from '~/plugins/firebase-client-init.js'

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
      const array = this.removedMovies
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    removeMovie (index) {
      this.$store.commit('setLoading', true)
      this.removedMovies.push(index)
      //  const key = this.previewPhotos[index].key
      //  database.ref('Movies').child(key).remove()
    },
    setNewOrder (index, el) {
      const id = this.data.indexOf(el)
      const deleted = this.data.splice(id, 1).toString()
      if (this.orderedMovies === null) {
        this.orderedMovies = []
      }
      this.orderedMovies.push({ id: deleted, index: index })
      console.log(this.Movies[index])
      database.ref('Movies/' + this.Movies[index].key).update({
        order: el
      })
        .then(res => console.log(res))
      console.log(this.Movies[index])
    },
    valueFunc (index) {
      if (this.orderedMovies) {
        const ID = this.orderedMovies.findIndex(x => x.index === index)
        console.log(ID, this.orderedMovies)
        if (ID !== -1) {
          return this.orderedMovies[ID].id
        }
      }
    }
  },
  computed: mapState({
    Movies: 'movies',
    movie: 'movie'
  }),
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
