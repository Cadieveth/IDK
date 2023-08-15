import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import AboutPage from "../components/AboutPage.vue";
import ContactPage from "../components/ContactPage.vue";
import PricePage from "@/components/PricePage.vue";
import ServicePage from "@/components/ServicePage.vue";
import DataPage from "@/components/DataPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage, meta: { requiresAuth: false } },
  { path: "/home", component: HomePage, meta: { requiresAuth: true } },
  { path: "/about", component: AboutPage, meta: { requiresAuth: true } },
  { path: "/contact", component: ContactPage, meta: { requiresAuth: true } },
  { path: "/price", component: PricePage, meta: { requiresAuth: true } },
  { path: "/service", component: ServicePage, meta: { requiresAuth: true } },
  { path: "/data", component: DataPage, meta: { requiresAuth: true } },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (isAuthenticated) {
      next({ path: "/home" });
    } else {
      next();
    }
  }
});

export default router;
