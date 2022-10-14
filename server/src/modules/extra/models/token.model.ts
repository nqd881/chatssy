import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class Token {
  @prop({ required: true })
  code: string;

  @prop({ required: true })
  expired_at: number;

  isValid(this: TokenDoc) {
    const now = Date.now();
    return now <= this.expired_at;
  }
}

export type TokenDoc = DocumentType<Token>;
export type TokenModel = ReturnModelType<typeof Token>;
