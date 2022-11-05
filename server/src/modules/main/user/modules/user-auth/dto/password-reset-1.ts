import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordReset1Dto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
