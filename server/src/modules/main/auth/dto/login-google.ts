import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginWithGoogleDto {
  @ApiProperty()
  @IsString()
  token: string;
}
