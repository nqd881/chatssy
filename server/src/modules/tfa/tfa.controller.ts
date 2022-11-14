import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { SendCodeDto } from './api/send-code.dto';

import { TfaService } from './tfa.service';

@ApiTags(ChatssyApiTags.Tfa)
@Controller('tfa')
export class TfaController {
  constructor(private service: TfaService) {}

  @Post('verification_code')
  sendCode(@Body() dto: SendCodeDto) {
    this.service.sendEmailCode(dto.email);
  }
}
