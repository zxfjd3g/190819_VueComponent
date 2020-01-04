<template>
  <div class="container">
    <Search/>
    <Main/>
  </div>
</template>

<script>
  import Main from './components/Main'
  import Search from './components/Search'
  export default { 
    components: {
      Main,
      Search
    }
  }
</script>

<style scoped>

</style>