/* 
vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* 
相当于data对象
*/
const state = {
  count: 1, // 初始化状态数据
}

/* 
包含n个用于直接更新状态数据的方法的对象
*/
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
}

/* 
包含n个用于间接更新状态数据的方法的对象
*/
const actions = {
  increment (context) {
    // commit给mutation
    context.commit('INCREMENT')
  },
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  incrementIfOdd ({ commit, state }) {
    if (state.count %2=== 1) {
      commit('INCREMENT')
    }
  },
  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  },
}
const getters = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})