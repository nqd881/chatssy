import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class LoginPayload {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginReqBody extends ChatssyReqBody<LoginPayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => LoginPayload)
  payload: LoginPayload;
}

export class LoginWithGooglePayload {
  @ApiProperty()
  @IsString()
  token: string;
}

export class LoginWithGoogleReqBody extends ChatssyReqBody<LoginWithGooglePayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => LoginWithGooglePayload)
  payload: LoginWithGooglePayload;
}
