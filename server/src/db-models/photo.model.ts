import { modelOptions, prop, PropType } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { DbFile } from './file.model';

export enum PhotoSizeTypes {
  ORIGINAL = 'original',
  BIG = 'big',
  MEDDIUM = 'medium',
  SMALL = 'small',
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class PhotoSize {
  @prop({ enum: PhotoSizeTypes, required: true })
  type: PhotoSizeTypes;

  @prop({ required: true })
  width: number;

  @prop({ required: true })
  height: number;

  @prop({ required: true })
  file: DbFile;
}

@modelOptions({})
export class DbPhoto {
  @prop({ default: null })
  thumbnail: DbFile;

  @prop({ required: true })
  original: DbFile;

  @prop({ type: [PhotoSize], default: [] }, PropType.ARRAY)
  sizes: mongoose.Types.Array<PhotoSize>;
}
