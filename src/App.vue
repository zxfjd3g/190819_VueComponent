<template>
  <div>
    <div v-if="!repoName">loading...</div>
    <div v-else>moast star repo is <a :href="repoUrl">{{repoName}}</a></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default { 
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    mounted () {
      // 使用vue-resource发ajax请求
      /* this.$http.get('https://api.github.com/search/repositories2?q=j&sort=stars')
        .then(response => {
          const result = response.data
          const {name, html_url} = result.items[0]
          // 更新数据
          this.repoName = name
          this.repoUrl = html_url
        })
        .catch(error => {
          alert('请求出错')
        }) */
      // 使用axios发ajax请求
      // axios.get('http://localhost:4000/repositories/vue')
      axios.get('/api/repositories/vue') // 转发http://localhost:4000/api/repositories/vue
        .then(response => {
          const result = response.data   // {status: 0, data: {name, html_url}}
          const {name, html_url} = result.data
          // 更新数据
          this.repoName = name
          this.repoUrl = html_url
        })
        .catch(error => {
          alert('请求出错2222')
        })
    }
  }
</script>

<style scoped>

</style>