import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export function getPgRealTypeOrmModule() {
  console.log(`current_path=${__dirname}`);
  const entityPath = path.join(__dirname, 'src/domain/**/*.entity.ts');
  console.log(`entityPath=${entityPath}`);
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
