import {ApiClient} from "../base";

export type RegisterApiData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  birthDate?: Date;
};

export type RegisterResult = {};

export const registerApi = (data: RegisterApiData) => {
  return ApiClient.post("user/registration/email", data);
};
