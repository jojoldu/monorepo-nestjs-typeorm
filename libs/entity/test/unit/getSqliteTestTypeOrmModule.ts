import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entity/user/User.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getSqliteTestTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
