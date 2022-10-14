import { modelOptions, prop, PropType } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { File } from './file.model';

export enum PhotoSizeTypes {
  ORIGINAL = 'original',
  BIG = 'big',
  MEDDIUM = 'medium',
  SMALL = 'small',
}

@modelOptions({})
export class PhotoSize {
  @prop({ enum: PhotoSizeTypes, required: true })
  type: PhotoSizeTypes;

  @prop({ required: true })
  width: number;

  @prop({ required: true })
  height: number;

  @prop({ required: true })
  file: File;
}

@modelOptions({})
export class Photo {
  @prop({ default: null })
  thumbnail: File;

  @prop({ required: true })
  original: File;

  @prop({ type: [PhotoSize], default: [] }, PropType.ARRAY)
  sizes: mongoose.Types.Array<PhotoSize>;
}
