import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getSqliteTestTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
