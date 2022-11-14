import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { IsType } from 'src/decorators/validator/is-type.decorator';

export class ApiPayloadUpdateUserProfileAddress {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  countryCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  streetLine1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  streetLine2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  postalCode?: string;
}

export class ApiPayloadUpdateUserProfile {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiPropertyOptional()
  @IsType(ApiPayloadUpdateUserProfileAddress)
  @IsOptional()
  address?: ApiPayloadUpdateUserProfileAddress;
}
