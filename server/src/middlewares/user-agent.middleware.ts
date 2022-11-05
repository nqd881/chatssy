import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import uaParser from 'ua-parser-js';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.useragent = uaParser(req.headers['user-agent']);

    next();
  }
}
