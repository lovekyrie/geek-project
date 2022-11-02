import { createApp } from 'vue'
import App from './App.vue'
import Modal from './components/modal/Modal.vue'

import './index.scss'
import router from './router' //声明带后缀，应用也要带后缀，保持统一
import { createPinia } from 'pinia'
import { dialogInstall } from './components/modal'

const app = createApp(App)
app.component('EasyModal', Modal)
app.use(dialogInstall).use(router).use(createPinia())
app.mount('#app')
