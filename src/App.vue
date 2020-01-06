<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 路由链接 -->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 
              默认缓存的是所有对应的路由组件对象
              通过include/exclude来指定缓存部分组件对象
            -->
            <!-- <keep-alive include="About"> -->
            <keep-alive exclude="Home">
              <!-- 在此处显示当前路由组件 -->
              <router-view msg="abc"></router-view>
              <!-- 所有它管理的路由组件都能得到接收的msg属性 -->
            </keep-alive>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>