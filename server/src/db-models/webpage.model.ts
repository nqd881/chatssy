import { modelOptions, prop } from '@typegoose/typegoose';
import { DbPhoto } from './photo.model';

@modelOptions({})
export class DbWebPage {
  @prop({ required: true })
  url: string;

  @prop({ required: true })
  title: string;

  @prop()
  displayUrl: string;

  @prop()
  siteName: string;

  @prop()
  description: string;

  @prop()
  photo: DbPhoto;
}
