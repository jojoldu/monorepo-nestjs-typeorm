import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule);
  await app.listen(3000);
}
bootstrap();
