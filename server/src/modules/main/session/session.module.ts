import { Session } from '@modules/extra/models/session.model';
import { UserSearchingModule } from '@modules/main/user/modules/user-searching/user-searching.module';
import { Global, Module } from '@nestjs/common';
import CSRFTokenTools from 'csrf';
import { NestgooseModule } from 'nestgoose';
import { CSRF_TOKEN_TOOLS } from './constant';
import { SessionService } from './session.service';

@Global()
@Module({
  imports: [NestgooseModule.forFeature([Session]), UserSearchingModule],
  providers: [
    SessionService,
    {
      provide: CSRF_TOKEN_TOOLS,
      useValue: new CSRFTokenTools(),
    },
  ],
  exports: [SessionService],
})
export class SessionModule {}
