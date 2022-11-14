import {ApiClient} from "@apis/base";
import {StringLocale} from "yup/lib/locale";

export const detectMeApi = () => {
  return ApiClient.get("auth/me");
};
