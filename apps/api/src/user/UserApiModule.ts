import { Module } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';
import { UserApiController } from './UserApiController';
import { UserApiService } from './UserApiService';
import { EntityService } from '@app/entity';
import { UserModule } from '@app/entity/user/UserModule';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService, EntityService, UserEntityRepository],
})
export class UserApiModule {}
