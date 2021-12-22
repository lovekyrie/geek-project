<template>
  <h1>这是关于页面</h1>
  <Rate :value="score"></Rate>
</template>
<script setup>
import { ref } from "vue";
import Rate from "../components/Rate";
let score = ref(3);
</script>