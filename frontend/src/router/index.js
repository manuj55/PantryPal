import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import UserProfile from "../views/UserProfile.vue";

import DashBoardView from "../views/DashBoard.vue";
import CartView from "../views/Cart.vue";  
import BillingView from "../views/BillingView.vue";  
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
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/UserProfile",
    name: "userProfile",
    component: UserProfile,
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
