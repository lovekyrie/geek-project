<template>
  <h1>这是关于页面</h1>
  <h2>你的评分是：{{ score }}</h2>
  <Rate v-model="score">
    <img width="14" src="/favicon.ico" />
  </Rate>
  <!-- <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate> -->
  <Animation></Animation>
</template>
<script setup>
import { ref } from "vue";
import Rate from "../components/Rate.vue";
import Animation from "../components/Animation.vue";
let score = ref(0);
// function update(num) {
//   score.value = num;
// }
</script>