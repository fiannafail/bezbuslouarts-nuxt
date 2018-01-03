<template lang="pug">
  section(class="members-section elevation-4")
    h2(class="headline") Члены команды
    v-list(two-line)
      div(v-for="(item, index) in Members")
        v-list-tile(avatar v-bind:class="{ isEditing: editing === index}")
          transition(name="fade")
            div(class="photo-overlay" v-if="showRemovedMembers(index) === true")
          v-list-tile-avatar
            img(v-bind:src="item.photo")
          v-list-tile-content
            v-list-tile-title {{ item.name }}
            v-list-tile-sub-title {{ item.position }}
          v-list-tile-action
            v-icon(class="icon-remove" @click="removeMember(item, index)") delete
            v-icon(class="icon-edit" @click="editMember(item, index)") edit
        v-divider
    v-container(grid-list-md)
      v-layout(row)
        v-flex(xs6)
          v-layout
            v-flex(xs4)
              v-subheader Имя и фамилия
            v-flex(xs8)
              v-text-field(v-model="member.name" label="Имя и фамилия" hide-details required)
              v-text-field(v-model="member.nameEN" label="Имя и фамилия (EN)" hide-details required)
        v-flex(xs6)
          v-layout
            v-flex(xs4)
              v-subheader Позиция
            v-flex(xs8)
              v-text-field(v-model="member.position" label="Позиция" hide-details required)
              v-text-field(v-model="member.positionEN" label="Позиция (EN)" hide-details required)
      v-layout
        v-flex(xs3)
          v-subheader Фотография
        v-flex(xs9)
          v-text-field(label="URL фотографии" v-model="member.photo" hide-details required)
      v-layout
        v-flex(xs3)
          v-subheader Биография
        v-flex(xs9)
          v-text-field(textarea v-model="member.biography" hide-details required label="RU")
          v-text-field(textarea v-model="member.biographyEN" hide-details required label="EN")
      div
        v-btn(@click="addMember" color="primary" v-if="editing === null") Добавить
        div(v-else)
          v-btn(color="red accent-4" dark @click="cancelEditing") Отменить
          v-btn(color="primary" @click="saveMember") Сохранить
      div
        v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="memberAdding")
</template>
<script>
import { mapState } from 'vuex'
import { database } from '~/plugins/firebase-client-init.js'
import { addElement } from '~/plugins/functions.js'

export default {
  data: () => ({
    removedMembers: [],
    member: {
      name: null,
      editing: null,
      nameEN: null,
      position: null,
      positionEN: null,
      biography: null,
      biographyEN: null,
      photo: null,
      showDone: false
    }
  }),
  props: ['Members'],
  methods: {
    showRemovedMembers (index) {
      const array = this.removedMembers
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    cancelEditing () {
      this.member = {
        name: null,
        editing: null,
        nameEN: null,
        position: null,
        positionEN: null,
        biography: null,
        biographyEN: null,
        photo: null,
        showDone: false
      }
      this.editing = null
    },
    editMember (item, index) {
      this.member = item
      this.editing = index
    },
    async saveMember () {
      await database.ref('Members/' + this.member.key).update(this.member)
      this.showDone = true
      setTimeout(() => {
        this.showDone = false
      }, 2500)
    },
    removeMember (item, index) {
      this.removedMembers.push(index)
      database.ref('Members').child(item.key).remove()
    },
    async addMember () {
      this.$store.commit('set', { type: 'memberAdding', items: true })
      await addElement('Members', this.member)
      await this.$store.dispatch('updateMembers')
      this.$store.commit('set', { type: 'memberAdding', items: false })
    }
  },
  computed: mapState({
    memberAdding: 'memberAdding'
  })
}
</script>
<style scoped lang="scss">
.isEditing {
  transition: .4s;
  background-color: #eee!important;
}
</style>
