<template>
  <div class="modal-footer">
    <button v-if="type === 'confirm'" @click="onCancel">取消</button>
    <button @click="onOk">确定</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const type = inject('modalType', 'default')
</script>

<style lang="scss" scoped></style>
