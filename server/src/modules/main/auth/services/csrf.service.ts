import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CSRFToken from 'csrf';
import { Env } from 'src/env/types';

@Injectable()
export class CsrfService {
  private tokens = new CSRFToken();

  constructor(private envConfig: ConfigService) {}

  getSecret() {
    return this.envConfig.get(Env.CSRF_TOKEN_SECRET);
  }

  create() {
    return this.tokens.create(this.getSecret());
  }

  verify(token: string) {
    return this.tokens.verify(this.getSecret(), token);
  }
}
