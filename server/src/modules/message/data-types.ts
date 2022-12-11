import { DbMessageContentTypes } from 'src/db-models/message';

export type AddMessageData = {
  senderId: string;
  contentType: DbMessageContentTypes;
  content: any;
};

// export interface MessageDataBase {
//   senderId: string;
// }

// export interface
