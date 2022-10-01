import { Controller } from '@nestjs/common';
import { VerificationTokenService } from './verification_token.service';

export type NewTokenPayload = {
  channel: 'email' | 'sms';
  to: string;
};

@Controller('verification_token')
export class VerficationTokenController {
  constructor(public service: VerificationTokenService) {}
}
