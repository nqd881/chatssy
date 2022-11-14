import { TfaService } from '@modules/tfa/tfa.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TfaDto } from '@types';
import { Request } from 'express';

// Check tfa code is valid
@Injectable()
export class TfaGuard implements CanActivate {
  constructor(private tfaService: TfaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request<any, any, TfaDto>>();
    const { tfa_code } = request.body;
    const { id } = request.session.user;

    const codeValid = await this.tfaService.verifyCode(id, tfa_code);

    return codeValid;
  }
}
