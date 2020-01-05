/* 
定义路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

// 声明使用Vue插件
Vue.use(VueRouter)

// 向外暴露路由器对象
export default new VueRouter({
  // 应用中所有路由
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/news', // path左边的 / 代表项目根路径
          component: News
        },
        {
          path: 'message', // 相当于 /home/message
          component: Message,
          children: [
            {
              path: '/home/message/detail/:mid',
              component: MessageDetail
            }
          ]
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    // 自跳转的路由
    {
      path: '/',
      redirect: '/about'
    }
  ]
})
