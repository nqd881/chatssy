import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const ApiClient = axios.create({
  baseURL: `http://${DOMAIN}/api`,
  timeout: 2000,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

ApiClient.interceptors.response.use(function (response) {
  return response.data;
});
