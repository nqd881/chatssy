import { IsEmail, IsString } from 'class-validator';

export class SendCodeDto {
  @IsEmail()
  @IsString()
  email: string;
}
