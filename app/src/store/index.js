import { createStore } from "vuex";

export default createStore({
  state: {
    appReady: false,
    user: null,
    language: localStorage.getItem("ordersLang") || "en",
    nav_squeeze: JSON.parse(localStorage.getItem("is_squeeze")) || false,
  },
  mutations: {
    SET_LANGUAGE: (state, payload) => {
      state.language = payload;
    },
    SET_NAV_SQUEEZE: (state, payload) => {
      state.nav_squeeze = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_APP_READY(state, payload) {
      state.appReady = payload;
    },
  },
  actions: {},
  getters: {
    nav_squeeze: (state) => state.nav_squeeze,
  },
  modules: {},
});
