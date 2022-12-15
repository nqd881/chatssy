import { DbRegistration } from '@dbmodels/user2/registration.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { RegistrationDbService } from './registration-db.service';

@Module({
  imports: [NestgooseModule.forFeature([DbRegistration])],
  providers: [RegistrationDbService],
  exports: [RegistrationDbService],
})
export class RegistrationDbModule {}
