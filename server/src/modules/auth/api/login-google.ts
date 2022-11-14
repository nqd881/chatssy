import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApiPayloadLoginWithGoogle {
  @ApiProperty()
  @IsString()
  token: string;
}
