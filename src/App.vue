<template>
  <div>
    <h2>{{msg}}</h2>
    <HelloWorld/>
    <hello-world/>
  </div>
</template>

<script>
  // import HelloWorld from '../../../components/HelloWorld'
  import HelloWorld from '@comps/HelloWorld'
  export default { 
    // name: 'App',
    data () {
      return {
        msg: 'First Vue Component'
      }
    },

    components: { // 局部注册组件, 只能在当前组件使用
      // 'HelloWorld': 'HelloWorld',
      // HelloWorld: HelloWorld
      HelloWorld
    }

  }
</script>

<style>
  div {
    color: red;
  }
</style>