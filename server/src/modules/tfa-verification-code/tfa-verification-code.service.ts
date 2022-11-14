import { Injectable } from '@nestjs/common';
import { UpdateQuery } from 'mongoose';
import ms from 'ms';
import { InjectModel } from 'nestgoose';
import randomstring from 'randomstring';
import {
  DbTfaVerificationCode,
  DbTfaVerificationCodeDoc,
  DbTfaVerificationCodeModel,
  DbTfaVerificationCodeState,
} from '../../db-models/tfa-verification-code.model';

@Injectable()
export class TfaVerificationCodeService {
  constructor(
    @InjectModel(DbTfaVerificationCode)
    private model: DbTfaVerificationCodeModel,
  ) {}

  private _lockCurrentCodeQuery: UpdateQuery<DbTfaVerificationCodeDoc> = {
    isCurrent: false,
    state: DbTfaVerificationCodeState.Locked,
  };
  private _verifyCurrentCodeQuery: UpdateQuery<DbTfaVerificationCodeDoc> = {
    isCurrent: false,
    state: DbTfaVerificationCodeState.Verified,
  };

  private findCurrentCode(userId: string) {
    return this.model.findOne({
      userId: userId,
      isCurrent: true,
    });
  }

  private updateCurrentCode(
    userId: string,
    updateQuery: UpdateQuery<DbTfaVerificationCodeDoc>,
  ) {
    return this.findCurrentCode(userId).updateOne(updateQuery);
  }

  private lockCurrentCode(userId: string) {
    return this.updateCurrentCode(userId, this._lockCurrentCodeQuery);
  }

  private create(userId: string) {
    return this.model.create({
      userId,
      value: randomstring.generate(6),
      limitAttempts: 5,
      expiredAt: Date.now() + ms('2m'),
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

    code.attemptedCount++;

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
