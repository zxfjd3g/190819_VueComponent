<template>
  <div>
    <h2>Home</h2>
    <ul  class="nav nav-tabs">
      <li>
        <router-link to="/home/news">News</router-link>
      </li> 
      <li>
        <router-link to="/home/message">Message</router-link>
      </li> 
    </ul>
    <!-- 在此显示二级路由组件 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Home',
  }
</script>

<style scoped>

 
</style>
