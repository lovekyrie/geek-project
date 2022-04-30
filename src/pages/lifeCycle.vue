<template>
  <div>生命周期演示</div>
</template>
<script>
import { onBeforeMount, onMounted, onRenderTriggered } from 'vue'
export default {
  beforeCreate() {
    console.log('------beforeCreate-----')
  },
  created() {
    console.log('------created-----')
  },
  setup() {
    console.log('------setup-----')
    onBeforeMount(() => {
      console.log('------onBeforeMount-----')
    })
    onMounted(() => {
      console.log('------onMounted-----')
    })
    onRenderTriggered((event) => {
      console.log('------onMounted-----', event)
    })
  },
}
</script>
