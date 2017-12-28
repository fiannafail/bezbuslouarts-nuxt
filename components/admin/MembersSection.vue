<template lang="pug">
  section(class="members-section elevation-4")
    h2(class="headline") Члены команды
    v-list(two-line)
      div(v-for="(item, index) in Members")
        v-list-tile(avatar)
          transition(name="fade")
            div(class="photo-overlay" v-if="removedMembers(index) === true")
          v-list-tile-avatar
            img(v-bind:src="item.photo")
          v-list-tile-content
            v-list-tile-title {{ item.name }}
            v-list-tile-sub-title {{ item.position }}
          v-list-tile-action
            v-icon(class="icon-remove" @click="removeMember(item, index)") delete
        v-divider
    v-container(grid-list-md)
      v-layout(row)
        v-flex(xs6)
          v-layout
            v-flex(xs4)
              v-subheader Имя и фамилия
            v-flex(xs8)
              v-text-field(v-model="member.name" label="Имя и фамилия" hide-details required)
        v-flex(xs6)
          v-layout
            v-flex(xs4)
              v-subheader Позиция
            v-flex(xs8)
              v-text-field(v-model="member.position" label="Позиция" hide-details required)
      v-layout
        v-flex(xs3)
          v-subheader Фотография
        v-flex(xs9)
          v-text-field(label="URL фотографии" v-model="member.photo" hide-details required)
      v-layout
        v-flex(xs3)
          v-subheader Биография
        v-flex(xs9)
          v-text-field(textarea v-model="member.biography" hide-details required)
      v-btn(@click="addMember" color="primary") Добавить
      div
        v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="memberAdding")
</template>
<script>
import { mapState } from 'vuex'
import { database } from '~/plugins/firebase-client-init.js'
import { addElement } from '~/plugins/functions.js'

export default {
  data: () => ({
    removerMembers: [],
    member: {
      name: null,
      position: null,
      biography: null,
      photo: null
    }
  }),
  props: ['Members'],
  methods: {
    removedMembers (index) {
      const array = this.removerMembers
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    removeMember (item, index) {
      this.removerMembers.push(index)
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

</style>
