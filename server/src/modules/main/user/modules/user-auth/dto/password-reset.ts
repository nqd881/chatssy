import { ApiProperty } from '@nestjs/swagger';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class PasswordResetDto {
  @ApiProperty()
  @Password()
  password: string;

  @ApiProperty()
  @IsMatch('password')
  confirm_password: string;
}

export class PasswordResetQuery {
  @ApiQueryProperty()
  user_id: string;

  @ApiQueryProperty()
  token: string;
}
