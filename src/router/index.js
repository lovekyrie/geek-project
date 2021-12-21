import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home.vue";
import About from "../pages/about.vue";
import Syntax from "../pages/syntax.vue";
import LifeCycle from "../pages/lifeCycle.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/syntax",
    name: "Syntax",
    component: Syntax,
  },
  {
    path: "/lifeCycle",
    name: "LifeCycle",
    component: LifeCycle,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
