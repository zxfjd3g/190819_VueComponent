import Vue from 'vue' 
import { Button } from 'mint-ui'
import App from './App.vue'

// 注册全局组件
Vue.component(Button.name, Button)  // mt-button

new Vue({
  el: '#root',
  render: h => h(App),
})
