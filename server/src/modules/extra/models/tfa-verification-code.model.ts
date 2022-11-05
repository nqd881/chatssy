import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { User } from './user/user.model';

export enum TfaVerificationCodeState {
  Unverified = 'unverified',
  Verified = 'verified',
  Locked = 'locked',
}

@modelOptions({})
export class TfaVerificationCode {
  @prop({ ref: () => User, required: true, index: true })
  user_id: Ref<User>;

  @prop({ default: true })
  is_current: boolean;

  @prop({ required: true })
  value: string;

  @prop({ default: 0 })
  attempted_count: number;

  @prop({ required: true })
  limit_attempts: number;

  @prop({ required: true })
  expired_at: number;

  @prop({
    enum: TfaVerificationCodeState,
    default: TfaVerificationCodeState.Unverified,
  })
  state: TfaVerificationCodeState;

  checkValue(this: TfaVerificationCodeDoc, value: string) {
    return this.value === value;
  }

  checkExpirationTime(time: number) {
    return time > this.expired_at;
  }

  checkAttemptsCount(attempts: number) {
    return attempts === this.limit_attempts;
  }

  isExpired() {
    return this.checkExpirationTime(Date.now());
  }

  isLimited() {
    return this.checkAttemptsCount(this.attempted_count);
  }

  isUnverified() {
    return this.state === TfaVerificationCodeState.Unverified;
  }

  canBeVerified(this: TfaVerificationCodeDoc) {
    return this.isUnverified() && !this.isExpired() && !this.isLimited();
  }
}

export type TfaVerificationCodeDoc = DocumentType<TfaVerificationCode>;
export type TfaVerificationCodeModel = ReturnModelType<
  typeof TfaVerificationCode
>;
