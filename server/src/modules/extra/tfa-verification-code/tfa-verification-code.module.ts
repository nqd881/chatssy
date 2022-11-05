import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { TfaVerificationCode } from '../models/tfa-verification-code.model';
import { TfaVerificationCodeService } from './tfa-verification-code.service';

@Module({
  imports: [NestgooseModule.forFeature([TfaVerificationCode])],
  providers: [TfaVerificationCodeService],
  exports: [TfaVerificationCodeService],
})
export class TfaVerificationCodeModule {}
