import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Password } from 'src/decorators/validator/password';

export class ApiPayloadRegisterWithEmail {
  @ApiProperty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  lastName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty()
  @Password()
  @IsString()
  @Expose()
  password: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  @Expose()
  birthDate: Date;
}
