import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';
import { Password } from 'src/decorators/validator/password';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @Password()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
