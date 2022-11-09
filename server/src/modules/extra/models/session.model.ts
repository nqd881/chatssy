import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { User } from './user/user.model';
import { applyDefault } from './utils';

export enum SessionStates {
  Cached = 'cached',
  Expired = 'expired',
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class SessionDevice {
  @prop({ default: null })
  model: string;

  @prop({ default: null })
  type: string;

  @prop({ default: null })
  vendor: string;
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class SessionOS {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  version: string;
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class SessionBrowser {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  version: string;
}

@modelOptions({})
export class Session {
  @prop({ enum: SessionStates, default: SessionStates.Cached })
  state: SessionStates;

  @prop({ ref: () => User, required: true })
  user_id: Ref<User>;

  @prop({ default: applyDefault })
  device: SessionDevice;

  @prop({ default: applyDefault })
  os: SessionOS;

  @prop({ default: applyDefault })
  browser: SessionBrowser;

  @prop({ required: true })
  log_in_date: number;

  @prop({ required: true })
  expiration_date: number;

  @prop({ default: null })
  ip: string;
}

export type SessionDoc = DocumentType<Session>;
export type SessionModel = ReturnModelType<typeof Session>;
