<template>
<!-- 组件模板中找数据: 找组件对象(小的vm对象) -->
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header :addTodo="addTodo"/> -->
      <!-- <Header @addTodo2="addTodo"/> -->
      <Header ref="header"/>
      <List :todos="todos" :updateTodo="updateTodo"/>
      <Footer>
        <!-- 插槽内容结构是在父组件中解析好后再传递子组件 -->
        <button slot="right" class="btn btn-danger" v-show="completeSize>0"
              @click="clearCompleteTodos">清除已完成任务</button>
        
        <template slot="middle">
          <span>
            <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
          </span>
        </template>
        
        <input type="checkbox" v-model="isCheckAll"/>  <!-- 传递给默认slot -->
      </Footer>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import List from '@comps/List'
  import Footer from '@comps/Footer'
  import { saveTodos, getTodos } from './utils/storageUtils'
  // import * as storageUtils from './utils/storageUtils'
  
  export default { 
    // name: 'App',
    data () {

      return {
        todos: []
      }
    },

    computed: {
      completeSize () {
        /* reduce(): 根据数组中元素进行统计(累计/累加)处理
        const arr = [1, 3, 4, 5, 7]
        const total = arr.reduce((preTotal, item) => preTotal + (item%2===1 ? item : 0), 0)
        let result = 0
        arr.forEach(item => {
          result += item
        }) */

        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },

      isCheckAll: {
        get () {
          return this.todos.length === this.completeSize &&  this.completeSize>0// 不能直接completeSize()
        },
        set (value) { // 操作checkbox   value代表当前勾选的状态
          // 对todos进行全选/全不选
          this.checkAllTodos(value)
        }
      }
    },

    beforeCreate () {
      this.__proto__.aaa = 1
      this.__proto__.__proto__.bbb = 2
    },

    mounted () {
      console.log('mounted()', this)

      // 通过$globalEventBus来绑定自定义事件监听
      this.$globalEventBus.$on('deleteTodo', this.deleteTodo)

      // 给<Header>组件对象绑定自定义事件监听
      /* 要求: 绑定自定义事件监听和分发事件的组件对象得是同一个 */
      this.$refs.header.$on('addTodo2', this.addTodo)

      // 模拟异步加载
      setTimeout(() => {
        // 从local中读取todos_key对应的数据
        // this.todos = JSON.parse(localStorage.getItem('todos_key')) || [] // 如果没有存值, 返回的null
        this.todos = getTodos() // 如果没有存值, 返回的null
      }, 1000);
    },

    beforeDestroy () {
      // 解绑自定义事件监听
      this.$refs.header.$off('addTodo2')
      this.$globalEventBus.$off('deleteTodo')
    },

    methods: { // 所有的方法都会成为组件对象的方法
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      /* 对所有todos进行全选/全不选 */
      checkAllTodos (isCheck) {
        this.todos.forEach(todo => todo.complete = isCheck)
      },

      clearCompleteTodos () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },

      updateTodo (todo, isCheck) {
        todo.complete = isCheck
      }
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        // handler: function (value) { // value是最新的todos
        //   // 保存最新的todos到local, 必须以json形式
        //   // localStorage.setItem('todos_key', JSON.stringify(value))
        //   saveTodos(value)
        // }
        handler: saveTodos
      }
    },

    components: { // 局部注册组件, 只能在当前组件使用
      Header,
      List,
      Footer
    }

  }

/* 
  const obj = {
    fn (a) {
      // 处理事件
    }
  }

  div.onclick = function (event) {
    obj.fn(event)
  }
  div.onclick = obj.fn
 */
</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>