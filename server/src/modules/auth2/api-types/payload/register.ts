import { DbGenders } from '@dbmodels/user2/user.model';
import { Password } from '@decorators/validator/password';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class ApiPayloadUserAddress {
  @ApiProperty()
  @IsString()
  @Expose()
  countryCode: string;

  @ApiProperty()
  @IsString()
  @Expose()
  state: string;

  @ApiProperty()
  @IsString()
  @Expose()
  city: string;

  @ApiProperty()
  @IsString()
  @Expose()
  streetLine1: string;

  @ApiProperty()
  @IsString()
  @Expose()
  streetLine2: string;

  @ApiProperty()
  @IsString()
  @Expose()
  postalCode: string;
}

export class ApiPayloadRegisterUserAccount {
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
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @Expose()
  phone: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  @Expose()
  birthDate: Date;

  @ApiPropertyOptional()
  @IsEnum(DbGenders)
  @IsOptional()
  @Expose()
  gender?: DbGenders;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => ApiPayloadUserAddress)
  @IsOptional()
  @Expose()
  address?: ApiPayloadUserAddress;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  @Expose()
  redirectUrlOnSuccess?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  @Expose()
  redirectUrlOnFailure?: string;
}
