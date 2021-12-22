import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/about.vue"),
  },
  {
    path: "/syntax",
    name: "Syntax",
    component: () => import("../pages/syntax.vue"),
  },
  {
    path: "/lifeCycle",
    name: "LifeCycle",
    component: () => import("../pages/lifeCycle.vue"),
  },
  {
    path: "/count",
    name: "Count",
    component: () => import("../pages/count.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
