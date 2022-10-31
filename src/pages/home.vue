<template>
  <h1>这是首页11</h1>
  <TodoListPinia />
  <Modal title="信息提示" content="打开了一个弹窗" v-model="modalVisible" @update:modelValue="modalVisible = $event" @handleOk="onOk">
    <form>
      <label for="">姓名</label>
      <input v-model="name" placeholder="请输入姓名" />
      <label for="">年龄</label>
      <input v-model="age" placeholder="请输入年龄" />
    </form>
  </Modal>
  <button @click="openModal">打开弹窗</button>
</template>
<script setup>
import TodoListPinia from '../components/TodoListPinia.vue'
import Modal from '../components/modal/Modal.vue'

import { ref, provide } from 'vue'
const modalVisible = ref(false)
provide('modalType', 'default')
const openModal = () => {
  modalVisible.value = true
}

const onCancel = (status) => {
  modalVisible.value = status
}

const onOk = (status) => {
  modalVisible.value = status
}
</script>
