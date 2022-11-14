import { DbToken } from 'src/db-models/token.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { TokenService } from './token.service';

@Module({
  imports: [NestgooseModule.forFeature([DbToken])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
