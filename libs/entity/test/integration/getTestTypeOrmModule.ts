import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entity/user/User.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getTestTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [User],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
