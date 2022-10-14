import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class LocalFile {
  @prop({ default: null })
  path: string;

  @prop({ default: false })
  is_downloading_active: boolean;

  @prop({ default: false })
  is_downloading_completed: boolean;
}

@modelOptions({})
export class RemoteFile {
  @prop({ default: null })
  url: string;

  @prop({ default: false })
  is_uploading_active: boolean;

  @prop({ default: false })
  is_uploading_completed: boolean;
}

@modelOptions({})
export class File {
  @prop({ required: true })
  size: number;

  @prop({ default: null })
  local: LocalFile;

  @prop({ default: null })
  remote: RemoteFile;
}

export type FileDoc = DocumentType<File>;
export type FileModel = ReturnModelType<typeof File>;
