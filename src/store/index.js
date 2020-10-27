import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headIconActive:true,
    loginActive:false,
    loading:false,
  },
  mutations: {
    //是否显示侧边
    setheadIconActive(state,bool){
      state.headIconActive = bool
    },
    //是否登录
    setLoginActive(state,bool){
      state.loginActive = bool
    },
    //是否loading
    setLoading(state,bool){
      state.loading = bool
    },
  },
  actions: {
  },
  modules: {
  }
})
