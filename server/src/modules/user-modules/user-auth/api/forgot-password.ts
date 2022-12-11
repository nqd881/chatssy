import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ApiPayloadForgotPassword {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;
}
