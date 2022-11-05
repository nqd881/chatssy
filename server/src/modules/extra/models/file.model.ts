import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { User } from './user/user.model';

@modelOptions({})
export class File {
  @prop({ ref: () => User, required: true })
  owner_id: Ref<User>;

  @prop({ required: true })
  size: number;

  @prop({ default: null })
  url: string;

  @prop({ default: false })
  is_uploading_active: boolean;

  @prop({ default: false })
  is_uploading_completed: boolean;
}

export type FileDoc = DocumentType<File>;
export type FileModel = ReturnModelType<typeof File>;
