import { modelOptions, prop } from '@typegoose/typegoose';
import { Photo } from '../../photo.model';

@modelOptions({})
export class MessagePhotoContent {
  @prop({ required: true })
  photo: Photo;

  @prop({ default: null })
  caption: string;

  @prop({ default: false })
  is_secret: boolean;
}
