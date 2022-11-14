import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';

export class ApiQueryVerifyEmail {
  @ApiProperty()
  user_id: string;

  @ApiQueryProperty()
  token: string;
}

export class ApiPayloadVerifyEmail {
  @ApiProperty()
  @IsString()
  code: string;
}
