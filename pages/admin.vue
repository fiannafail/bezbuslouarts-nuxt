<template lang="pug">
  div
    v-container(grid-list-lg)
      v-layout(row)
        v-flex(xs6)
          section(class="preview-photos elevation-4")
            div(class="photos-block")
              h2(class="headline") Фильмы
              v-list(two-line)
                div(v-for="(item, index) in Movies" key="index")
                  v-list-tile(avatar v-bind:class="{ active: removedPhotos(index) === true }")
                    transition(name="fade")
                      div(class="photo-overlay" v-if="removedPhotos(index) === true")
                    v-list-tile-avatar
                      img(:src="item.image" @click="pickPhoto(item)")
                    v-list-tile-content
                      v-flex
                        v-list-tile-title(class="body-2") Order: {{ item.order }}
                        v-list-tile-sub-title
                          span(class="body-2") {{ item.title }}
                          span  &#8212; {{ item.descr }}
                    v-list-tile-action
                      v-flex(d-flex xs3)
                        v-select(v-bind:items="orders || data" hide-details v-model="selected[index]" v-on:change="orderChanged(index)" :value="select" :placeholder="valueFunc(index) || item.order.toString()")
                      v-flex(d-flex class="buttons")
                        v-btn(color="primary" @click="setNewOrder(index, selected[index])") OK
                        v-tooltip(bottom v-model="showTooltip[index]")
                          p(slot="activator")
                          span Подтвердите порядок
                      v-flex(xs2 d-flex)
                        v-icon(@click="removePhoto(index)") delete
                  v-divider
          section(class="partners elevation-4")
            h2(class="headline") Материалы в СМИ
            v-list(two-line)
              div(v-for="(item, index) in Issues" key="index")
                v-list-tile(avatar)
                  transition(name="fade")
                    div(class="photo-overlay" v-if="removedIssues(index) === true")
                  v-list-tile-avatar
                    img(:src="item.image")
                  v-list-tile-content
                    v-list-tile-title {{ item.title }}
                    v-list-tile-sub-title {{ item.magazine }}
                  v-list-tile-action
                    v-icon(class="icon-edit" @click="showEditor.push(index)") mode edit
                    v-icon(class="icon-remove" @click="removeIssue(item, index)") delete
                v-divider
                transition(name="fadeInDown")
                  div(class="editor" v-if="isShowEditor(index) === true")
                    h3 Редактирование
                    v-container(grid-list-sm)
                      v-layout(row)
                        v-flex(xs6)
                          v-layout(row)
                            v-flex(xs4)
                              v-subheader Название
                            v-flex(xs8)
                              v-text-field(label="Название материала" :placeholder="item.title" v-model="issue.title" hide-details)
                        v-flex(xs6)
                          v-layout(row)
                            v-flex(xs4)
                              v-subheader Издание
                            v-flex(xs8)
                              v-text-field(label="Издание" :placeholder="item.magazine" v-model="issue.magazine" hide-details)
                      v-layout(row)
                        v-flex(xs6)
                          v-layout(row)
                            v-flex(xs5)
                              v-subheader Изображение
                            v-flex(xs7)
                              v-text-field(label="URL изображения" :placeholder="item.image" v-model="issue.image" hide-details)
                        v-flex(xs6)
                          v-layout(row)
                            v-flex(xs4)
                              v-subheader Ссылка
                            v-flex(xs8)
                              v-text-field(label="URL-ссылка" :placeholder="item.url" v-model="issue.url" hide-details)
                    div(class="buttons")
                      v-btn(color="red accent-4" dark small @click="closeEditor(index)") Закрыть
                      v-btn(color="primary" dark small @click="editIssue(item)") Подтвердить
                    v-progress-circular(v-if="issueLoader" indeterminate color="primary")
                    v-divider
            h2 Добавить материал
            v-container(grid-list-sm)
              v-layout(row)
                v-flex(xs6)
                  v-layout(row)
                    v-flex(xs4)
                      v-subheader Название
                    v-flex(xs8)
                      v-text-field(label="Название материала" v-model="issue.title" hide-details)
                v-flex(xs6)
                  v-layout(row)
                    v-flex(xs4)
                      v-subheader Издание
                    v-flex(xs8)
                      v-text-field(label="Издание" v-model="issue.magazine" hide-details)
              v-layout(row)
                v-flex(xs6)
                  v-layout(row)
                    v-flex(xs5)
                      v-subheader Изображение
                    v-flex(xs7)
                      v-text-field(label="URL изображения" v-model="issue.image" hide-details)
                v-flex(xs6)
                  v-layout(row)
                    v-flex(xs4)
                      v-subheader Ссылка
                    v-flex(xs8)
                      v-text-field(label="URL-ссылка" v-model="issue.url" hide-details)
            v-btn(color="primary" @click="addIssue" type="submit") Добавить
            div
              v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="issueAdding")
        v-flex(xs6)
          section(class="movies elevation-4")
            h2(class="headline") Добавить фильм
            v-container(grid-list-md)
              v-form
                v-layout(row)
                  v-flex(xs3)
                    v-subheader Название
                  v-flex(xs9)
                   v-text-field(v-model="movie.title" required hide-details label="Название фильма")
                v-layout(row)
                  v-flex(xs6)
                    v-layout(row)
                      v-flex
                        v-subheader Порядок
                      v-flex
                        v-text-field(v-model="movie.order" required hide-details label="Порядок отображения")
                  v-flex(xs6)
                    v-layout(row)
                      v-flex
                        v-subheader Год
                      v-flex
                       v-text-field(v-model="movie.year" required name="input-2" hide-details label="Год выпуска")
                v-layout(row)
                  v-flex(xs3)
                    v-subheader Большое изображение
                  v-flex(xs9)
                    v-text-field(v-model="movie.image" required name="input-3" label="URL ссылка на главное изображение")
                v-layout(row)
                  v-flex(xs3)
                    v-subheader Трейлер
                  v-flex(xs9)
                    v-text-field(v-model="movie.trailer" required name="input-4" label="URL ссылка на трейлер")
                v-layout(row)
                  v-flex(xs3)
                    v-subheader Описание
                  v-flex(xs9)
                    v-text-field(v-model="movie.descr" required name="input-5" textarea)
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
                v-btn(@click.prevent="addMovie" color="primary" type="submit") Добавить
                div
                  v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="movieAdding")
