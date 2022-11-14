import { ApiProperty } from '@nestjs/swagger';
import { ApiPayloadTfa } from '@types';
import { IsString } from 'class-validator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class ApiPayloadChangePassword extends ApiPayloadTfa {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @Password()
  @IsString()
  newPassword: string;

  @ApiProperty()
  @IsMatch('new_password')
  confirmNewPassword: string;
}
