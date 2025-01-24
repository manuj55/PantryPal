import { createRouter, createWebHistory } from "vue-router";
import DashBoardView from "../views/DashBoard.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",  // Redirect root to dashboard
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoardView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
