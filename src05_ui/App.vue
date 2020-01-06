<template>
  <div>
    <mt-button style="width: 100%" type="danger" @click="hint">测试mint-ui</mt-button>
  </div>
</template>

<script>
  import { MessageBox, Toast } from 'mint-ui'
  export default {
    methods: {
      hint () {
        MessageBox.alert('点击了button')
          .then(action => {
            Toast({
              message: '提示',
              position: 'bottom',
              duration: 5000
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>