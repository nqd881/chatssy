import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordForgotDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
