import {ApiClient} from "../base";

export type LoginApiData = {
  username: string;
  password: string;
};

export const loginApi = (data: LoginApiData) => {
  return ApiClient.post("/auth/login", data);
};

// export interface UserApi {
//   _id: string;
//   profile: {
//     first_nane: string;
//     last_name: string;
//     birth_date: string;

//   }
// }

export class User {
  _id: string;
  profile: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    address: {
      city: string;
      country_code: string;
      postal_code: string;
      state: string;
      street_line_1: string;
      street_line_2: string;
    };
  };
  email: {
    address: string;
  };
  setting: {
    language: {
      base_language: string;
    };
  };
}

export interface LoginReqB {
  username: string;
  password: string;
}

export interface LoginResB extends User {}
