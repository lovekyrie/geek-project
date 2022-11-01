import { createApp, provide } from 'vue'
import Modal from './Modal.vue'

type IOption = {
  title?: String
  content?: String
}

function openModal(options: IOption) {
  // 1.创建弹窗组件实例
  const modalApp = createApp(Modal, {
    modelValue: true,
    title: options.title || 'title',
    content: options.content || 'content',
    close: () => {
      // 将弹窗实例卸载
      modalApp.unmount(dom)
      // 删除页面节点
      document.body.removeChild(dom)
    },
  })
  // 2.创建渲染节点
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  // 3.将实例挂载到页面节点上
  modalApp.mount(dom)
}

function dialogInstall(app: any) {
  console.log('dialogInstall was invoked')
  app.provide('OPENDIALOG', openModal)
}

export { openModal, dialogInstall }
