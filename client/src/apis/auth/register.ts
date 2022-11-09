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
  return ApiClient.post("users/registration/email", {
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    password: data.password,
    email: data.email,
    birth_date: data.birthDate,
  });
};
