import { Auth2Module } from '@modules/auth2/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath, isInDev, isInProd, parseTimeMs } from '@utils';
import { Cache } from 'cache-manager';
import RedisCacheStoreFactory from 'cache-manager-ioredis';
import RedisSessionStore from 'connect-redis';
import session from 'express-session';
import { NestgooseModule } from 'nestgoose';
import { Env } from 'src/env/types';
import { validate } from 'src/env/validations';
import { UserAgentMiddleware } from 'src/middlewares/user-agent.middleware';
import { v4 as uuidv4 } from 'uuid';
import { AuthModule } from '../auth';
import { ChatModule } from '../chat';
import { MessageModule } from '../message';
import { SessionModule } from '../session';
import { TfaModule } from '../tfa/tfa.module';
import { UserModule } from '../user-modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

type RedisCacheStore = ReturnType<typeof RedisCacheStoreFactory['create']>;

const modulesImported = [
  ConfigModule.forRoot({
    envFilePath: isInDev() ? getEnvFilePath() : undefined,
    isGlobal: true,
    validate,
  }),
  NestgooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get(Env.MONGO_URI),
    }),
  }),
  CacheModule.registerAsync({
    inject: [ConfigService],
    useFactory: (envConfig: ConfigService) => {
      return {
        store: RedisCacheStoreFactory,
        host: envConfig.get(Env.REDIS_HOST),
        port: envConfig.get(Env.REDIS_PORT),
      };
    },
  }),
  MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (envConfig: ConfigService) => {
      return {
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'OAuth2',
            user: envConfig.get(Env.GOOGLE_ADMIN_EMAIL_ADDRESS),
            clientId: envConfig.get(Env.GOOGLE_CLIENT_ID),
            clientSecret: envConfig.get(Env.GOOGLE_CLIENT_SECRET),
            refreshToken: envConfig.get(Env.GOOGLE_MAILER_REFRESH_TOKEN),
          },
        },
        defaults: {
          from: 'Chatssy',
        },
        template: {
          dir: `${process.cwd()}/src/templates/mail`,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
  }),
  // UserModule,
  // // AuthModule,
  // ChatModule,
  // TfaModule,
  // SessionModule,
  // MessageModule,
  Auth2Module,
];

@Module({
  imports: modulesImported,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private envConfig: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisSessionStore(session))({
            client: (this.cacheManager.store as RedisCacheStore).getClient(),
            logErrors: true,
          }),
          genid: () => uuidv4(),
          secret: this.envConfig.get(Env.SESSION_SECRET),
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: isInProd() ? true : false,
            maxAge: parseTimeMs(this.envConfig.get(Env.SESSION_MAX_AGE)),
          },
        }),
        UserAgentMiddleware,
      )
      .forRoutes('*');
  }
}
