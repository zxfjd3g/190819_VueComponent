import Vue from 'vue' 
import App from './App.vue'
import router from './router'

new Vue({
  el: '#root',
  render: h => h(App),
  router, // 注册路由器  所有的组件都有一个$route/$router
})
