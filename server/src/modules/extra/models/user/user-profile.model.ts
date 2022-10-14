import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserProfile {
  @prop({ required: true })
  first_name: string;

  @prop({ required: true })
  last_name: string;

  @prop({ default: null })
  birth_date: Date;
}
