import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class Address {
  @prop({ default: null })
  country_code: string;

  @prop({ default: null })
  state: string;

  @prop({ default: null })
  city: string;

  @prop({ defaut: null })
  street_line_1: string;

  @prop({ default: null })
  street_line_2: string;

  @prop({ default: null })
  postal_code: string;
}

export type AddressDoc = DocumentType<Address>;
export type AddressModel = ReturnModelType<typeof Address>;
