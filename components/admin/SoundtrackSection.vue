<template lang="pug">
  section(class="soundtrack-section elevation-4")
    h2(class="headline") Саундтреки
    div
      div(v-for="(item, index) in Soundtracks" class="audio-controls")
        no-ssr
        div
          div(class="track-meta")
            span {{ item.Singer }}
            span {{ item.Title }}
        vue-audio(:file="soundtrack.url")
    v-container(grid-list-md)
        v-layout(row)
          v-flex(xs3)
            v-subheader Аудизапись
          v-flex(xs9)
            v-text-field(v-model="soundtrack.url" label="URL ссылка на аудиозапись" hide-details required)
        v-layout(row)
          v-flex(xs6)
            v-layout
              v-flex(xs5)
                v-subheader Исполнитель
              v-flex(xs7)
                v-text-field(v-model="soundtrack.singer" label="Исполнитель" hide-details required)
          v-flex(xs6)
            v-layout
              v-flex(xs3)
                v-subheader Трек
              v-flex(xs9)
                v-text-field(v-model="soundtrack.title" label="Название трека" hide-details required)
        v-btn(color="primary" @click="addSoundtrack") Добавить
        v-divider
        h2 Редактирование секции
        v-container(grid-list-md)
          v-layout
            v-flex(xs4)
              v-subheader Заголовок блока
            v-flex(xs8)
              v-text-field(v-model="SectionsMeta.Soundtrack.title" hide-details label="Заголовок секции")
          v-layout
            v-flex(xs4)
              v-subheader Подзаголовок
            v-flex(xs8)
              v-text-field(v-model="SectionsMeta.Soundtrack.subtitle" hide-details label="Подзаголовок секции")
          v-layout
            v-flex(xs12)
              v-text-field(textarea v-model="SectionsMeta.Soundtrack.text" label="Основной текст")
          v-btn(color="primary" @click="editSectionMeta('Soundtrack')") Сохранить изменения
</template>
<script>
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'
import VueAudio from 'vue-audio'
import { baseElementUpdate } from '~/plugins/functions.js'
import { database } from '~/plugins/firebase-client-init.js'

export default {
  data: () => ({
    soundtrack: {
      url: null,
      singer: null,
      title: null
    },
    SectionsMeta: {
      Soundtrack: {
        Partners: {
          title: null,
          subtitle: null,
          text: null
        }
      }
    }
  }),
  created () {
    this.SectionsMeta = this.sectionsMeta
  },
  methods: {
    editSectionMeta () {
      baseElementUpdate('Texts', 'Soundtrack', this.SectionsMeta.Soundtrack)
    },
    async addSoundtrack () {
      //  this.$store.commit('set', { type: 'movieAdding', items: true })
      const newKey = database.ref().child('Soundtracks').push().key
      const updates = {}
      this.soundtrack.key = newKey
      updates[newKey] = this.soundtrack
      await database.ref().child('Soundtracks').update(updates)
      //  await this.$store.dispatch('updatePhotos')
      //  this.$store.commit('set', { type: 'movieAdding', items: false })
    }
  },
  computed: mapState({
    Soundtracks: 'soundtracks',
    sectionsMeta: 'sectionsMeta'
  }),
  components: {
    'no-ssr': NoSSR,
    'vue-audio': VueAudio
  }
}
</script>
<style lang="scss" scoped>
.soundtrack-section {
  h2, button {
    margin: 18px 0;
  }
}
</style>
