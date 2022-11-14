import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { DbUser } from './user/user.model';

export enum DbTfaVerificationCodeState {
  Unverified = 'unverified',
  Verified = 'verified',
  Locked = 'locked',
}

@modelOptions({})
export class DbTfaVerificationCode {
  @prop({ ref: () => DbUser, required: true, index: true })
  userId: Ref<DbUser>;

  @prop({ default: true })
  isCurrent: boolean;

  @prop({ required: true })
  value: string;

  @prop({ default: 0 })
  attemptedCount: number;

  @prop({ required: true })
  limitAttempts: number;

  @prop({ required: true })
  expiredAt: number;

  @prop({
    enum: DbTfaVerificationCodeState,
    default: DbTfaVerificationCodeState.Unverified,
  })
  state: DbTfaVerificationCodeState;

  checkValue(this: DbTfaVerificationCodeDoc, value: string) {
    return this.value === value;
  }

  checkExpirationTime(time: number) {
    return time > this.expiredAt;
  }

  checkAttemptsCount(attempts: number) {
    return attempts === this.limitAttempts;
  }

  isExpired() {
    return this.checkExpirationTime(Date.now());
  }

  isLimited() {
    return this.checkAttemptsCount(this.attemptedCount);
  }

  isUnverified() {
    return this.state === DbTfaVerificationCodeState.Unverified;
  }

  canBeVerified(this: DbTfaVerificationCodeDoc) {
    return this.isUnverified() && !this.isExpired() && !this.isLimited();
  }
}

export type DbTfaVerificationCodeDoc = DocumentType<DbTfaVerificationCode>;
export type DbTfaVerificationCodeModel = ReturnModelType<
  typeof DbTfaVerificationCode
>;
