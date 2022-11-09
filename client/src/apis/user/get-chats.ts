import {ApiClient} from "@apis/base";

export const getChatsApi = (userId: string) => {
  return ApiClient.get(`users/${userId}/chats`);
};
