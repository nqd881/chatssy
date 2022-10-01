import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum TfaCodeTypes {
  VERIFICATION_CODE = 'verification_code',
  TOTP = 'totp',
  BACKUP_CODE = 'backup_code',
}

export type TfaCode = string;

export class TfaPayload {
  @ApiProperty({ enum: Object.values(TfaCodeTypes) })
  @IsEnum(TfaCodeTypes)
  @IsString()
  type: TfaCodeTypes;

  @ApiProperty()
  @IsString()
  code: TfaCode;
}
