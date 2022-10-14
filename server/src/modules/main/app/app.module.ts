import { InjectRedis, RedisCacheModule } from '@modules/extra/redis-cache';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import session from 'express-session';
import * as IORedis from 'ioredis';
import ms from 'ms';
import { NestgooseModule } from 'nestgoose';
import { Env } from 'src/env/types';
import { validate } from 'src/env/validations';
import { getEnvFilePath, isInDev, isInProd } from 'src/utils/env.utils';
import { AuthModule } from '../auth';
import { ChatModule } from '../chat';
import { UserModule } from '../user';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import useragent from 'express-useragent';

const modulesImported = [
  ConfigModule.forRoot({
    envFilePath: isInDev() ? getEnvFilePath() : undefined,
    isGlobal: true,
    validate,
  }),

  NestgooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get(Env.MONGO_URI),
    }),
  }),
  UserModule,
  RedisCacheModule,
  AuthModule,
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
        useragent.express(),
      )
      .forRoutes('*');
  }
}
