import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entity/domain/user/User.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserApiModule } from '../../api/src/user/UserApiModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserApiModule,
  ],
})
export class AdminAppModule {}
