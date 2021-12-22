import { createApp } from "vue";
import App from "./App.vue";

import "./index.scss";
import router from "./router/index.ts"; //声明带后缀，应用也要带后缀，保持统一
import vuex from "./store/index.ts";
createApp(App).use(router).use(vuex).mount("#app");
