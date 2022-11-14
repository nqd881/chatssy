import { DbUserAuth } from 'src/db-models/user/user-auth.model';
import { TfaVerificationCodeModule } from '@modules/tfa-verification-code/tfa-verification-code.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { TfaController } from './tfa.controller';
import { TfaService } from './tfa.service';

@Global()
@Module({
  imports: [
    NestgooseModule.forFeature([DbUserAuth]),
    TfaVerificationCodeModule,
    MailerModule,
  ],
  controllers: [TfaController],
  providers: [TfaService],
  exports: [TfaService],
})
export class TfaModule {}
