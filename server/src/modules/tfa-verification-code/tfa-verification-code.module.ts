import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { DbTfaVerificationCode } from '../../db-models/tfa-verification-code.model';
import { TfaVerificationCodeService } from './tfa-verification-code.service';

@Module({
  imports: [NestgooseModule.forFeature([DbTfaVerificationCode])],
  providers: [TfaVerificationCodeService],
  exports: [TfaVerificationCodeService],
})
export class TfaVerificationCodeModule {}
