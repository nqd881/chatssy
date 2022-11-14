import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum TfaCodeTypes {
  VERIFICATION_CODE = 'verification_code',
  TOTP = 'totp',
  BACKUP_CODE = 'backup_code',
}

export class TfaCode {
  @ApiProperty({ enum: Object.values(TfaCodeTypes) })
  @IsEnum(TfaCodeTypes)
  @IsString()
  type: TfaCodeTypes;

  @ApiProperty()
  @IsString()
  value: string;
}

export type SendVerificationCodeParams = {
  email: string;
};
