import { ApiProperty } from '@nestjs/swagger';

export class UserIdentificationParam {
  @ApiProperty()
  user_id: string;
}
