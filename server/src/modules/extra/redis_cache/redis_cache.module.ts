import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Env } from 'src/env/types';
import { REDIS } from './redis_cache.constant';

@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return new Redis({
          host: config.get(Env.REDIS_HOST),
          port: config.get(Env.REDIS_PORT),
        });
      },
    },
  ],
  exports: [REDIS],
})
export class RedisCacheModule {}
