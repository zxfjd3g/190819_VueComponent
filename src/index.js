import Vue from 'vue' 
import App from './App.vue'
import './base.css'

Vue.config.productionTip = false

// 给Vue的原型对象添加一个vm对象属性
// Vue.prototype.$globalEventBus = new Vue()
// Vue.prototype.$eventBus = new Vue()
// Vue.prototype.$bus = new Vue()

new Vue({
  el: '#root',
  render: h => h(App),
  beforeCreate () { // 在尽量早时间保存当前vm, 作为全局事件总线对象
    Vue.prototype.$globalEventBus = this
  }
})
