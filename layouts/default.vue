<template lang="pug">
  div
    v-app
      nuxt
</template>

<script>

export default {
}
</script>
<style lang="scss">
.application {
  font-family: Open Sans;
  font-weight: 500; 
}
.icon.icon--large {
  font-family: 'Material Icons' !important;
}
.input-group--select {
  .input-group__selections {
      overflow: inherit !important;
    }
  .input-group__input {
    justify-content: flex-end;
  }
}
.soundtrack-section {
  .soundtracks .track-meta, .soundtracks .vue-sound__playback-time-total,
  .soundtracks .icon-pause2:before, .soundtracks .icon-play3:before {
    color: white;
  }
  .audio-controls .vue-sound__playback-time-wrapper {
    display: flex !important;
    top: 10px;
    width: calc(100% - 186px) !important;
    font-family: Open Sans;
    font-size: 14px;
    background-color: rgba(224, 33, 6, 0.3)!important;
    .vue-sound__playback-time-total {
      width: 100px;
      position: absolute;
      right: -115px;
      top: -15px;
    }
    & > * {
      display: block;
    }
}
.audio-controls .vue-sound-wrapper .vue-sound__player .vue-sound__playback-time-wrapper .vue-sound__playback-time-indicator {
  background: #e02106 !important;
}
.audio-controls {
  position: relative;
}
.track-meta {
  position: absolute;
  left: 76px;
  top: 10px;
  font-family: Merriweather;
  font-size: 12px;
}
  .audio-controls .vue-sound-wrapper .vue-sound__player {
    height: auto !important;
    line-height: inherit !important;
    display: flex;
    align-items: center;
    .icon-play3, .icon-pause2 {
      margin: 10px 20px;
    }
  }
}
.vue-sound-wrapper .vue-sound__player .icon-stop2,
.vue-sound-wrapper .vue-sound__player .icon-download,
.vue-sound-wrapper .vue-sound__player .icon-spinner11,
.vue-sound-wrapper .vue-sound__player .icon-volume-high,
.vue-sound-wrapper .vue-sound__player .volume-slider,
.vue-sound-wrapper .vue-sound__player .volume-toggle,
.vue-sound__playback-time-separator, .vue-sound__playback-time-current {
  display: none !important;
}
.icon-pause2::before {
  background-image: url(../assets/img/pause-circle.svg);
  width: 37px;
  height: 37px;
  display: block;
  content: "" !important;
}
.icon-play3:before {
  background-image: url(../assets/img/play-circle.svg);
  width: 37px;
  height: 37px;
  display: block;
  content: "" !important;
}
.movies-section, .soundtrack-section, .partners-section  {
  .tabs:not(.tabs--grow):not(.tabs--mobile) .tabs__item {
    padding: 0px 12px;
}
  .tabs__item--active {
    background-color: red !important;
  }
  .tabs__li {
    margin-left: 15px;
    margin-right: 15px;
    .tabs__item {
      background-color: #5c5c5c;
    }
  }
  .tabs__container {
    justify-content: center;
  }
}
.btn--small {
  font-size: 12px;
  font-weight: 700;
  height: 32px;
}
.container {
    max-width: 1280px;
    margin: 0 auto !important;
}
.movies label, .media-section label, .soundtrack-section label, .partners-section label {
  padding-left: 8px;
  font-size: 13px;
  font-weight: 500;
  top: 12px;
}
.application.theme--light {
  background-color: #e0e0e0!important;
}
.nuxt-progress {
  height: 3px !important;
  background-color: #e02106 !important;
  box-shadow: 2px 2px 2px rgba(224, 33, 6, 0.5);
}
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
.title-block span {
  color: #e02106;
  display: block;
}
.VueCarousel-dot {
  padding: 15px !important;
  margin: 50px 0 !important;
}
.VueCarousel-dot-inner {
  border-radius: 0 !important;
  width: 30px !important;
  height: 3px !important;
  background-color: #5c5c5c !important;
}
.VueCarousel-dot--active .VueCarousel-dot-inner {
  background-color: #e02106 !important;
}
.VueCarousel-pagination {
  float: none !important;
}
.partnership-section {
  .carousel__controls__item--active i {
    color: #e02106 !important;
    font-size: 44px !important;
  }
  .carousel__controls__item {
    i {
      font-size: 42px;
    }
    margin: 10px !important;
  }
  .carousel__controls {
    background: transparent;
  }
}
.badge--overlap .badge__badge {
  box-shadow: 1px 1px 3px rgba(0,0,0,.3);
  cursor: pointer;
  .icon {
      font-size: 17px;
  }
  &:hover {
    transform: scale(1.1);
  }
}
@media screen and (max-width: 480px) {
  .wrapper {
    width: 100% !important
  }
  .soundtrack-section .audio-controls .vue-sound-wrapper .vue-sound__player .icon-pause2, 
  .soundtrack-section .audio-controls .vue-sound-wrapper .vue-sound__player .icon-play3 {
    margin-left: 0;
  }
}
</style>
