import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserAuth {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password: string;
}
