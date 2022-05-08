import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthView from "../views/AuthView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
