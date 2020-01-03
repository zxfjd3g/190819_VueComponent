import Vue from 'vue' 
import App from './App.vue'
import './base.css'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  render: h => h(App)
})