import { User } from '@app/entity/user/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';
import { UserQueryRepository } from '@app/entity/user/UserQueryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserQueryRepository])],
  exports: [TypeOrmModule],
  providers: [UserEntityRepository],
  controllers: [],
})
export class UserModule {}
