<template lang="pug">
  section(class="soundtrack-section elevation-4")
    h2(class="headline") Саундтреки
    div
      v-container(grid-list-md)
        v-layout(v-for="(item, index) in Soundtracks" :key="index")
          v-flex(xs10)
            transition(name="fade")
              div(class="photo-overlay" v-if="showRemovedSoundtracks(index) === true")
            div( class="audio-controls")
              no-ssr
              div
                div(class="track-meta")
                  span {{ item.singer }}
                  span {{ item.title }}
              vue-audio(:file="soundtrack.url")
          v-flex(xs2 d-flex)
            v-icon(class="icon-remove" @click="removeSoundtrack(item, index)") delete
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
                v-text-field(v-model="soundtrack.singerEN" label="Исполнитель (EN)" hide-details required)
          v-flex(xs6)
            v-layout
              v-flex(xs3)
                v-subheader Трек
              v-flex(xs9)
                v-text-field(v-model="soundtrack.title" label="Название трека" hide-details required)
                v-text-field(v-model="soundtrack.titleEN" label="Название трека (EN)" hide-details required)
        v-btn(color="primary" @click="addSoundtrack") Добавить
        v-divider
        h2 Редактирование секции
        v-container(grid-list-md)
          v-layout
            v-flex(xs4)
              v-subheader Заголовок блока
            v-flex(xs8)
              v-text-field(v-model="SectionsMeta.Soundtrack.title" hide-details label="Заголовок секции")
              v-text-field(v-model="SectionsMeta.Soundtrack.titleEN" hide-details label="Заголовок секции (EN)")
          v-layout
            v-flex(xs4)
              v-subheader Подзаголовок
            v-flex(xs8)
              v-text-field(v-model="SectionsMeta.Soundtrack.subtitle" hide-details label="Подзаголовок секции")
              v-text-field(v-model="SectionsMeta.Soundtrack.subtitleEN" hide-details label="Подзаголовок секции (EN)")
          v-layout
            v-flex(xs12)
              v-text-field(textarea v-model="SectionsMeta.Soundtrack.text" label="Основной текст")
              v-text-field(textarea v-model="SectionsMeta.Soundtrack.textEN" label="Основной текст (EN)")
          v-btn(color="primary" @click="editSectionMeta('Soundtrack')") Сохранить изменения
</template>
<script>
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'
import VueAudio from 'vue-audio'
import { baseElementUpdate, Section } from '~/plugins/functions.js'
//  import { database } from '~/plugins/firebase-client-init.js'

export default {
  data: () => ({
    soundtrack: {
      url: null,
      singer: null,
      title: null,
      singerEN: null,
      titleEN: null
    },
    SectionsMeta: {
      Soundtrack: {
        title: null,
        subtitle: null,
        text: null,
        titleEN: null,
        subtitleEN: null,
        textEN: null
      }
    },
    revomedSoundtracks: []
  }),
  created () {
    this.SectionsMeta = this.sectionsMeta
  },
  methods: {
    removeSoundtrack (item, index) {
      const removed = this.soundtracks.remove(item, index)
      this.revomedSoundtracks = removed
    },
    showRemovedSoundtracks (index) {
      return this.soundtracks.showRemovedItems(index)
    },
    editSectionMeta () {
      baseElementUpdate('Texts', 'Soundtrack', this.SectionsMeta.Soundtrack)
    },
    async addSoundtrack () {
      this.soundtracks.add()
    }
  },
  computed: {
    soundtracks () {
      const soundtracks = new Section('Soundtracks', this.soundtrack, this.revomedSoundtracks)
      return soundtracks
    },
    ...mapState({
      Soundtracks: 'soundtracks',
      sectionsMeta: 'sectionsMeta'
    })
  },
  components: {
    'no-ssr': NoSSR,
    'vue-audio': VueAudio
  }
}
</script>
<style lang="scss" scoped>
.soundtrack-section {
  .layout {
    position: relative;
  }
  h2, button {
    margin: 18px 0;
  }
  i {
    font-family: 'Material Icons' !important;
  }
}
</style>
