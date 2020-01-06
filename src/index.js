import Vue from 'vue' 
import App from './App.vue'
import store from './store'

new Vue({
  el: '#root',
  render: h => h(App),
  store, // 配置vuex的核心对象store
})
