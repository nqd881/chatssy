import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { DbUser } from './user/user.model';

@modelOptions({})
export class DbFile {
  @prop({ ref: () => DbUser, required: true })
  ownerId: Ref<DbUser>;

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
