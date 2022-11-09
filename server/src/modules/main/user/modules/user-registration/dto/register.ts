import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Password } from 'src/decorators/validator/password';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

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

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  birth_date: Date;
}
