import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { EntityService } from '@app/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '@app/entity/user/User';
import { UsersModule } from '@app/entity/user/UsersModule';

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
    UsersModule,
  ],
  controllers: [ApiController],
  providers: [ApiService, EntityService],
})
export class ApiModule {}
