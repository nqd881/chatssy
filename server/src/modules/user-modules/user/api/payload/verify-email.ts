import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';

export class ApiQueryVerifyEmail {
  @ApiProperty()
  @Expose()
  user_id: string;

  @ApiQueryProperty()
  @Expose()
  token: string;
}

export class ApiPayloadVerifyEmail {
  @ApiProperty()
  @IsString()
  @Expose()
  code: string;
}
