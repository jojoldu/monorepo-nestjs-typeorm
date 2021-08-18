import { User } from '@app/entity/user/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [UserEntityRepository],
  controllers: [],
})
export class UserModule {}
