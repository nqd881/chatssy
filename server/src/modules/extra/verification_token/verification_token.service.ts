import { VerificationToken, VerificationTokenModel } from '@schemas';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import crypto from 'crypto';
import ms from 'ms';
import { CVTConstructor, CVTCreator, CVTPair, CVTVerifier } from './types';
import { ConfigService } from '@nestjs/config';
import { CVTTokenMaker } from './token_maker.service';

@Injectable()
export class VerificationTokenService {
  @Inject()
  envConfig: ConfigService;

  @InjectModel(VerificationToken.name)
  myModel: VerificationTokenModel;

  @Inject('CVT_TOKEN_MAKER')
  tokenMaker: CVTTokenMaker;

  private timeParser(time: string | number) {
    if (typeof time === 'string') return ms(time);
    return time;
  }

  private hashToken(userId: string, value: string) {
    const data = `${userId}__${value}`;
    const hmacSecret = this.envConfig.get('TOKEN_SECRET');
    const hmac = crypto.createHmac('sha256', hmacSecret);
    hmac.update(data);
    return hmac.digest().toString('hex');
  }

  private findTokenByValue(value: string) {
    return this.myModel.findOne({ value });
  }

  private async _create(
    userId: string,
    type: string,
    makeToken: () => string,
    time: string | number,
  ) {
    const tokenValue = makeToken();

    await this.myModel.create({
      user_id: userId,
      type,
      value: this.hashToken(userId, tokenValue),
      expired_at: new Date(Date.now() + this.timeParser(time)),
    });

    return tokenValue;
  }

  private async _verify(userId: string, type: string, tokenValue: string) {
    const valueHashed = this.hashToken(userId, tokenValue);
    const token = await this.findTokenByValue(valueHashed);

    if (!token) return null;
    if (Date.now() > token.expired_at.getTime()) {
      token.delete().exec();
      return null;
    }

    this.deleteAllOfType(token.user_id.toString(), type);
    return token;
  }

  private deleteOne(type: string, tokenValue: string) {
    return this.myModel
      .deleteOne({
        type,
        value: tokenValue,
      })
      .exec();
  }

  private deleteAllOfType(userId: string, type: string) {
    return this.myModel
      .deleteMany({
        user_id: userId,
        type,
      })
      .exec();
  }

  buildCreator(tokenClass: CVTConstructor): CVTCreator {
    const instance = new tokenClass();
    const { type, makeToken, time } = instance;

    return (userId: string) =>
      this._create(
        userId,
        type,
        makeToken.bind(instance, this.tokenMaker),
        time,
      );
  }

  buildVerifier(tokenClass: CVTConstructor): CVTVerifier {
    const { type } = new tokenClass();
    return (userId: string, tokenValue: string) =>
      this._verify(userId, type, tokenValue);
  }

  generate(tokenClass: CVTConstructor): CVTPair {
    const creator = this.buildCreator(tokenClass);
    const verifier = this.buildVerifier(tokenClass);

    return {
      create: creator,
      verify: verifier,
    };
  }
}
