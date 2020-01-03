<template>
<!-- 组件模板中找数据: 找组件对象(小的vm对象) -->
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer :todos="todos" :checkAllTodos="checkAllTodos" 
        :clearCompleteTodos="clearCompleteTodos"/>
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

    mounted () {
      // 模拟异步加载
      setTimeout(() => {
        // 从local中读取todos_key对应的数据
        // this.todos = JSON.parse(localStorage.getItem('todos_key')) || [] // 如果没有存值, 返回的null
        this.todos = getTodos() // 如果没有存值, 返回的null
      }, 1000);
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