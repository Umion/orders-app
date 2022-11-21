import { createRouter, createWebHistory } from "vue-router";
import UserApi from "../api/UserApi";
import SessionService from "../services/SessionService";
import Orders from "../views/Orders.vue";
import Product from "../views/Product.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Orders",
    meta: {
      // authOnly: true,
    },
    component: Orders,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      // authOnly: true,
      layout: "layout-bar",
    },
    component: Product,
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

  // if (to.meta.guestOnly && user) {
  //   next(
  //     typeof to.meta.guestOnly === "boolean"
  //       ? { name: "home" }
  //       : to.meta.guestOnly
  //   );
  //   return;
  // }

  if (to.meta.authOnly && !user) {
    next({ name: "Orders" });
    return;
  }

  next();
});

export default router;
