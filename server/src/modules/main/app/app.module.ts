import { InjectRedis, RedisCacheModule } from '@modules/extra/redis_cache';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import RedisStore from 'connect-redis';
import session from 'express-session';
import * as IORedis from 'ioredis';
import ms from 'ms';
import { Env } from 'src/env/types';
import { validate } from 'src/env/validations';
import { getEnvFilePath, isInDev, isInProd } from 'src/utils/env.utils';
import { AuthModule } from '../auth';
import { ChatModule } from '../chat';
import { UserModule } from '../user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const modulesImported = [
  ConfigModule.forRoot({
    envFilePath: isInDev() ? getEnvFilePath() : undefined,
    isGlobal: true,
    validate,
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get(Env.MONGO_URI),
    }),
  }),
  RedisCacheModule,
  AuthModule,
  UserModule,
  ChatModule,
];

@Module({
  imports: modulesImported,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  @InjectRedis
  redis: IORedis.Redis;

  @Inject()
  envConfig: ConfigService;

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          secret: this.envConfig.get(Env.COOKIE_SECRET),
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: isInProd() ? true : false,
            maxAge: ms('30days'),
          },
        }),
      )
      .forRoutes('*');
  }
}
