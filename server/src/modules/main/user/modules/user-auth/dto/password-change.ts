import { ApiProperty } from '@nestjs/swagger';
import { TfaDto } from '@types';
import { IsString } from 'class-validator';
import { IsMatch } from 'src/decorators/validator/is-match.decorator';
import { Password } from 'src/decorators/validator/password';

export class PasswordChangeDto extends TfaDto {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @Password()
  @IsString()
  new_password: string;

  @ApiProperty()
  @IsMatch('new_password')
  confirm_new_password: string;
}
