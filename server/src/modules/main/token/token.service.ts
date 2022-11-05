import { Token, TokenModel } from '@modules/extra/models/token.model';
import { Injectable } from '@nestjs/common';
import { parseTimeMs } from '@utils';
import crypto from 'crypto';
import { InjectModel } from 'nestgoose';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token) private tokenModel: TokenModel) {}

  findToken(code: string) {
    return this.tokenModel.findOne({ code });
  }

  create(time: string | number) {
    const code = crypto.randomBytes(64).toString('hex');

    return this.tokenModel.create({
      code,
      expired_at: Date.now() + parseTimeMs(time),
    });
  }

  async verify(code: string) {
    const token = await this.findToken(code);
    if (!token) return false;

    const valid = token.isValid();
    if (valid) token.delete();

    return valid;
  }
}
