import { Message, MessageTypes } from '@modules/extra/models/message';

export type AddMessageData = {
  sender: string;
  type: MessageTypes;
  content: any;
};
