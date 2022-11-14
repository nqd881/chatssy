import { DbSession } from 'src/db-models/session.model';
import { Global, Module } from '@nestjs/common';
import CSRFTokenTools from 'csrf';
import { NestgooseModule } from 'nestgoose';
import { CSRF_TOKEN_TOOLS } from './constant';
import { SessionService } from './session.service';

@Global()
@Module({
  imports: [NestgooseModule.forFeature([DbSession])],
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
