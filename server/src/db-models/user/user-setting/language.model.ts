import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbUserSettingLanguage {
  @prop({ default: 'en' })
  baseLanguage: string;
}
