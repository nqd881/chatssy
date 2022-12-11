import { modelOptions, prop } from '@typegoose/typegoose';
import { DbMessageContentTypes } from './enum';

@modelOptions({
  schemaOptions: {
    _id: false,
    discriminatorKey: 'contentType',
  },
})
export class DbMessageContentBase {
  @prop({ required: true, enum: DbMessageContentTypes })
  contentType: DbMessageContentTypes;
}
