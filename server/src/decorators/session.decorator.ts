import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Session = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const session = request.session;

    return data ? session?.[data] : session;
  },
);
