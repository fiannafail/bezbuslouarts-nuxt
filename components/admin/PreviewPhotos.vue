<template lang="pug">
  div
    v-container
      v-layout(row)
        v-flex
          v-text-field(v-model="imageUrl")
        v-flex
          v-btn(raised color="primary" left @click="pushData") Add Photo
</template>
<script>
import { database } from '~/plugins/firebase-client-init.js'
export default {
  data: () => ({
    imageUrl: null
  }),
  methods: {
    pushData () {
      database.ref().child('PreviewPhotos').push({
        image: this.imageUrl
      })
        .then(res => console.log(res))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
