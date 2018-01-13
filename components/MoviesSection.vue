<template lang="pug">
section(class="movies-section" id="movies")
	v-tabs(v-model="activeSlider" centered)
		v-tabs-items
		v-tabs-content(
			v-for="(tab, i) in Movies"
			v-bind:style="{ order: tab.order }"
			:key="i"
			:id="tab.key")
			v-card(flat)
				div(class="image-container"
					v-bind:style="{ backgroundImage: showMovieTrailer === false && showMovieInfo === false ? 'url(' + tab.image + ')' : 'none' }"
					v-bind:class="{ hidden: showMovieTrailer === true || showMovieInfo === true }"
					)
				div(class="movie-meta")
					div(class="movie-info")
						p {{ tab.year }}
						h2(v-show="showMovieInfo === false") {{ language === 'ru' ? tab.title : tab.titleEN }}
					div(class="movie-wrap")
						div(class="movie-expand" v-show="showMovieTrailer === false && showMovieInfo === false")
							p(@click="showMovieInfo = true" class="arrow-right" v-lang.aboutMovie)
							p(@click="showMovieTrailer = true" class="arrow-right" v-lang.watchTrailer)
				transition(name="fadeIn")
					div(class="movie-expanded-trailer" v-if="showMovieTrailer === true"
					v-bind:style="{ position: showMovieTrailer === true ? 'relative' : 'absolute' }"
					)
						youtube(:video-id="getId(tab.trailer)" width="1140" height="600" ref="youtube" @playing="playing")
				transition(name="fadeIn")
					div(class="movie-expanded-info" v-show="showMovieInfo === true"
						v-bind:style="{ position: showMovieInfo === true ? 'relative' : 'absolute' }"
						)
						div(class="movie-info")
							h2 {{ language === 'ru' ? tab.title : tab.titleEN }}
							p(class="red-text") {{ language === 'ru' ? tab.year : tab.year }}
							p {{ language === 'ru' ? tab.descr : tab.descrEN }}
						div(class="movie-shots")
							div
								img(v-lazy="tab.thumb1")
							div
								img(v-lazy="tab.thumb2")
							div
								img(v-lazy="tab.thumb3")
							div
								img(v-lazy="tab.thumb4")
							div
								img(v-lazy="tab.thumb5")
							div
								img(v-lazy="tab.thumb6")
			div(class="movie-footer")
				p(@click="showMovieInfo === true ? showMovieInfo = false : showMovieTrailer = false" v-show="showMovieInfo === true || showMovieTrailer === true"
				class="backlink arrow-left" v-lang.toProjects
				v-scroll-to="'#movies'"
				v-bind:class="{ single: showMovieTrailer === false }"
				)
				p(v-show="showMovieTrailer === true" class="backlink arrow-right" @click="showMovieInfo = true, showMovieTrailer = false" v-lang.aboutMovie)
			v-tabs-bar(dark v-show="showMovieInfo !== true && showMovieTrailer !== true")
				v-tabs-item(
					v-for="(tab, index) in Movies"
					:key="index"
					:href="'#' + tab.key")
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    showMovieInfo: false,
    showMovieTrailer: false
  }),
  methods: {
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    }
  },
  computed: mapState({
    Movies: 'movies',
    activeSlider: 'activeSlider',
    sectionsMeta: 'sectionsMeta'
  })
}
</script>
<<style lang="scss">
	
</style>