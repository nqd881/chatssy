import { modelOptions, prop } from '@typegoose/typegoose';
import { Photo } from './photo.model';

@modelOptions({})
export class WebPage {
  @prop({ required: true })
  url: string;

  @prop({ required: true })
  title: string;

  @prop()
  display_url: string;

  @prop()
  site_name: string;

  @prop()
  description: string;

  @prop()
  photo: Photo;
}
