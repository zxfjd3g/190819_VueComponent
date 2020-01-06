<template>
  <ul>
    <!-- <li>ID: {{$route.params.mid}}</li>  -->
    <li>ID: {{mid}}</li> 
    <!-- <li>Title: {{$route.query.title}}</li>  -->
    <li>Title: {{title}}</li> 
    <li>Content: {{detail.content}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
  const allDetails = [
          {id: 1, title: 'message001', content: 'message content001'},
          {id: 2, title: 'message002', content: 'message content002'},
          {id: 3, title: 'message003', content: 'message content003'},
          {id: 4, title: 'message004', content: 'message content004'},
  ]
  export default {
    props: ['mid', 'title'],
    data () {
      return {
        detail: {}
      }
    },

    // 在路由参数发生改变时, 不会重新, 因为组件对象没有销毁重新创建
    mounted() {
      console.log('Detail mounted()')
      // 模拟请求获取对应详情数据
      this.show(this.$route)
    },
     // 监视路由的变化(本质是参数数据 ==> 内部对$route进行了重新赋值)
    watch: {
      '$route' (to, from) {// to就是$route的最新值
        this.show(to)
      }
    },

    methods: {
      show (route) {
        setTimeout(() => {
          const detail = allDetails.find(detail => route.params.mid * 1 ===detail.id)
          this.detail = detail
        }, 1000);
      }
    }
  }
</script>

<style scoped>

 
</style>
