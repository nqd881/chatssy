import { ApiProperty } from '@nestjs/swagger';
import { ApiPayloadTfa } from '@types';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class ApiPayloadChangePassword extends ApiPayloadTfa {
  @ApiProperty()
  @IsString()
  @Expose()
  password: string;

  @ApiProperty()
  @Password()
  @IsString()
  @Expose()
  newPassword: string;

  @ApiProperty()
  @IsMatch('new_password')
  @Expose()
  confirmNewPassword: string;
}
