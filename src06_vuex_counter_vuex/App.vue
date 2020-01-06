<template>
  <div>
    <p>clicked {{count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">incrent if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    
    mounted () {
      console.log(this.$store)
    },

    /* computed: {
      count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      },
    }, */
    computed: {
      ...mapState(['count']), // {'count' () {return this.$store.state['count']}}
      ...mapGetters(['evenOrOdd']), //  {'evenOrOdd' () {return this.$store.getters['evenOrOdd']}}
    },

    /* methods: {
      increment () {
        this.$store.commit('INCREMENT')  // 触发mutation调用更新状态数据
      },
      decrement () {
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd () {
        console.log('incrementIfOdd()')
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        this.$store.dispatch('incrementAsync')
      },
    } */
    methods: {
      ...mapMutations({
        increment: 'INCREMENT',
        decrement: 'DECREMENT'
      }),
      ...mapActions(['incrementIfOdd', 'incrementAsync']),
    }
  }

  /* 
  store: 组件与vuex通信的一个桥梁对象
    state
    getters
    dispatch()
    commit()
  */
</script>

<style scoped>

</style>