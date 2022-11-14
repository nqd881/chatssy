import { TfaCode } from '@modules/tfa/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsType } from 'src/decorators/validator/is-type.decorator';

export class TfaDto {
  @ApiPropertyOptional()
  @IsType(TfaCode)
  @IsOptional()
  tfa_code?: TfaCode;
}

export class ApiPayloadTfa {
  @ApiPropertyOptional()
  @IsType(TfaCode)
  @IsOptional()
  tfaCode?: TfaCode;
}
