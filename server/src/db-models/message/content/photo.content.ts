import { modelOptions, prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import { DbPhoto } from '../../photo.model';
import { DbMessageContentBase } from './base';

@modelOptions({})
export class DbMessageContentPhoto extends DbMessageContentBase {
  @Type(() => DbPhoto)
  @prop({ required: true })
  photo: DbPhoto;

  @prop({ default: null })
  caption: string;

  @prop({ default: false })
  isSecret: boolean;
}
