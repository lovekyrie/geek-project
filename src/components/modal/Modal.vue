<template>
  <div v-if="props.modelValue" class="modal" @click="onCancel">
    <div class="modal-content" @click="clickStop">
      <div class="modal-header">{{ props.title }}</div>
      <div class="modal-body">
        <div>{{ props.content }}</div>
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button v-if="type === 'confirm'" @click="onCancel">取消</button>
        <button @click="onOk">确定</button>
      </div>
    </div>
  </div>
</template>
<script setup>
// import Footer from './Footer.vue'
const props = defineProps({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  modelValue: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['update:modelValue', 'handleCancel', 'handleOk'])
const onCancel = () => {
  // emit('handleCancel', false)
  emit('update:modelValue', false)
}
const onOk = () => {
  props.close()
}

const clickStop = (e) => {
  e.stopPropagation()
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.5);
  border-radius: 5px;
  .modal-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    width: 400px;
    height: 250px;
    transform: translate(-50%, -50%);
    > div {
      padding: 0 5px;
    }
    .modal-header {
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
    }
    .modal-body {
      flex: 1;
    }
    .modal-footer {
      height: 50px;
      border-top: 1px solid #ccc;
      line-height: 50px;
      text-align: right;
      button {
        + button {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
