<template lang="pug">
  div(id="HeaderSection")
    div(class="wrapper")
      div(class="title-block")
        p Мы создаем независимое
          span  белорусское кино.
      div(class="menu")
        ul
          li
            a(href="#" v-scroll-to="'#movies'") Проекты
          span |
          li
            a(href="#" v-scroll-to="'.partnership-section'") Сотруднчество
          span |
          li О нас
          span |
          li
            a(href="#" v-scroll-to="'.media-section'") Пресса
</template>
<script>
export default {
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#HeaderSection {
  height: 880px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
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
  & p {
    font-size: 48px;
    font-family: PT Serif Caption;
    color: white;
    text-align: center;
    & span {
      color: #e02106;
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
</style>
