<template lang="pug">
section(class="preview-photos")
	div(v-for="(item, index) in Movies" class="photo" @click="changeSlide(item.key)" v-scroll-to="'#movies'")
		div(class="photo-meta")
			h2 {{ language === 'ru' ? item.title : item.titleEN }}
		img(v-lazy="item.preview")
</template>
<script>
import { mapState } from 'vuex'

export default {
  methods: {
    changeSlide (key) {
      this.$store.dispatch('changeSlide', key)
    }
  },
  computed: mapState({
    Movies: 'movies'
  })
}
</script>
<style lang="scss">
	
</style>