import { Module } from '@nestjs/common';
import { UserTfaController } from './user-tfa.controller';
import { UserTfaService } from './user-tfa.service';

@Module({
  imports: [],
  controllers: [UserTfaController],
  providers: [UserTfaService],
  exports: [UserTfaService],
})
export class UserTfaModule {}
