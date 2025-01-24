import { createRouter, createWebHistory } from "vue-router";
import DashBoardView from "../views/DashBoard.vue";
import CartView from "../views/Cart.vue";  

const routes = [
  {
    path: "/",
    redirect: "/dashboard",  
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoardView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
