<template>
  <div>生命周期演示</div>
  <button @click="open">打开弹窗</button>
  <GeekTransition />
</template>
<script>
import { onBeforeMount, onMounted, onRenderTriggered, inject } from 'vue'
import GeekTransition from '../components/GeekTransition.vue'
// import { openModal } from '../components/modal'
export default {
  setup() {
    const openModal = inject('OPENDIALOG')

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

    const open = () => {
      openModal({
        title: '标题',
        content: '内容',
      })
    }

    return {
      open,
    }
  },
  beforeCreate() {
    console.log('------beforeCreate-----')
  },
  created() {
    console.log('------created-----')
  },
}
</script>
