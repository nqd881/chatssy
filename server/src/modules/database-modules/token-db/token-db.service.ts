import {
  DbToken,
  DbTokenDoc,
  DbTokenModel,
  DbTokenStatus,
} from '@dbmodels/token.model';
import { Injectable } from '@nestjs/common';
import { flattenToDotObject, parseTimeMs } from '@utils';
import { InjectModel } from 'nestgoose';
import { CreateTokenArgs } from './types/create';
import crypto from 'crypto';
import { UpdateTokenQuery } from './types/update';

@Injectable()
export class TokenDbService {
  constructor(@InjectModel(DbToken) private tokenDbModel: DbTokenModel) {}

  new(args: CreateTokenArgs) {
    const { name, time } = args;
    const msTime = parseTimeMs(time);
    const code = crypto.randomBytes(128).toString('hex');

    return new this.tokenDbModel({
      name,
      code,
      time: msTime / 1000,
      expiredAt: Date.now() + msTime,
      status: DbTokenStatus.UNLOCKED,
    });
  }

  create(args: CreateTokenArgs) {
    return this.new(args).save();
  }

  async update(tokenId: string, query: UpdateTokenQuery) {
    const updateQuery = flattenToDotObject(query);

    return this.tokenDbModel.findByIdAndUpdate(tokenId, updateQuery, {
      new: true,
    });
  }

  findById(tokenId: string) {
    return this.tokenDbModel.findById(tokenId);
  }

  findUnlockedById(tokenId: string) {
    return this.tokenDbModel.findOne({
      _id: tokenId,
      status: DbTokenStatus.UNLOCKED,
    });
  }

  lock(tokenId: string) {
    return this.update(tokenId, { status: DbTokenStatus.LOCKED });
  }

  isExpired(token: DbTokenDoc) {
    const now = Date.now();
    return now > token.expiredAt;
  }

  async verify(tokenId: string, code: string): Promise<VerifyTokenResult> {
    const token = await this.tokenDbModel.findById(tokenId);

    if (!token) return VerifyTokenResult.NOT_FOUND;

    if (token.status === DbTokenStatus.LOCKED) return VerifyTokenResult.LOCKED;

    if (code !== token.code) return VerifyTokenResult.WRONG_CODE;

    this.lock(token.id);

    if (this.isExpired(token)) return VerifyTokenResult.EXPIRED;

    return VerifyTokenResult.VALID;
  }
}

export enum VerifyTokenResult {
  NOT_FOUND = 'not-found',
  LOCKED = 'locked',
  EXPIRED = 'expired',
  VALID = 'valid',
  WRONG_CODE = 'wrong-code',
}
