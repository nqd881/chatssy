import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  DetectIDFn,
  RESOURCE_OWNER_ID,
} from 'src/decorators/resource-owner-id.decorator';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private getDetectIDFunction(target: any) {
    return this.reflector.get<DetectIDFn>(RESOURCE_OWNER_ID, target);
  }

  private callDetectIDFunction(detectIdFn: DetectIDFn, request: Request) {
    if (typeof detectIdFn !== 'function') return null;
    return detectIdFn(request);
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const userSessionID = request.session.user.id;

    if (!userSessionID) return false;

    const detectIdFunctionOnHandler = this.getDetectIDFunction(
      context.getHandler(),
    );
    const detectIdFunctionOnClass = this.getDetectIDFunction(
      context.getClass(),
    );

    const resourceOwnerID =
      this.callDetectIDFunction(detectIdFunctionOnHandler, request) ||
      this.callDetectIDFunction(detectIdFunctionOnClass, request) ||
      null;

    return resourceOwnerID === userSessionID;
  }
}
