<template>
  <button @click="showDiv">按钮</button>
  <div v-if="show"></div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)

function showDiv() {
  show.value = !show.value
}
</script>

<style lang="scss" scoped>
div {
  margin-left: 100px;
  width: 100px;
  height: 60px;
  background-color: bisque;
}
</style>
