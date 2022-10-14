import { Token } from '@modules/extra/models/token.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { TokenService } from './token.service';

@Module({
  imports: [NestgooseModule.forFeature([Token])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
