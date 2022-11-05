import { SessionService } from '@modules/main/session';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.session) return false;

    const token = request.header('X-CSRF-TOKEN');
    const tokenValid = this.sessionService.verifyCsrfToken(request, token);

    if (tokenValid) {
      request.session.visit++;
      request.session.last_active_date = Date.now();
    }

    return tokenValid;
  }
}
