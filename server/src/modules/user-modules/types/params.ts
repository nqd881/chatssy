import { ApiProperty } from '@nestjs/swagger';

export class ApiParamUser {
  @ApiProperty()
  user_id: string;
}
