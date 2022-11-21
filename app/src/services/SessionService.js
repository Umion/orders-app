class SessionService {
  static setSession() {
    localStorage.setItem("session", true);
  }
  static removeSession() {
    localStorage.removeItem("session");
  }
  static hasSession() {
    return !!localStorage.getItem("session");
  }
}

export default SessionService;
