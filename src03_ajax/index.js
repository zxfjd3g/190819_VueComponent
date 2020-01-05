import '@babel/polyfill'
import Vue from 'vue' 
import VueResource from 'vue-resource'
import App from './App.vue'

// 声明使用Vue插件
Vue.use(VueResource) // 所有组件对象都有一个属性$http对象 get()/post()


new Vue({
  el: '#root',
  render: h => h(App),
  beforeCreate () {
    // 将当前vm对象作为事件总线挂到vue原型对象上
    Vue.prototype.$eventBus = this
    // this.__proto__.$eventBus = this
  }
})
