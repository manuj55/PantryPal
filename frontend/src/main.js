import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SignIn from "./views/SignIn.vue";
import UserProfile from "./views/UserProfile.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createApp(App).use(store).use(router).use(SignIn).use(UserProfile).mount("#app");
