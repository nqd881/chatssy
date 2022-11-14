import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ApiPayloadForgotPassword {
  @ApiProperty()
  @IsEmail()
  email: string;
}
