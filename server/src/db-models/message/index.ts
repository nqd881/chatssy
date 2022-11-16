import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { DbDocumentContent, DbPhotoContent, DbTextContent } from './content';
import { DbMessageBase } from './message-base.model';

export * from './message-base.model';

export enum DbMessageTypes {
  TEXT = 'text',
  PHOTO = 'photo',
  DOCUMENT = 'document',
}

@modelOptions({})
export class DbDocumentMessage extends DbMessageBase {
  @prop()
  type: DbMessageTypes.DOCUMENT;

  @prop()
  content: DbDocumentContent;
}

@modelOptions({})
export class DbPhotoMessage extends DbMessageBase {
  @prop()
  type: DbMessageTypes.PHOTO;

  @prop()
  content: DbPhotoContent;
}

@modelOptions({})
export class DbTextMessage extends DbMessageBase {
  @prop()
  type: DbMessageTypes.TEXT;

  @prop()
  content: DbTextContent;
}

export type DbMessage = DbDocumentMessage | DbPhotoMessage | DbTextMessage;
export type DbMessageDoc = DocumentType<DbMessage>;
