import { UserParam } from '@modules/main/user/types/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';

export class VerifyEmailQuery extends UserParam {
  @ApiQueryProperty()
  token: string;
}

export class VerifyEmailDto {
  @ApiProperty()
  @IsString()
  code: string;
}
