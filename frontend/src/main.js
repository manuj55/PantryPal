import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTachometerAlt, faShoppingCart, faFileInvoice, faUser, faSignInAlt, faUserPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(faTachometerAlt, faShoppingCart, faFileInvoice, faUser, faSignInAlt, faUserPlus,faTrashAlt);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).use(router);
app.mount("#app");
