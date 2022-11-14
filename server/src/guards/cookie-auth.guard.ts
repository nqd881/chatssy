import { SessionService } from '@modules/session';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

// Check user was logined and check CSRF token
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
      request.session.lastActiveDate = Date.now();
    }

    return tokenValid;
  }
}
