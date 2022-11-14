import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export type DetectIDFn = (req: Request) => string;

export const RESOURCE_OWNER_ID = 'resource_owner_id';

export const ResourceOwnerID = (detectFn: DetectIDFn) =>
  SetMetadata(RESOURCE_OWNER_ID, detectFn);
