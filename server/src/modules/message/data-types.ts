import { Message, DbMessageTypes } from 'src/db-models/message';

export type AddMessageData = {
  senderId: string;
  type: DbMessageTypes;
  content: any;
};
