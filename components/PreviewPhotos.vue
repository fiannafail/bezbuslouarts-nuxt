<template lang="pug">
  div(id="PreviewPhotos")
    v-btn(raised color="primary") Upload Image
</template>
<script>
import draggable from 'vuedraggable'
export default {

  async beforeCreate () {
    await this.$store.dispatch('getPreviewPhotos')
  },
  data: () => ({
  })
}
</script>
<style lang="scss" scoped>
#PreviewPhotos {
  display: flex;
}
</style>
