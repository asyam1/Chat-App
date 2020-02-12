import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:""
  },
  getters:{
    component: state => state.component,
    getUsername : state => {
      return state.username
    },
  },
  mutations: {
    changeUsername(state, value){
      console.log(value)
      state.username = value
    }
  },
  actions: {
  },
  modules: {
  }
})
