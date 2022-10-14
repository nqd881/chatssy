import { EjsTemplateModule } from '@modules/main/ejs-template';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [EjsTemplateModule.resultModule(), ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
