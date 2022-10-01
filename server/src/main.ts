import { AppModule } from '@modules/main/app/app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { autoDeclare } from './types/declare';

autoDeclare();

const globalPipes = [
  new ValidationPipe({
    transform: true,
  }),
];

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

  bootstrapSwagger(app);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(cookieParser());
  app.useGlobalPipes(...globalPipes);

  await app.listen(3000);
}
bootstrap();
