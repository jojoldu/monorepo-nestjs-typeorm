import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './ApiAppModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule, {
    logger: WinstonModule.createLogger(
      getWinstonLogger(process.env.NODE_ENV, 'api'),
    ),
  });
  await app.listen(3000);
}
bootstrap();
