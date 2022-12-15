import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({})
export class DbFile {
  @prop({ required: true })
  ownerId: Types.ObjectId;

  @prop({ required: true })
  size: number;

  @prop({ default: null })
  url: string;

  @prop({ default: false })
  isUploadingActive: boolean;

  @prop({ default: false })
  isUploadingCompleted: boolean;
}

export type DbFileDoc = DocumentType<DbFile>;
export type DbFileModel = ReturnModelType<typeof DbFile>;
