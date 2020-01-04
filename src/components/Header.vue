<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" 
    @keyup.enter="add" v-model="title"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: { // 限定了:属性的名称/属性值的类型/属性的必要性
      /* addTodo: { 
        type: Function,
        required: true
      } */
    },
    data () {
      return {
        title: ''
      }
    },

    mounted () {
      console.log('header mounted()', this)
    },

    methods: {
      add () {
        
        // 1. 根据输入创建一个todo
        const title = this.title.trim()
        if (!title) {
          return
        }
        const todo = {
          id: Date.now(),
          complete: false,
          title,
        }
        // 2. 添加todo
        // this.addTodo(todo)
        // 分发自定义事件: addTodo2
        this.$emit('addTodo2', todo)

        // 3. 清除输入
        this.title = ''
      }
    }
  }
</script>

<style scoped>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }

</style>
