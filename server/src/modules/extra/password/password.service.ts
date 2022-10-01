import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Env } from 'src/env/types';

@Injectable()
export class PasswordService {
  @Inject()
  envConfig: ConfigService;

  async hash(plainTextPassword: string | null) {
    if (!plainTextPassword) return null;

    const saltRounds = Number(this.envConfig.get(Env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hash(plainTextPassword, saltRounds);
  }

  async compare(hashedPassword: string, plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
