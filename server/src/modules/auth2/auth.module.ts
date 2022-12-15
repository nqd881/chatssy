import { RegistrationDbModule } from '@modules/database-modules/registration-db/registration-db.module';
import { TokenDbModule } from '@modules/database-modules/token-db/token-db.module';
import { UserAccountDbModule } from '@modules/database-modules/user-account-db/user-account-db.module';
import { UserDbModule } from '@modules/database-modules/user-db/user-db.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import {
  AuthLoginController,
  AuthRegistrationController,
} from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserDbModule,
    UserAccountDbModule,
    RegistrationDbModule,
    TokenDbModule,
    MailerModule,
  ],
  controllers: [AuthRegistrationController, AuthLoginController],
  providers: [AuthService],
  exports: [AuthService],
})
export class Auth2Module {}
