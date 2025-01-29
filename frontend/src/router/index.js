import { createRouter, createWebHistory } from "vue-router";
import DashBoardView from "../views/DashBoard.vue";
import CartView from "../views/Cart.vue";  
import BillingView from "../views/BillingView.vue";  
import OrdersView from "../views/OrdersView.vue"; 

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
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/billing",
    name: "billing",
    component: BillingView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersView,  
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
