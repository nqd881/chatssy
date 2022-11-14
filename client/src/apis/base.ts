import axios from "axios";

export const ApiClient = axios.create({
  baseURL: "http://192.168.49.2/api",
  timeout: 2000,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

ApiClient.interceptors.response.use(function (response) {
  return response.data;
});
