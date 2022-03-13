import { createApp } from "vue";
import App from "./App.vue";

import "./index.scss";
import router from "./router"; //声明带后缀，应用也要带后缀，保持统一
import { createPinia } from "pinia";
createApp(App).use(router).use(createPinia()).mount("#app");
