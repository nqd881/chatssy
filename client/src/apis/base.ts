import axios from "axios";

export const ApiClient = axios.create({
  baseURL: "http://192.168.49.2/api",
  timeout: 2000,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

ApiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return error.message;
  }
);

ApiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.message;
  }
);
