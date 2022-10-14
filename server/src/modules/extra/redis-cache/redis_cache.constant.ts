import { Inject } from '@nestjs/common';

export const REDIS = Symbol('AUTH:REDIS');

export const InjectRedis = Inject(REDIS);
