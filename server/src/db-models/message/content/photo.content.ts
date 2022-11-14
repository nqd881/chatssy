import { modelOptions, prop } from '@typegoose/typegoose';
import { DbPhoto } from '../../photo.model';

@modelOptions({})
export class DbPhotoContent {
  @prop({ required: true })
  photo: DbPhoto;

  @prop({ default: null })
  caption: string;

  @prop({ default: false })
  isSecret: boolean;
}
