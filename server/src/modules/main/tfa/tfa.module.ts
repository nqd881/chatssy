import { TfaVerificationCodeModule } from '@modules/extra/tfa-verification-code/tfa-verification-code.module';
import { Global, Module } from '@nestjs/common';
import { UserSearchingModule } from '../user/modules/user-searching/user-searching.module';
import { TfaController } from './tfa.controller';
import { TfaService } from './tfa.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [TfaVerificationCodeModule, UserSearchingModule, MailerModule],
  controllers: [TfaController],
  providers: [TfaService],
  exports: [TfaService],
})
export class TfaModule {}
