import { createRouter, createWebHistory } from "vue-router";
import UserApi from "@/api/UserApi";
import SessionService from "@/services/SessionService";
import Orders from "@/views/Orders.vue";
import Product from "@/views/Product.vue";
import Login from "@/views/Login.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Orders",
    meta: {
      authOnly: true,
      layout: "layout-bar",
    },
    component: Orders,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      authOnly: true,
      layout: "layout-bar",
    },
    component: Product,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      guestOnly: true,
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (SessionService.hasSession() && !store.state.appReady) {
    console.log("start init SESSION");

    const sessionResponse = await UserApi.fetch();
    store.commit("SET_USER", sessionResponse.data);
    store.commit("SET_APP_READY", true);
    console.log("init SESSION done");
  }

  const user = store.state.user;

  if (to.meta.guestOnly && user) {
    next({ name: "Orders" });
    return;
  }

  if (to.meta.authOnly && !user) {
    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
