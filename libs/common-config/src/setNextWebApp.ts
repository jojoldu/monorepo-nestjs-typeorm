import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
