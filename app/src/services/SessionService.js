import store from "@/store";

class SessionService {
  static setSession(token) {
    localStorage.setItem("ordersToken", token);
  }
  static removeSession() {
    localStorage.removeItem("ordersToken");
    store.commit("SET_USER", null);
    store.commit("SET_APP_READY", false);
  }
  static hasSession() {
    return !!localStorage.getItem("ordersToken");
  }
  static getToken() {
    return localStorage.getItem("ordersToken");
  }
}

export default SessionService;
