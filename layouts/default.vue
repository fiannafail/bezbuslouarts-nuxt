<template lang="pug">
  div
    v-app
      nuxt
      my-footer
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.btn--small {
  font-size: 12px;
  font-weight: 700;
  height: 32px;
}
.container {
    max-width: 1280px;
    margin: 0 auto !important;
}
.movies label, .partners label {
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
  background-color: #309a6b !important;
  box-shadow: 2px 2px 2px rgba(48, 154, 107, 0.3);
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
</style>
