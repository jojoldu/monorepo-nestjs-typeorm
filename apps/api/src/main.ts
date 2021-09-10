import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';
import { createLogger } from '../../../libs/logger/src/createLogger';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule, {
    logger: createLogger(process.env.NODE_ENV),
  });
  await app.listen(3000);
}
bootstrap();
