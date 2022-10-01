import mongoose, { Document } from 'mongoose';

export type PartialDocument = {
  [key: string]: any;
};

export type ModelName = string | Function;

export type GetDocumentType<DocType, T = any, TQueryHelpers = any> = Document<
  T,
  TQueryHelpers,
  DocType
> &
  DocType & { _id: mongoose.Types.ObjectId };

export type PickSchema<
  Model,
  RequiredProps extends keyof Omit<Model, PartialProps>,
  PartialProps extends keyof Omit<Model, RequiredProps>,
> = Required<Pick<Model, RequiredProps>> & Partial<Pick<Model, PartialProps>>;
