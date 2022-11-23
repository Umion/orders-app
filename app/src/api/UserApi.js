import HttpClient from "../services/HttpClient";

const UserApi = {
  login(data) {
    return HttpClient.post("/auth/login", data);
  },

  registration(data) {
    return HttpClient.post("/auth/registry", data);
  },

  fetch() {
    return HttpClient.get("/auth/user");
  },
};

export default UserApi;
