<template lang="pug">
  section(class="members-section")
    div(class="wrapper" v-bind:class="{ expanded: Members.length > 2 }")
      p(v-lang.aboutUs)
      h2(class="section-headline" v-lang.team)
      div(class="member-block")
        div(v-for="(item, index) in Members" :key="index")
          div(class="metabox")
            img(v-lazy="item.photo")
            div
              p(class="red-text") {{ language === 'ru' ? item.name : item.nameEN }}
              p {{ language === 'ru' ? item.position : item.positionEN }}
          div(class="bio" v-if="item.biography")
            p {{ language === 'ru' ? item.biography : item.biographyEN }}
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    //  ...
  }),
  computed: mapState({
    language: 'language'
  }),
  props: ['Members']
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
@mixin red-line {
  margin-top: 18px;
  display: block;
  content: "";
  height: 125px;
  width: 2px;
  background-color: #e02106;
}
.members-section {
  height: 800px;
  padding-bottom: 50px;
  background-color: #181818;
  .wrapper {
    width: 950px;
    margin: 0 auto;
    &.expanded {
      width: 1180px;
    }
    & > p {
      @include red-text;
      text-align: center;
      padding: 15px;
    }
  }
  .member-block {
    display: flex;
    margin-top: 90px;
    transition: .8s;
    & * {
      transition: .8s;
    }
    & > * {
      flex: 1 1;
      display: flex;
      position: relative;
      text-align: center;
      color: white;
      font-family: Open Sans;
      font-size: 13px;
      justify-content: center;
      .bio {
        opacity: 0;
        position: absolute;
        left: 80px;
        display: inherit;
        background-color: #111111;
        padding: 25px;
        line-height: 1.92;
        color: #bababa;
        margin-left: 10px;
        text-align: left;
        padding-right: 25%;
      }
      &:hover{
        justify-content: inherit;
        .bio {
          opacity: 1;
        }
        .metabox {
          position: relative;
          div {
            p {
              margin-top: 0;
              margin-bottom: 8px;
            }
            position: absolute;
            margin-top: 25px;
            top: 265px;
            width: 400px;
            text-align: left;
            left: 50%;
            transform: translateX(-50%) translateY(-50%) rotate(90deg);
          }
        }
        img {
          width: 70px;
          height: 70px;
        }
      }
      .red-text {
        margin-top: 16px;
        @include red-text;
      }
      img {
        width: 170px;
        height: 170px;
        border-radius: 100%;
      }
    }
  }
  & > p {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 5px;
    @include red-text;
  }
  &:before {
    @include red-line;
    position: relative;
    margin-top: 0;
    left: calc(50% - 1px);
  }
  h2 {
    text-align: center;
  }
}
@media screen and (max-width: 480px) {
  .members-section .member-block>* .bio {
    padding: 25px;
  }
  .members-section .member-block > * {
  justify-content: inherit;
  margin-bottom: 15px;
  .bio {
    position: relative;
    left: 0;
    opacity: 1;
  }
  .metabox {
    position: relative;
    div {
      p {
        margin-top: 0;
        margin-bottom: 8px;
      }
      position: absolute;
      margin-top: 25px;
      top: 265px;
      width: 400px;
      text-align: left;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
  }
    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
