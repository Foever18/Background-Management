import Vue from 'vue'
import Vuex from 'vuex'
// 保存本地文件
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    delToken (state) {
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
