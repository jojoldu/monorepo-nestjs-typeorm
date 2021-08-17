import { User } from '@app/entity/user/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from '@app/entity/user/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  controllers: [],
})
export class UsersModule {}
