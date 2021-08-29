import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
