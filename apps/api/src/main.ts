import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule, {
    logger: WinstonModule.createLogger(
      getWinstonLogger(process.env.NODE_ENV, 'api'),
    ),
  });

  const config = new DocumentBuilder()
    .setTitle('Api Document')
    .setDescription('The Mono Repo API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
