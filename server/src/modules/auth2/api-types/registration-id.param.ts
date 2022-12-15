import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiParamRegistrationId {
  @ApiProperty()
  @Expose()
  registration_id: string;
}
