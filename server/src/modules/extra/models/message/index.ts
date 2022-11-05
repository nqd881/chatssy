import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { DocumentContent, PhotoContent, TextContent } from './content';
import { MessageBase } from './message-base.model';

export * from './message-base.model';

export enum MessageTypes {
  TEXT = 'text',
  PHOTO = 'photo',
  DOCUMENT = 'document',
}

@modelOptions({})
export class DocumentMessage extends MessageBase {
  @prop()
  type: MessageTypes.DOCUMENT;

  @prop()
  content: DocumentContent;
}

@modelOptions({})
export class PhotoMessage extends MessageBase {
  @prop()
  type: MessageTypes.PHOTO;

  @prop()
  content: PhotoContent;
}

@modelOptions({})
export class TextMessage extends MessageBase {
  @prop()
  type: MessageTypes.TEXT;

  @prop()
  content: TextContent;
}

export type Message = DocumentMessage | PhotoMessage | TextMessage;
export type MessageDoc = DocumentType<Message>;
