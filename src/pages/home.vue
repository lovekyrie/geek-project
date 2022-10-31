<template>
  <h1>这是首页11</h1>
  <TodoListPinia />
  <Modal title="信息提示" content="打开了一个弹窗" :visible="modalVisible" @handleCancel="onCancel" @handleOk="onOk" />
  <button @click="openModal">打开弹窗</button>
</template>
<script setup>
import TodoListPinia from '../components/TodoListPinia.vue'
import Modal from '../components/modal/Modal.vue'

import { ref } from 'vue'
const modalVisible = ref(false)
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
