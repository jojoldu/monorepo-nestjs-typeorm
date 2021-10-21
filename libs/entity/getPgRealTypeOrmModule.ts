import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export function getPgRealTypeOrmModule() {
  const entityPath = path.join(__dirname, 'src/domain/**/*.entity.ts');
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [entityPath],
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
