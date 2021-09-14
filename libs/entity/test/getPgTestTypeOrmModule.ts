import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export function getPgTestTypeOrmModule() {
  const entityPath = path.join(__dirname, '../src/domain/**/*.entity.ts');
  console.log(`entityPath=${entityPath}`);
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [entityPath],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
