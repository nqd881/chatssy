import { Injectable } from '@nestjs/common';
import { UpdateQuery } from 'mongoose';
import ms from 'ms';
import { InjectModel } from 'nestgoose';
import randomstring from 'randomstring';
import {
  TfaVerificationCode,
  TfaVerificationCodeDoc,
  TfaVerificationCodeModel,
  TfaVerificationCodeState,
} from '../models/tfa-verification-code.model';

@Injectable()
export class TfaVerificationCodeService {
  constructor(
    @InjectModel(TfaVerificationCode) private model: TfaVerificationCodeModel,
  ) {}

  private _lockCurrentCodeQuery: UpdateQuery<TfaVerificationCodeDoc> = {
    is_current: false,
    state: TfaVerificationCodeState.Locked,
  };
  private _verifyCurrentCodeQuery: UpdateQuery<TfaVerificationCodeDoc> = {
    is_current: false,
    state: TfaVerificationCodeState.Verified,
  };

  private findCurrentCode(userId: string) {
    return this.model.findOne({
      user_id: userId,
      is_current: true,
    });
  }

  private updateCurrentCode(
    userId: string,
    updateQuery: UpdateQuery<TfaVerificationCodeDoc>,
  ) {
    return this.findCurrentCode(userId).updateOne(updateQuery);
  }

  private lockCurrentCode(userId: string) {
    return this.updateCurrentCode(userId, this._lockCurrentCodeQuery);
  }

  private create(userId: string) {
    return this.model.create({
      user_id: userId,
      value: randomstring.generate(6),
      limit_attempts: 5,
      expired_at: Date.now() + ms('2m'),
    });
  }

  async get(userId: string) {
    await this.lockCurrentCode(userId);
    return this.create(userId);
  }

  async verify(userId: string, value: string) {
    const code = await this.findCurrentCode(userId);

    if (!code) return false;

    if (!code.canBeVerified()) {
      this.lockCurrentCode(userId).exec();
      return false;
    }

    const checkResult = code.checkValue(value);

    code.attempted_count++;

    if (checkResult) {
      code.set(this._verifyCurrentCodeQuery);
    }

    if (code.isUnverified() && code.isLimited()) {
      code.set(this._lockCurrentCodeQuery);
    }

    code.save();

    return checkResult;
  }
}
