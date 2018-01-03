<template lang="pug">
section(class="partners-section elevation-4")
  h2(class="headline") Партнеры
  div(class="partners-images")
    div(class="partners-overlay" v-if="partnersImagesAdding")
      v-progress-circular(indeterminate v-bind:size="100" color="primary")
    h3 Карусель
    div(class="images-box")
      v-badge(overlay right color="red accent-4" overlap
              v-for="(item, index) in PartnersImages" key="index"
              v-bind:class="{ 'deleted': showRemovedPartnersImages(index) === true }"
              )
        v-icon(@click="removePartnersImage(item, index)" slot="badge" dark small) close
        img(:src="item.image")
    div(class="add-partners-images")
      v-layout
        v-flex(xs2)
          v-subheader Ссылка
        v-flex(xs8)
          v-text-field(label="URL ссылка на изображение" v-model="partnersImage" required hide-details)
        v-flex(xs2)
          v-btn(color="primary" fab dark small v-on:click="addPartnersImage")
            v-icon(dark) add
      v-divider
  v-list
    div(v-for="(item, index) in Partners" v-bind:key="item.title")
      v-list-tile(avatar)
        transition(name="fade")
          div(class="photo-overlay" v-if="showRemovedPartners(index) === true")
        v-list-tile-avatar
          img(v-bind:src="item.url")
        v-list-tile-content
          v-list-tile-title(v-html="item.title")
        v-list-tile-action
          v-icon(class="icon-remove" @click="removePartner(item, index)") delete
      v-divider
    v-container(grid-list-md)
      v-layout
          v-flex(xs3)
            v-subheader Логотип
          v-flex(xs0)
            v-text-field(v-model="partner.url" label="URL ссылка на изображение" hide-details)
      v-layout
          v-flex(xs3)
            v-subheader Партнер
          v-flex(xs9)
            v-text-field(v-model="partner.title" label="Название партнера" hide-details)
            v-text-field(v-model="partner.titleEN" label="Название партнера (EN)" hide-details)
    v-btn(color="primary" @click="addPartner") Добавить
    div
      v-progress-circular(indeterminate v-bind:size="50" color="primary" v-if="partnerAdding")
    v-divider
    div(class="partners-text")
      h2 Редактирование блока
      v-container(grid-list-md)
        v-layout
          v-flex(xs4)
            v-subheader Заголовок блока
          v-flex(xs8)
            v-text-field(v-model="SectionsMeta.Partners.title" hide-details label="Заголовок секции")
            v-text-field(v-model="SectionsMeta.Partners.titleEN" hide-details label="Заголовок секции (EN)")
        v-layout
          v-flex(xs4)
            v-subheader Подзаголовок
          v-flex(xs8)
            v-text-field(v-model="SectionsMeta.Partners.subheader" hide-details label="Подзаголовок секции")
            v-text-field(v-model="SectionsMeta.Partners.subheaderEN" hide-details label="Подзаголовок секции (EN)")
        v-layout
          v-flex(xs12)
            v-text-field(textarea v-model="SectionsMeta.Partners.text" label="Основной текст")
            v-text-field(textarea v-model="SectionsMeta.Partners.textEN" label="Основной текст (EN)")
        v-btn(color="primary" @click="editSectionMeta('Partners')") Сохранить изменения
</template>
<script>
import { mapState } from 'vuex'
import { database } from '~/plugins/firebase-client-init.js'
import { addElement, baseElementUpdate } from '~/plugins/functions.js'

export default {
  methods: {
    removePartnersImage (item, index) {
      this.removedPartnersImages.push(index)
      console.log(this.deletedPartnersImages)
      database.ref('PartnersImage').child(item.key).remove()
    },
    async addPartnersImage () {
      this.$store.commit('set', { type: 'partnersImagesAdding', items: true })
      await addElement('PartnersImage', { image: this.partnersImage })
      await this.$store.dispatch('updatePartnersImages')
      this.partnersImage = null
      this.$store.commit('set', { type: 'partnersImagesAdding', items: false })
    },
    removePartner (item, index) {
      this.removedPartners.push(index)
      database.ref('Partners').child(item.key).remove()
    },
    async addPartner () {
      this.$store.commit('set', { type: 'partnerAdding', items: true })
      await addElement('Partners', this.partner)
      await this.$store.dispatch('updatePartners')
      this.$store.commit('set', { type: 'partnerAdding', items: false })
    },
    editSectionMeta (ref) {
      console.log(ref)
      baseElementUpdate('Texts', ref, this.SectionsMeta.Partners)
    },
    showRemovedPartnersImages (index) {
      const array = this.removedPartnersImages
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    },
    showRemovedPartners (index) {
      const array = this.removedPartners
      for (let i = 0; i < array.length; i++) {
        if (array[i] === index) {
          return true
        }
      }
    }
  },
  data: () => ({
    removedPartners: [],
    removedPartnersImages: [],
    partnersImage: null,
    partner: {
      title: null,
      titleEN: null,
      url: null
    },
    SectionsMeta: {
      Partners: {
        title: null,
        subheader: null,
        text: null,
        titleEN: null,
        subheaderEN: null,
        textEN: null
      }
    }
  }),
  computed: mapState({
    PartnersImages: 'partnersImages',
    partnersImagesAdding: 'partnersImagesAdding',
    Partners: 'partners',
    partnerAdding: 'partnerAdding',
    sectionsMeta: 'sectionsMeta'
  }),
  created () {
    this.SectionsMeta = this.sectionsMeta
  }
}
</script>
<style lang="scss" scoped>
.partners-section {
  background-color: white;
  margin-top: 16px;
  .partners-text {
    h2 {
      margin: 22px 0;
    }
    .input-group--textarea {
      margin-left: 0px;
    }
  }
  .partners-images {
    background-color: #eee!important;
    position: relative;
    .partners-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, .75);
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h3 {
      padding: 16px 0;
    }
    .images-box {
      display: flex;
      flex-wrap: wrap;
      & > * {
        position: relative;
        display: block;
        width: calc(25% - 16px);
        margin: 8px;
        transition: .4s;
        &.deleted {
          opacity: .3;
          transition: .4s;
        }
      }
      img {
        width: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 3px solid #fff;
        border-radius: 3px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }
  .list__tile__action i {
    font-family: 'Material Icons' !important;
  }
  .input-group {
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: -8px;
    margin-right: -8px;
  }
}
</style>
