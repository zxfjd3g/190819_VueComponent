<template>
<!-- 组件模板中找数据: 找组件对象(小的vm对象) -->
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import List from '@comps/List'
  import Footer from '@comps/Footer'
  
  export default { 
    // name: 'App',
    data () {
      return {
        todos: [
          {id: 1, title: 'A', complete: false},
          {id: 2, title: 'B', complete: true},
          {id: 4, title: 'C', complete: false},
        ]
      }
    },

    methods: { // 所有的方法都会成为组件对象的方法
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      }
    },

    components: { // 局部注册组件, 只能在当前组件使用
      Header,
      List,
      Footer
    }

  }
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