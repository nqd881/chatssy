import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserEmail {
  @prop({ default: null })
  address: string;

  @prop({ default: false })
  is_verified: boolean;
}
