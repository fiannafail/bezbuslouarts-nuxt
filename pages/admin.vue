<template lang="pug">
  div(class="body")
    v-container(grid-list-lg)
      v-layout(row)
        v-flex(xs6)
          movies-list
          media-section
          partners-section
          scenarios-section
        v-flex(xs6)
          movie-section
          soundtrack-section
          members-section( :Members="Members")
</template>
<script>
import SignIn from '~/components/SignIn.vue'
import MembersSection from '~/components/admin/MembersSection.vue'
import SoundtrackSection from '~/components/admin/SoundtrackSection.vue'
import MoviesList from '~/components/admin/MoviesList.vue'
import MediaSection from '~/components/admin/MediaSection.vue'
import ScenariosSection from '../components/admin/ScenariosSection'
import PartnersSection from '~/components/admin/PartnersSection.vue'
import MovieSection from '~/components/admin/MovieSection.vue'
import PreviewPhotos from '../components/admin/PreviewPhotos'
import { baseElementUpdate } from '~/plugins/functions.js'
require('vue-animate-transitions/dist/vue-animate-transitions.min.css')

export default {
  middleware: 'auth-check',
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('getMovies'),
      store.dispatch('getIssues'),
      store.dispatch('getSoundtracks'),
      store.dispatch('getPartners'),
      store.dispatch('getPartnersImages'),
      store.dispatch('getTexts'),
      store.dispatch('getMembers'),
      store.dispatch('getScenarioMovies')
    ])
  },
  methods: {
    editSectionMeta (ref) {
      console.log(ref)
      baseElementUpdate('Texts', ref, this.SectionsMeta.Partners)
    }
  },
  components: {
    SignIn,
    MoviesList,
    PreviewPhotos,
    MediaSection,
    PartnersSection,
    MovieSection,
    ScenariosSection,
    MembersSection,
    SoundtrackSection
  },
  computed: {
    Members () {
      return this.$store.state.members
    },
    sectionsMeta () {
      return this.$store.state.sectionsMeta
    },
    partnersImagesAdding () {
      return this.$store.state.partnersImagesAdding
    },
    PartnersImages () {
      return this.$store.state.partnersImages
    },
    Partners () {
      return this.$store.state.partners
    },
    Soundtracks () {
      return this.$store.state.soundtracks
    },
    partnerAdding () {
      return this.$store.state.partnerAdding
    },
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
    deletedPartners: [],
    deletedPartnersImages: [],
    showEditor: [],
    showTooltip: [],
    partnersImage: null,
    issue: {
      title: null,
      url: null,
      image: null,
      magazine: null
    },
    soundtrack: {
      url: null,
      singer: null,
      title: null
    }
  })
}
</script>
<style lang="scss">
section {
  margin-top: 16px;
  background-color: white;
  .input-group {
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: -8px;
    margin-right: -8px;
    label {
      padding-left: 8px;
      font-size: 13px;
      font-weight: 500;
      top: 12px;
    }
  }
  .list__tile__action i {
      font-family: Material Icons!important;
  }
}
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
.media-section {
  background-color: rgb(255, 255, 255);
  margin-top: 16px;
  .list__tile__action i {
    font-family: 'Material Icons' !important;
  }
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
