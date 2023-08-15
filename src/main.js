import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import vuetify from "./plugins/vuetify";
import { VPagination } from "vuetify/lib";

Vue.config.productionTip = false;

Vue.component("v-pagination", VPagination);

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
