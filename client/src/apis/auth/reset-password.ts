import {ApiClient} from "@apis/base";

export type PasswordForgotData = {
  email: string;
};

export const passwordForgotApi = (data: PasswordForgotData) => {
  return ApiClient.post("user/auth/password_forgot", data);
};

export type PasswordResetData = {
  password: string;
  confirmPassword: string;
};

export const passwordResetApi = (data: PasswordResetData) => {
  return ApiClient.post("user/auth/password_reset", data);
};
