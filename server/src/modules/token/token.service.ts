import { DbToken, DbTokenModel } from 'src/db-models/token.model';
import { Injectable } from '@nestjs/common';
import { parseTimeMs } from '@utils';
import crypto from 'crypto';
import { InjectModel } from 'nestgoose';

@Injectable()
export class TokenService {
  constructor(@InjectModel(DbToken) private tokenModel: DbTokenModel) {}

  findToken(name: string, code: string) {
    return this.tokenModel.findOne({ name, code });
  }

  create(name: string, time: string | number) {
    const code = crypto.randomBytes(64).toString('hex');

    return this.tokenModel.create({
      name,
      code,
      expiredAt: Date.now() + parseTimeMs(time),
    });
  }

  async verify(name: string, code: string) {
    const token = await this.findToken(name, code);
    if (!token) return false;

    // const valid = token.isValid();
    const valid = false;
    if (valid) token.delete();

    return valid;
  }
}
