<template lang="pug">
    div(class="wrapper")
      section(class="header-section")
        header-section
      section(class="preview-photos")
        div(v-for="(item, index) in previewPhotos" key="index")
          img(:src="item")
</template>

<script>
//  import axios from '~/plugins/axios'
import HeaderSection from '../components/HeaderSection'

export default {
  async asyncData ({ store }) {
    await store.dispatch('getPreviewPhotos')
  },
  data () {
    return {
      photos: this.previewPhotos
    }
  },
  components: {
    HeaderSection
  },
  computed: {
    data () {
      return this.$store.state.data
    },
    all () {
      return this.$store.state.all
    },
    previewPhotos () {
      return this.$store.state.previewPhotos
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    get () {
      this.$firebase.database().ref('data').once('value')
        .then(response => {
          var childData = response.val()
          console.log(childData)
        })
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
.preview-photos {
  display: flex;
  & img {
    width: 100%;
  }
}
</style>
