import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';

export class ApiQueryActivateUserAccount {
  @ApiProperty()
  @IsString()
  @Expose()
  code: string;

  @ApiProperty()
  @IsUrl()
  @Expose()
  redirect_url_success?: string;

  @ApiProperty()
  @IsUrl()
  @Expose()
  redirect_url_failure?: string;
}
