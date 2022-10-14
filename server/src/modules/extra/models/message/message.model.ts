import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Chat } from '../chat.model';
import { MessageBucket } from '../message-bucket.model';
import { User } from '../user/user.model';
import {
  MessageContent,
  MessageContentTypes,
  MessageDocumentContent,
  MessagePhotoContent,
  MessageTextContent,
} from './content';

@modelOptions({})
export class Message {
  @prop({ ref: () => Chat, required: true })
  chat_id: Ref<Chat>;

  @prop({ ref: () => MessageBucket, required: true })
  bucket_id: Ref<MessageBucket>;

  @prop({ ref: () => User, required: true })
  sender_id: Ref<User>;

  @prop({ required: true })
  date: number;

  @prop({ ref: () => User, default: [] }, PropType.ARRAY)
  mentions: Ref<User>[];

  @prop({ enum: MessageContentTypes, required: true })
  content_type: MessageContentTypes;

  @prop({
    required: true,
    discriminators: () => [
      { type: MessageTextContent, value: MessageContentTypes.TEXT },
      { type: MessagePhotoContent, value: MessageContentTypes.PHOTO },
      { type: MessageDocumentContent, value: MessageContentTypes.DOCUMENT },
    ],
  })
  content: MessageContent;
}

export type MessageDoc = DocumentType<Message>;
export type MessageModel = ReturnModelType<typeof Message>;
