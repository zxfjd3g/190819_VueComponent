  <template>
  <div class="todo-footer">
    
    <label>
      <!-- <input type="checkbox" v-model="isCheckAll"/> -->
      <slot>
        <button>test</button>
      </slot> <!-- 默认插槽 -->
    </label>
    
    <slot name="middle"></slot> <!-- 命名插槽 -->
    <!-- <span>
      <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
    </span> -->
    
    <slot name="right"></slot> <!-- 命名插槽 -->
    <!-- <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompleteTodos">清除已完成任务</button> -->
  </div>
</template>

<script type="text/ecmascript-6">
  /* 
  模板数据的来源?
  1. data: 自身可变数据
  2. props: 从外部接收的可变数据
  3. computed: 根据已有的data或props数据进行计算产生的数据
  */
  export default {
   

    
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
