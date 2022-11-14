import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class DbAddress {
  @prop({ default: null })
  countryCode: string;

  @prop({ default: null })
  state: string;

  @prop({ default: null })
  city: string;

  @prop({ default: null })
  streetLine1: string;

  @prop({ default: null })
  streetLine2: string;

  @prop({ default: null })
  postalCode: string;
}

export type DbAddressDoc = DocumentType<DbAddress>;
export type DbAddressModel = ReturnModelType<typeof DbAddress>;
