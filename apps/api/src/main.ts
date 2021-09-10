import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule, {
    logger: ['error', 'log', 'debug'],
  });
  await app.listen(3000);
}
bootstrap();
