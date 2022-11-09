import {ApiClient} from "@apis/base";

export const detectMeApi = () => {
  return ApiClient.get("auth/me");
};
