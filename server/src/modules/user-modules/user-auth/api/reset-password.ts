import { ApiProperty } from '@nestjs/swagger';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class ApiPayloadResetPassword {
  @ApiProperty()
  @Password()
  password: string;

  @ApiProperty()
  @IsMatch('password')
  confirmPassword: string;
}

export class ApiQueryResetPassword {
  @ApiQueryProperty()
  user_id: string;

  @ApiQueryProperty()
  token: string;
}
