import {ApiClient} from "@apis/base";

export type PasswordForgotData = {
  email: string;
};

export const passwordForgotApi = (data: PasswordForgotData) => {
  return ApiClient.post("users/auth/password_forgot", data);
};

export type PasswordResetData = {
  password: string;
  confirm_password: string;
};

export const passwordResetApi = (data: PasswordResetData) => {
  return ApiClient.post("users/auth/password_reset", data);
};
