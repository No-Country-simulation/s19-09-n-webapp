import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.app.defaultVer,
  });

  const config = new DocumentBuilder()
    .setTitle(`${envs.app.name}`)
    .setDescription(`The ${envs.app.name} API description`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(envs.app.port);
}
bootstrap();
