import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class ApiPayloadResetPassword {
  @ApiProperty()
  @Password()
  @Expose()
  password: string;

  @ApiProperty()
  @IsMatch('password')
  @Expose()
  confirmPassword: string;
}

export class ApiQueryResetPassword {
  @ApiQueryProperty()
  @Expose()
  user_id: string;

  @ApiQueryProperty()
  @Expose()
  token: string;
}
