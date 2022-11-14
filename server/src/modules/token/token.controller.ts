import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';

export type NewTokenPayload = {
  channel: 'email' | 'sms';
  to: string;
};

@Controller('verification_token')
export class TokenController {
  constructor(public service: TokenService) {}
}
