<template lang="pug">
section(class="header-section")
  div(id="HeaderSection")
    div(class="logo")
    div(class="wrapper")
      div(class="title-block")
        h1(v-lang.title) Мы создаем независимое
          span белорусское кино.
      div(class="menu")
        ul
          li
            a(href="#" v-scroll-to="'#movies'" v-lang.projects)
          span |
          li
            a(href="#" v-scroll-to="'.partnership-section'" v-lang.cooperation)
          span |
          li(v-lang.aboutUs)
          span |
          li
            a(href="#" v-scroll-to="'.media-section'" v-lang.press)
    div(class="section-footer")
      p(@click="changeLang" v-lang.lang)
      p(class="arrow-right" v-lang.contacts)
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
    changeLang () {
      this.$store.dispatch('changeLang')
      this.language = this.language === 'en' ? this.language = 'ru' : this.language = 'en'
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin arrow {
  display: inline-block;
  line-height: 1;
  font-size: 28px;
  top: -4px;
  position: absolute;
  color: #e02106;
  font-family: roboto;
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
#HeaderSection {
  height: 880px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .logo {
    position: absolute;
    margin: 0 auto;
    width: 300px;
    height: 74px;
    top: 25px;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/bezbuslouarts.appspot.com/o/logo.png?alt=media&token=754cd17d-f10d-48ba-9927-45bcf8631637)
  }
}
.section-footer {
  position: absolute;
  bottom: 45px;
  display: flex;
  justify-content: space-between;
  width: 1180px;
  p {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    cursor: pointer;
  }
}
.wrapper {
  display: flex;
  align-items: inherit;
  flex-direction: column;
}
.title-block {
  width: 750px;
  height: 275px;
  border: 1px solid rgba(143, 143, 143, 0.5);
  display: flex;
  align-items: center;
  & h1 {
    font-size: 48px;
    font-family: Merriweather;
    color: white;
    text-align: center;
    width: 100%;
    & span {
      color: #e02106;
      display: block;
    }
  }
}
.menu {
  width: 60%;
  height: 75px;
  display: flex;
  align-items: center;
}
.menu ul {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
  color: white;
  text-transform: uppercase;
  a {
    color: #ffffff;
    text-decoration: none;
  }
  & span {
    color: #e02106;
  }
}
@media screen and (max-width: 480px) {
  .menu {
    width: 85%!important;
  li {
    padding: 0 5px;
    }
  }
}
</style>
