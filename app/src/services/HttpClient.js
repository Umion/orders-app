import axios from "axios";
import SessionService from "./SessionService";

export const baseURL = process.env.VUE_APP_API_HOST || "http://localhost:5000";

export const HttpClient = axios.create({ baseURL });

HttpClient.defaults.headers.common = {
  Accept: "application/json",
};

const requestHandler = async (config) => {
  const token = SessionService.getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = async (error) => {
  if (error.response.status === 401) {
    SessionService.removeSession();
    window.location = "/login";
  }

  return Promise.reject(error);
};

HttpClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

HttpClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default HttpClient;
