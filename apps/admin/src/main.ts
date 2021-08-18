import { NestFactory } from '@nestjs/core';
import { AdminAppModule } from './AdminAppModule';

async function bootstrap() {
  const app = await NestFactory.create(AdminAppModule);
  await app.listen(4000);
}
bootstrap();