</template>
<script>
import SignIn from '~/components/SignIn.vue'
import { database } from '~/plugins/firebase-client-init.js'
import PreviewPhotos from '../components/admin/PreviewPhotos'
require('vue-animate-transitions/dist/vue-animate-transitions.min.css')
export default {
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('getPreviewPhotos'),
      store.dispatch('getMovies'),
      store.dispatch('getIssues')
    ])
  },
  methods: {
    orderChanged (index) {
      console.log(index, this.selected[index])
    },
    async editIssue (item) {
      this.$store.commit('issueLoading', true)
      console.log(this.issue)
      await database.ref().child('Issues/' + item.key).update(this.issue)
      await this.$store.dispatch('IssueEdit')
      this.issue = {}
    },
    isShowEditor (index) {
      for (let i = 0; i < this.showEditor.length; i++) {
        if (this.showEditor[i] === index) {
          return true
        }
      }
    },
    closeEditor (index) {
      const id = this.showEditor.indexOf(index)
      this.showEditor.splice(id, 1)
      console.log(this.showEditor)
    },
    async addMovie () {
      this.$store.commit('set', { type: 'movieAdding', items: true })
      const newKey = database.ref().child('Movies').push().key
      const updates = {}
      this.movie.key = newKey
      updates[newKey] = this.movie
      await database.ref().child('Movies').update(updates)
      await this.$store.dispatch('updatePhotos')
      this.$store.commit('set', { type: 'movieAdding', items: false })
    },
    async addIssue () {
      this.$store.commit('set', { type: 'issueAdding', items: true })
      const newKey = database.ref().child('Issues').push().key
      const updates = {}
      this.issue.key = newKey
      updates[newKey] = this.issue
      await database.ref().child('Issues').update(updates)
      await this.$store.dispatch('updateIssues')
      this.$store.commit('set', { type: 'issueAdding', items: false })
    },
    removedIssues (index) {
      const array = this.deletedIssues
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    removedPhotos (index) {
      const array = this.deletedPhotos
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    removeIssue (item, index) {
      //  database.ref('Issues').child(item.key).remove()
      this.deletedIssues.push(index)
      console.log(this.deletedIssues)
    },
    removePhoto (index) {
      this.$store.commit('setLoading', true)
      this.deletedPhotos.push(index)
      console.log(this.deletedPhotos)
      const key = this.previewPhotos[index].key
      database.ref('Movies').child(key).remove()
    },
    async addPhoto () {
      this.$store.commit('setLoading', true)
      const newKey = database.ref().child('PreviewPhotos').push().key
      const updates = {}
      const data = {
        image: this.newUrl,
        order: this.newOrder,
        key: newKey
      }
      updates[newKey] = data
      await database.ref().child('PreviewPhotos').update(updates)
      await this.$store.dispatch('updatePhotos')
      this.newUrl = ''
      this.newOrder = ''
    },
    valueFunc (index) {
      if (this.deleted) {
        const ID = this.deleted.findIndex(x => x.index === index)
        console.log(ID, this.deleted)
        if (ID !== -1) {
          return this.deleted[ID].id
        }
      }
    },
    setNewOrder (index, el) {
      const id = this.data.indexOf(el)
      const deleted = this.data.splice(id, 1).toString()
      if (this.deleted === null) {
        this.deleted = []
      }
      this.deleted.push({ id: deleted, index: index })
      console.log(this.previewPhotos[index])
      database.ref('Movies/' + this.previewPhotos[index].key).update({
        order: el
      })
        .then(res => console.log(res))
      console.log(this.previewPhotos[index])
    },
    changeNewOrder (index, el) {
      console.log(index, el)
    },
    pickPhoto (item) {
      console.log(item)
    }
  },
  components: {
    SignIn,
    PreviewPhotos
  },
  created () {
    console.log(this.previewPhotos)
    for (let i = 1; i < this.previewPhotos.length + 1; i++) {
      this.data.push(i)
    }
    console.log(this.data)
  },
  computed: {
    movieAdding () {
      return this.$store.state.movieAdding
    },
    issueAdding () {
      return this.$store.state.issueAdding
    },
    issueLoader () {
      return this.$store.getters.issueLoader
    },
    Issues () {
      return this.$store.state.issues
    },
    Movies () {
      return this.$store.state.movies
    },
    user () {
      return this.$store.state.user
    },
    previewPhotos () {
      return this.$store.state.previewPhotos
    },
    loading () {
      return this.$store.getters.isLoading
    }
  },
  data: () => ({
    selected: [],
    data: [],
    deleted: null,
    orders: null,
    photos: null,
    newOrder: null,
    newUrl: null,
    select: null,
    deletedPhotos: [],
    deletedIssues: [],
    showEditor: [],
    showTooltip: [],
    issue: {
      title: null,
      url: null,
      image: null,
      magazine: null
    },
    movie: {
      order: null,
      title: null,
      photo: null,
      descr: null,
      year: null,
      trailer: null,
      thumb1: null,
      thumb2: null,
      thumb3: null,
      thumb4: null,
      thumb5: null,
      thumb6: null
    }
  })
}
</script>
<style lang="scss" scoped>
.list__tile.active {
  background-color: #000012;
}
.input-group--text-field > * {
  padding-left: 8px;
}
.container.grid-list-md .layout:only-child {
  margin: -4px !important;
}
.list__tile__action {
  display: flex;
  flex-direction: row;
  align-items: center;
  i {
    padding: 0 8px;
    display: block;
  }
}
.photo-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
}
.partners {
  background-color: rgb(255, 255, 255);
  margin-top: 16px;
  .editor {
    z-index: 1;
    padding-top: 12px;
    .buttons {
      padding-bottom: 12px;
    }
  }
  li {
    position: relative;
    background-color: white;
    z-index: 3;
  }
  h2:not(.headline) {
    margin: 18px 0;
  }
  .subheader {
    padding: 0 12px;
  }
  .input-group {
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: -8px;
    margin-right: -8px;
  }
}
.list__tile--avatar .avatar img {
  width: 45px;
  height: 45px;
}
.list__tile__sub-title {
  max-width: 250px;
  padding-right: 12px;
}
.list .input-group {
  padding-top: 10px;
}
.list__tile__title {
  word-wrap: break-word;
}
.icon-edit {
  transition: .3s;
  cursor: pointer;
  &:hover {
    color: #1976D2;
  }
}
.icon-remove {
  transition: .3s;
  cursor: pointer;
  &:hover {
    color: #B71C1C;
  }
}
.preview-photos {
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
.select {
  width: 50px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.headline {
  background-color: #f5f5f5;
  border-bottom: 1px solid #d8d8d8;
  padding-top: 18px;
  padding-bottom: 18px;
  color: #484848;
  font-weight: 500;
}
label {
  padding-left: 8px;
  font-size: 100%;
  font-weight: 500;
}
button[type="submit"] {
  margin: 32px 0;
}
.movies {
  background-color: #f5f5f5;
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
.container.grid-list-md .layout .flex {
  padding: 4px !important;
}
.screens {
  margin: 0 -8px;
  padding-left: 16px;
  padding-bottom: 8px;
  background-color: #eee;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
}
.subheader {
  color: rgb(72, 72, 72);
  font-weight: 600;
  font-size: 15px;
  font-family: Roboto Mono;
  letter-spacing: 0px;
}
</style>
