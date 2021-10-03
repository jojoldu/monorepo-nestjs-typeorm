import { Module } from '@nestjs/common';
import { UserApiController } from './UserApiController';
import { UserApiService } from './UserApiService';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { GroupModule } from '@app/entity/domain/group/GroupModule';

@Module({
  imports: [UserModule, GroupModule],
  controllers: [UserApiController],
  providers: [UserApiService],
})
export class UserApiModule {}
