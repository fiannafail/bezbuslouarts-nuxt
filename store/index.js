import Vue from 'vue'
import Vuex from 'vuex'
import { Auth, database } from '~/plugins/firebase-client-init.js'
import { baseUpdate, baseRetrieve } from '~/plugins/functions.js'
//  import axios from '~/plugins/axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    language: 'ru',
    user: null,
    data: '',
    all: '',
    loading: false,
    movieEditing: false,
    issueLoader: false,
    issueAdding: false,
    movieAdding: false,
    memberAdding: false,
    partnerAdding: false,
    partnersImagesAdding: false,
    previewPhotos: [],
    movies: [],
    issues: [],
    soundtracks: [],
    partners: [],
    partnersImages: [],
    sectionsMeta: [],
    members: [],
    scenariosMovies: [],
    movie: {
      title: null,
      titleEN: null,
      photo: null,
      preview: null,
      descr: null,
      descrEN: null,
      year: null,
      trailer: null,
      thumb1: null,
      thumb2: null,
      thumb3: null,
      thumb4: null,
      thumb5: null,
      thumb6: null
    }
  },
  getters: {
    issueLoader: (state, getters) => {
      return state.issueLoader
    },
    isLoading: (state, getters) => {
      return state.loading
    },
    activeUser: (state, getters) => {
      return state.user
    }
  },
  mutations: {
    set (state, {type, items}) {
      state[type] = items
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    issueLoading (state, payload) {
      state.issueLoader = payload
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.user) {
        commit('set', { type: 'user', items: req.user })
      }
    },
    async updateScenariosMovies ({ commit }) {
      baseUpdate('child_added', 'Scenarios', (cb) => {
        commit('set', { type: 'scenariosMovies', items: cb })
      })
    },
    async getScenarioMovies ({ commit }) {
      const data = await baseRetrieve('Scenarios')
      commit('set', { type: 'scenariosMovies', items: data })
    },
    changeLang ({ commit }) {
      if (this.language === 'en') {
        commit('set', { type: 'language', items: 'ru' })
      } else {
        commit('set', { type: 'language', items: 'en' })
      }
    },
    cleanMovie ({ commit }) {
      const movie = {
        title: null,
        titleEN: null,
        photo: null,
        preview: null,
        descr: null,
        descrEN: null,
        year: null,
        trailer: null,
        thumb1: null,
        thumb2: null,
        thumb3: null,
        thumb4: null,
        thumb5: null,
        thumb6: null
      }
      commit('set', { type: 'movie', items: movie })
      commit('set', { type: 'movieEditing', items: false })
    },
    editMovie ({ commit }, payload) {
      commit('set', { type: 'movieEditing', items: true })
      commit('set', { type: 'movie', items: payload })
    },
    async updateMembers ({ commit }) {
      baseUpdate('child_added', 'Members', (cb) => {
        commit('set', { type: 'members', items: cb })
      })
    },
    async getMembers ({ commit }) {
      const data = await baseRetrieve('Members')
      commit('set', { type: 'members', items: data })
    },
    async getTexts ({ commit }) {
      const data = await baseRetrieve('Texts')
      commit('set', { type: 'sectionsMeta', items: data })
    },
    async updatePartnersImages ({ commit }) {
      baseUpdate('child_added', 'PartnersImage', (cb) => {
        //  console.log(cb)
        commit('set', { type: 'partnersImages', items: cb })
      })
    },
    async getPartnersImages ({ commit }) {
      const data = await baseRetrieve('PartnersImage')
      commit('set', { type: 'partnersImages', items: data })
    },
    async updatePartners ({ commit }) {
      baseUpdate('child_added', 'Partners', (cb) => {
        //  console.log(cb)
        commit('set', { type: 'partners', items: cb })
      })
    },
    async getPartners ({ commit }) {
      const data = await baseRetrieve('Partners')
      commit('set', { type: 'partners', items: data })
    },
    async getSoundtracks ({ commit }) {
      const data = await baseRetrieve('Soundtracks')
      commit('set', { type: 'soundtracks', items: data })
    },
    async IssueEdit ({ commit }) {
      baseUpdate('value', 'Issues', (cb) => {
        //  console.log(cb)
        commit('set', { type: 'issues', items: cb })
      })
      commit('issueLoading', false)
    },
    async SignIn ({ commit }, payload) {
      commit('setLoading', true)
      const userData = await Auth.signInWithEmailAndPassword(payload.email, payload.password)
      commit('set', { type: 'user', items: { email: userData.email, uid: userData.uid } })
      //  console.log(this.state.user)
      commit('setLoading', false)
    },
    async getMovies ({ commit }) {
      let array = []
      try {
        const data = await database.ref('Movies').once('value')
        data.forEach((child) => {
          const childData = child.val()
          array.push(childData)
        })
        //  console.log(array)
        commit('set', { type: 'movies', items: array })
      } catch (err) {
        console.log(err)
      }
    },
    async getIssues ({ commit }) {
      let array = []
      try {
        const data = await database.ref('Issues').orderByKey().once('value')
        data.forEach((child) => {
          const childData = child.val()
          array.push(childData)
        })
        commit('set', { type: 'issues', items: array })
        //  console.log(this.state.issues)
      } catch (err) {
        console.log(err)
      }
    },
    async updateIssues ({ commit }) {
      let updateArray = []
      await database.ref('Issues').on('child_added', snapshot => {
        console.log('updated', snapshot.val())
        updateArray.push(snapshot.val())
        commit('set', { type: 'issues', items: updateArray })
      })
      commit('setLoading', false)
    },
    async getPreviewPhotos ({ commit }) {
      let array = []
      try {
        const data = await database.ref('Movies').once('value')
        data.forEach((child) => {
          const childData = child.val()
          array.push(childData)
        })
        commit('set', { type: 'previewPhotos', items: array })
        //  console.log(this.state.previewPhotos)
      } catch (err) {
        console.log(err)
      }
    },
    updatePhotos ({ commit }) {
      let updateArray = []
      database.ref('Movies').on('child_added', snapshot => {
        console.log('updated', snapshot.val())
        updateArray.push(snapshot.val())
        commit('set', { type: 'movies', items: updateArray })
      })
      commit('setLoading', false)
    }
  }
})

export default store
