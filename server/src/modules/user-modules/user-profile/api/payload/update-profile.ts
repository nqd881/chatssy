import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { IsType } from 'src/decorators/validator/is-type.decorator';

export class ApiPayloadUpdateUserProfileAddress {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  countryCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  state?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  streetLine1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  streetLine2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  postalCode?: string;
}

export class ApiPayloadUpdateUserProfile {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  lastName?: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Expose()
  birthDate?: Date;

  @ApiPropertyOptional()
  @IsType(ApiPayloadUpdateUserProfileAddress)
  @IsOptional()
  @Expose()
  address?: ApiPayloadUpdateUserProfileAddress;
}
