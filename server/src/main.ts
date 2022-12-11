import { LoggingInterceptor } from '@interceptors/logging.interceptor';
import { AppModule } from '@modules/app/app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { autoDeclare } from './types/declare';

autoDeclare();

const globalPipes = [
  new ValidationPipe({
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
    },
  }),
];

const globalInterceptors = [new LoggingInterceptor()];

function bootstrapSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Chatssy Apis')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  bootstrapSwagger(app);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });

  app.use(cookieParser());
  app.useGlobalPipes(...globalPipes);
  app.useGlobalInterceptors(...globalInterceptors);

  await app.listen(3000);
}
bootstrap();
