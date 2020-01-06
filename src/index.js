import '@babel/polyfill'
import Vue from 'vue' 
import App from './App.vue'
import store from './vuex/store'



new Vue({
  el: '#root',
  render: h => h(App),
  beforeCreate () {
    // 将当前vm对象作为事件总线挂到vue原型对象上
    Vue.prototype.$eventBus = this
    // this.__proto__.$eventBus = this
  },
  store
})
