import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import Default from "@/layouts/Default";
import LayoutBars from "@/layouts/LayoutBars";

const app = createApp(App);
app.component("default-layout", Default);
app.component("layout-bar-layout", LayoutBars);

app.use(i18n).use(store).use(router).mount("#app");
