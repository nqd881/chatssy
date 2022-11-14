import { ApiProperty } from '@nestjs/swagger';

export class UserParam {
  @ApiProperty()
  user_id: string;
}
