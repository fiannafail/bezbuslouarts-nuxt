<template lang="pug">
  div(class="grey lighten-2")
    v-content
      v-container(container-fluid grid-list-lg)
        v-layout
          v-flex(xs4 offset-sm4)
            transition(name="fade")
              v-card(class="elevation-5 pa-3" color="grey lighten-5" v-if="show === true" transition="fade-transition")
                v-card-title(primary-title)
                  h3(class="headline") Admin Panel
                v-card-text
                  v-form
                    v-text-field(label="E-mail" type="email" v-model="email" required color="accent")
                    v-text-field(label="Password" color="accent" v-model="password" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'" required)
                  v-btn(large color="primary" @click="SignIn") Login
                  div(v-if="loading")
                    v-progress-circular(indeterminate v-bind:size="50" color="primary")
</template>

<script>
export default {
  data () {
    return {
      show: false,
      title: 'Admin',
      email: '',
      password: '',
      e1: 'visibility_off'
    }
  },
  methods: {
    async SignIn () {
      await this.$store.dispatch('SignIn', { email: this.email, password: this.email })
      this.$router.replace({ path: '/admin' })
    }
  },
  async created () {
    await this.user
    console.log('user1', this.user)
    if (this.user !== null) {
      this.$router.replace({ path: 'admin' })
    } else {
      this.show = true
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    loading () {
      return this.$store.getters.isLoading
    }
  }
}
</script>

<style lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
