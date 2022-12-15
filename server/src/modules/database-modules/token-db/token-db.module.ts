import { DbToken } from '@dbmodels/token.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { TokenDbService } from './token-db.service';

@Module({
  imports: [NestgooseModule.forFeature([DbToken])],
  providers: [TokenDbService],
  exports: [TokenDbService],
})
export class TokenDbModule {}
