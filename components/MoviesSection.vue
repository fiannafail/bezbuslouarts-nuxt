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
<style lang="scss" scoped>
@mixin red-text {
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  color: #e02106;
  text-transform: uppercase;
}
@mixin arrow {
  display: inline-block;
  line-height: 1;
  font-size: 28px;
  top: -4px;
  position: absolute;
  color: #e02106;
  font-family: roboto;
}
@mixin red-line {
  margin-top: 18px;
  display: block;
  content: "";
  height: 125px;
  width: 2px;
  background-color: #e02106;
}
@mixin movie-expanded-window {
width: 1140px;
height: 100%;
position: absolute;
background-color: #252525;
}
.movie-expanded-trailer {
@include movie-expanded-window;
}
.movie-expanded-info {
@include movie-expanded-window;
padding: 10px;
color: white;
display: flex;
position: relative;
.movie-info {
	padding: 35px;
	.red-text {
		@include red-text;
		padding: 10px 0;
	}
	p {
		font-family: Open Sans;
		font-size: 14px;
		color: #bbbbbb;
		line-height: 1.93;
	}
	h2 {
		font-family: Merriweather;
		font-size: 40px;
		color: #ffffff;
		text-shadow: 0 0 10px rgba(24, 24, 24, 0.5);
	}
	p {

	}
}
.movie-shots {
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
	max-height: 600px;
	img {
		width: 100%;
	}
	& > div {
		margin-right: 10px;
		margin-bottom: 10px;
		width: calc(50% - 5px;);
		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}
& > div {
	flex: 1 1;
}
}
.movie-footer {
display: flex;
width: 1140px;
margin: 0 auto;
justify-content: space-between;
order: 99;
& > .single {
	width: 100%;
}
}
.movie-wrap {
display: flex;
align-items: flex-end;
}
.movie-meta {
width: 1140px;
height: 100%;
position: absolute;
display: flex;
justify-content: space-between;
font-family: Open Sans;
font-weight: 600;
color: white;
h2 {
	font-family: Merriweather;
	text-shadow: 0 0 10px rgba(24, 24, 24, 0.5);
	font-size: 55px;
	line-height: 1;
}
.movie-expand {
	text-transform: uppercase;
	p {
		margin-bottom: 10px;
		letter-spacing: 0;
		cursor: pointer;
	}
	&:after {
		@include red-line;
	}
}
.movie-info {
	p {
		padding: 24px 0;
		margin-bottom: 0;
		color: #e02106;
	}
	&:before {
		display: block;
		content: "";
		height: 125px;
		width: 2px;
		background-color: #e02106;
	}
}
}
.movies-section {
  background-color: #181818;
  margin-top: 150px;
  .movie-info {

  }
  .tabs__items {
    display: flex;
    flex-direction: column;
  }

  .arrow-left {
    position: relative;
    &:before {
      @include arrow;
      content: "←";
    }
    &.backlink:before {
      padding: 24px 0;
      margin-left: -32px;
    }
  }
  .arrow-right {
    position: relative;
    &:after {
      @include arrow;
      content: "\2192";
    }
    &.backlink:after {
      padding: 24px 0;
      margin-right: 24px;
    }
  }
  .backlink {
    color: white;
    font-family: Open Sans;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    padding: 24px;
    position: relative;
  }
  .tabs__bar {
    margin-top: 45px;
    height: 3px;
    order: 100;
  }
  .image-container {
    background-size: cover;
    background-position: center;
    width: 800px;
    height: 600px;
  }
  .card--flat {
    background-color: transparent;
    display: flex;
    justify-content: center;
    .card__text {
      position: absolute;
    }
  }
}
</style>