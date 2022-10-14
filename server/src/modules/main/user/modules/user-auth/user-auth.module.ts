import { EmailModule } from '@modules/extra/email';
import { User } from '@modules/extra/models/user/user.model';
import { TokenModule } from '@modules/main/token';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestgooseModule } from 'nestgoose';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [
    NestgooseModule.forFeature([User]),
    EmailModule,
    TokenModule,
    ConfigModule,
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
