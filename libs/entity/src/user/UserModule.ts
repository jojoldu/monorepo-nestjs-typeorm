import { User } from '@app/entity/user/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';
import { UserCoreRepository } from '@app/entity/user/UserCoreRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [UserEntityRepository, UserCoreRepository],
  controllers: [],
})
export class UserModule {}
