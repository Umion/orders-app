class SessionService {
  static setSession(token) {
    localStorage.setItem("ordersToken", token);
  }
  static removeSession() {
    localStorage.removeItem("ordersToken");
  }
  static hasSession() {
    return !!localStorage.getItem("ordersToken");
  }
  static getToken() {
    return localStorage.getItem("ordersToken");
  }
}

export default SessionService;
