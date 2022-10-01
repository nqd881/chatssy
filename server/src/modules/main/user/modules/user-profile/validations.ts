import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';

export class UpdateUserProfilePayload {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsDate()
  birth_date: Date;
}

export class UpdateUserProfileReqBody extends ChatssyReqBody<UpdateUserProfilePayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateUserProfilePayload)
  payload: UpdateUserProfilePayload;
}
