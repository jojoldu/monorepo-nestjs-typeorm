import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Document')
    .setDescription('The Mono Repo API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
