import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import { ClassConstructor, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoDoc } from '../utils';
import {
  DbMessageContentDocument,
  DbMessageContentPhoto,
  DbMessageContentText,
} from './content';
import { DbMessageContentBase } from './content/base';
import { DbMessageContentTypes } from './content/enum';

export const DB_MESSAGE_CONTENT_DISCRIMINATOR_MAP: Partial<
  Record<DbMessageContentTypes, ClassConstructor<any>>
> = {
  [DbMessageContentTypes.Text]: DbMessageContentText,
  [DbMessageContentTypes.Document]: DbMessageContentDocument,
  [DbMessageContentTypes.Photo]: DbMessageContentPhoto,
};

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    versionKey: false,
  },
})
export class DbMessage extends MongoDoc {
  @prop({ required: true })
  chatId: Types.ObjectId;

  @prop({ required: true })
  bucketId: Types.ObjectId;

  @prop({ required: true })
  searchId: string;

  @prop({ required: true })
  senderId: Types.ObjectId;

  @prop({ required: true })
  date: number;

  @prop({ default: [] }, PropType.ARRAY)
  mentions: Types.Array<Types.ObjectId>;

  @Type(() => DbMessageContentBase, {
    discriminator: {
      property: 'contentType',
      subTypes: Object.entries(DB_MESSAGE_CONTENT_DISCRIMINATOR_MAP).map(
        ([contentType, classConstructor]) => ({
          name: contentType,
          value: classConstructor,
        }),
      ),
    },
  })
  @prop({
    type: DbMessageContentBase,
    discriminators: () =>
      Object.entries(DB_MESSAGE_CONTENT_DISCRIMINATOR_MAP).map(
        ([contentType, classConstructor]) => ({
          type: classConstructor,
          value: contentType,
        }),
      ),
    required: true,
  })
  content: DbMessageContentBase;
}

export type DbMessageDoc = DocumentType<DbMessage>;
export type DbMessageModel = ReturnModelType<typeof DbMessage>;
