<template lang="pug">
  section(class="scenarios-section elevation-4")
      h2(class="headline") Сценарии
      v-container(grid-list-md)
        v-layout
          v-flex(xs3)
            v-subheader Заголовок
          v-flex(xs9)
            v-text-field(v-model="SectionsMeta.Scenarios.title" required hide-details)
            v-text-field(v-model="SectionsMeta.Scenarios.titleEN" required hide-details)
        v-layout
          v-flex(xs3)
            v-subheader Подаголовок
          v-flex(xs9)
            v-text-field(v-model="SectionsMeta.Scenarios.subtitle" required hide-details)
            v-text-field(v-model="SectionsMeta.Scenarios.subtitleEN" required hide-details)
        v-layout
          v-flex(xs3)
            v-subheader Текст
          v-flex(xs9)
            v-text-field(v-model="SectionsMeta.Scenarios.text" textarea required hide-details)
            v-text-field(v-model="SectionsMeta.Scenarios.textEN" textarea required hide-details)
        v-btn(color="primary" @click="editSectionMeta('Scenarios')") Сохранить изменения
        v-divider
        h2 Фильмы
        v-container(grid-list-md)
          v-layout
            v-flex(xs6)
              v-layout(v-for="(item, index) in scenariosMovies" :key="index")
                transition(name="fade")
                  div(class="photo-overlay" v-if="showRemovedScenarios(index) === true")
                v-flex(xs10 class="body-2" d-flex) {{ item.title }}
                v-flex(xs2)
                  v-btn(flat icon color="red" @click="removeScenario(item, index)")
                    v-icon close
        v-layout
          v-flex(xs3 d-flex)
            v-subheader Название фильма
          v-flex(xs6)
            v-text-field(v-model="movie.title" required hide-details label="Название")
            v-text-field(v-model="movie.titleEN" required hide-details label="Название (EN)")
          v-flex(d-flex)
            v-btn(color="primary" @click="addScenario") Добавить
</template>
<script>
import { mapState } from 'vuex'
import { baseElementUpdate, addElement, Section } from '~/plugins/functions.js'
//  import { database } from '~/plugins/firebase-client-init.js'

export default {
  data: () => ({
    revomedScenarios: [],
    movie: {
      title: null,
      titleEN: null
    },
    SectionsMeta: {
      Scenarios: {
        title: null,
        subtitle: null,
        text: null,
        titleEN: null,
        subtitleEN: null,
        textEN: null
      }
    }
  }),
  methods: {
    async removeScenario (item, index) {
      const removed = this.scenarios.remove(item, index)
      this.revomedSoundtracks = removed
    },
    async addScenario () {
      await addElement('Scenarios', this.movie)
      this.$store.dispatch('updateScenariosMovies')
    },
    showRemovedScenarios (index) {
      return this.scenarios.showRemovedItems(index)
    },
    editSectionMeta (type) {
      baseElementUpdate('Texts', type, this.SectionsMeta.Scenarios)
    }
  },
  created () {
    this.SectionsMeta = this.sectionsMeta
  },
  computed: {
    scenarios () {
      const scenarios = new Section('Scenarios', this.movie, this.revomedScenarios)
      return scenarios
    },
    ...mapState({
      sectionsMeta: 'sectionsMeta',
      scenariosMovies: 'scenariosMovies'
    })
  }
}
</script>
<style lang="scss" scoped>
.scenarios-section {
  h2 {
    margin: 16px 0;
  }
}
button:not(.btn--flat) {
  margin: 25px 0;
}
.layout {
  position: relative;
  .flex.xs6 > .layout {
    border-bottom: 1px solid #dcdcdc;
  }
  .d-flex {
    align-items: center;
  }
}
</style>
