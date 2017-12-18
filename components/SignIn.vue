<template lang="pug">
  div(class="grey lighten-2")
    v-content
      v-container(container-fluid grid-list-lg)
        v-layout
          v-flex(xs4 offset-sm5)
            v-card(class="elevation-5 pa-3" color="grey lighten-5")
              v-card-title(primary-title)
                h3(class="headline") Admin Panel
              v-card-text
                v-form
                  v-text-field(label="E-mail" type="email" v-model="email" required)
                  v-text-field(label="Password" v-model="password" :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'" required)
                v-btn(large color="primary" @click="SignIn") Login
                v-btn(@click="get") get
</template>

<script>
export default {
  data () {
    return {
      title: 'Admin',
      email: '',
      password: '',
      e1: 'visibility_off'
    }
  },
  methods: {
    SignIn () {
      this.$store.dispatch('SignIn', { email: this.email, password: this.email })
    },
    get () {
      const name = this.$firebase.auth().currentUser
      console.log(name)
    }
  }
}
</script>

<style lang="css">
</style>
