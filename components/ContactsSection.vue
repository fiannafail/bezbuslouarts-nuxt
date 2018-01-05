<template lang="pug">
  section(class="contacts-section")
    div(class="wrapper")
      div(class="sectiom-meta")
        p(class="red-text" v-lang.contactUS) Свяжитесь с нами
        h2(class="section-headline" v-lang.contacts) Контакты
      div(class="contacts-wrapper")
        div(class="map")
          img(v-lazy="map")
        div(class="contacts")
          img(src="https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/logo.png?alt=media&token=754cd17d-f10d-48ba-9927-45bcf8631637" width="180")
          p(v-lang.address) пр. Независимости, 4, 220030, г. Минск, Республика Беларусь.
          p +375 29 258 65 43
          p hello@bezbuslou.art
</template>
<script>
export default {
  data: () => ({
    map: 'https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/snazzy-image%20(1).png?alt=media&token=7f24f9fa-f9b6-4924-83ab-28536b3ccca7'
  })
}
</script>
<style lang="scss" scoped>
@mixin red-line {
  margin-top: 18px;
  display: block;
  content: "";
  height: 125px;
  width: 2px;
  background-color: #e02106;
}
@mixin red-text {
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  color: #e02106;
  text-transform: uppercase;
}
.contacts-section {
  background-color: #181818;
  .contacts-wrapper {
    width: 800px;
    height: 500px;
    display: flex;
    border: solid 1px rgba(143, 143, 143, 0.5);
    .map {
      width: 66%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .contacts {
      width: 33%;
      padding: 40px;
      color: #bababa;
      line-height: 1.93;
      font-family: Open Sans;
      img {
        margin-bottom: 45px;
      }
    }
  }
  .sectiom-meta {
    position: absolute;
    left: 0;
    top: 140px;
    .section-headline {
      font-size: 55px;
    }
  }
  .wrapper {
    width: 1180px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
    position: relative;
    display: flex;
    justify-content: space-around;
    &:before {
      @include red-line;
      left: 0px;
      position: absolute;
    }
  }
  .red-text {
    @include red-text;
    margin-top: 22px;
  }
}
</style>
