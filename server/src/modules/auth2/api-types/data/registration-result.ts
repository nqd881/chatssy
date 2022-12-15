import { ApiProperty } from '@nestjs/swagger';

export class ApiDataRegistrationResult {
  @ApiProperty()
  registrationId: string;
}
