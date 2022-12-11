import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ApiPayloadLogin {
  @ApiProperty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}
