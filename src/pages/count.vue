<template>
  <p>count:{{ count }}</p>
  <p>倍数：{{ multiple }}</p>
  <div>
    <button @click="increase()">加1</button>
    <button @click="decrease()">减1</button>
  </div>
</template>
<script setup lang="ts">
import { useCount } from "../utils/useCount";
const { count, multiple, increase, decrease } = useCount(10);
</script>
