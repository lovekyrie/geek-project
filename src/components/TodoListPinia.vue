<template>
  <div class="todo-list-pinia">
    <p>{{ userName }}</p>
    <el-form :model="form" label-position="right" label-witdh="100px" style="max-width: 460px" ref="ruleFormRef" :rules="rules">
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Create</el-button>
        <el-button>cancel</el-button>
      </el-form-item>
    </el-form>
    <!-- 展示todo list -->
    <ul v-if="taskList.length > 0">
      <li class="task-item" v-for="(task, index) in taskList" :key="index">
        <el-checkbox v-model="task.done">{{ task.title }}</el-checkbox>
        <div class="item-delete" @click="deleteTodo(index)">X</div>
      </li>
    </ul>
    <div v-else>暂无数据</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus/es'
import { useTodoStore } from '../store'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { userName, taskList } = storeToRefs(store)
const form = reactive({
  name: '',
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
  ],
})

// 新增todo
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // pinia has not mutations
      store.createTodo(taskList.value, {
        title: form.name,
        done: false,
      })
      form.name = ''
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 删除todo
const deleteTodo = (id: number) => {
  store.deleteTodo(taskList.value, { id })
}
</script>

<style scoped lang="scss">
.todo-list-pinia {
  .task-item {
    display: flex;
    align-items: center;
    .item-delete {
      margin-left: 15px;
      width: 25px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
