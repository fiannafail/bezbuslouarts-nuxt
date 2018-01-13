<template lang="pug">
section(class="media-section elevation-4")
  h2(class="headline") Материалы в СМИ
  v-list(two-line)
    div(v-for="(item, index) in Issues" :key="index")
      v-list-tile(avatar)
        transition(name="fade")
          div(class="photo-overlay" v-if="showRemovedIssues(index) === true")
        v-list-tile-avatar
          img(:src="item.image")
        v-list-tile-content
          v-list-tile-title {{ item.title }}
          v-list-tile-sub-title {{ item.magazine }}
        v-list-tile-action
          v-icon(class="icon-edit" @click="editingIndex = index, editingItem = item") edit
          v-icon(class="icon-remove" @click="removeIssue(item, index)") delete
      v-divider
      transition(name="fadeInDown")
        div(class="editor" v-if="editingIndex === index")
          h3 Редактирование
          v-container(grid-list-sm)
            v-layout(row)
              v-flex(xs6)
                v-layout(row)
                  v-flex(xs4)
                    v-subheader Название
                  v-flex(xs8)
                    v-text-field(label="Название материала" :placeholder="item.title" v-model="editingItem.title" hide-details)
                    v-text-field(label="Название материала (EN)" :placeholder="item.titleEN" v-model="editingItem.titleEN" hide-details)
              v-flex(xs6)
                v-layout(row)
                  v-flex(xs4)
                    v-subheader Издание
                  v-flex(xs8)
                    v-text-field(label="Издание" :placeholder="item.magazine" v-model="editingItem.magazine" hide-details)
                    v-text-field(label="Издание (EN)" :placeholder="item.magazineEN" v-model="editingItem.magazineEN" hide-details)
            v-layout(row)
              v-flex(xs6)
                v-layout(row)
                  v-flex(xs5)
                    v-subheader Изображение
                  v-flex(xs7)
                    v-text-field(label="URL изображения" :placeholder="item.image" v-model="editingItem.image" hide-details)
              v-flex(xs6)
                v-layout(row)
                  v-flex(xs4)
                    v-subheader Ссылка
                  v-flex(xs8)
                    v-text-field(label="URL-ссылка" :placeholder="item.url" v-model="editingItem.url" hide-details)
          div(class="buttons")
            v-btn(color="red accent-4" dark small @click="editingItem = null, editingIndex = null") Закрыть
            v-btn(color="primary" dark small @click="editIssue(editingItem)") Подтвердить
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
            v-text-field(label="Название материала (EN)" v-model="issue.titleEN" hide-details)
      v-flex(xs6)
        v-layout(row)
          v-flex(xs4)
            v-subheader Издание
          v-flex(xs8)
            v-text-field(label="Издание" v-model="issue.magazine" hide-details)
            v-text-field(label="Издание (EN)" v-model="issue.magazineEN" hide-details)
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
</template>
<script>
import { mapState } from 'vuex'
import { Section } from '~/plugins/functions.js'
import { database } from '~/plugins/firebase-client-init.js'

export default {
  data: () => ({
    editingIndex: null,
    editingItem: {},
    issue: {
      title: null,
      titleEN: null,
      url: null,
      image: null,
      magazine: null,
      magazineEN: null
    },
    revomedIssues: [],
    showEditor: []
  }),
  methods: {
    async addIssue () {
      this.$store.commit('set', { type: 'issueAdding', items: true })
      await this.issues.add()
      await this.$store.dispatch('updateIssues')
      this.$store.commit('set', { type: 'issueAdding', items: false })
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
    },
    removeIssue (item, index) {
      const removed = this.issues.remove(item, index)
      this.revomedIssues = removed
    },
    showRemovedIssues (index) {
      return this.issues.showRemovedItems(index)
    },
    async editIssue (item) {
      this.$store.commit('issueLoading', true)
      await database.ref().child('Issues/' + item.key).update(item)
      await this.$store.dispatch('IssueEdit')
    }
  },
  computed: {
    issues () {
      const issues = new Section('Issues', this.issue, this.revomedIssues)
      return issues
    },
    ...mapState({
      Issues: 'issues',
      issueAdding: 'issueAdding',
      issueLoader: 'issueLoader'
    })
  }
}
</script>
<style lang="scss" scoped>
.list__tile__title {
  max-width: 350px;
}
</style>
