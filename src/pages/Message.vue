<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        <!-- <router-link :to="'/home/message/detail/' + m.id">{{m.title}}</router-link> -->
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      console.log('Message mounted()')
      // 模拟请求获取messages
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 3, title: 'message003'},
          {id: 4, title: 'message004'},
        ]
        this.messages = messages
      }, 1000);
    }
  }
</script>

<style scoped>

 
</style>
