import { Module } from '@nestjs/common';
import { UserApiController } from './UserApiController';
import { UserApiService } from './UserApiService';
import { UserModule } from '@app/entity/domain/user/UserModule';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService],
})
export class UserApiModule {}
