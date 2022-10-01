import { VerificationToken } from '@schemas';
import { DatabaseModule } from '@modules/extra/database';
import { Module } from '@nestjs/common';
import { VerificationTokenService } from './verification_token.service';
import { CVTTokenMaker } from './token_maker.service';

@Module({
  imports: [...DatabaseModule.use(VerificationToken)],
  providers: [
    VerificationTokenService,
    {
      provide: 'CVT_TOKEN_MAKER',
      useClass: CVTTokenMaker,
    },
  ],
  exports: [VerificationTokenService],
})
export class VerificationTokenModule {}
