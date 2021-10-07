import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export function getPgTestTypeOrmModule() {
  const logging = process.env.LOGGING;
  console.log(`logging=${logging}`);
  console.log(`env=${JSON.stringify(process.env)}`);

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [path.join(__dirname, '../src/domain/**/*.entity.ts')],
    synchronize: true,
    logging: logging === undefined ? true : Boolean(logging),
    namingStrategy: new SnakeNamingStrategy(),
  });
}
