import { Module } from '@nestjs/common';
import { UserModule } from '@app/entity/user/UserModule';
import { UserAdminController } from './UserAdminController';
import { UserAdminService } from './UserAdminService';

@Module({
  imports: [UserModule],
  controllers: [UserAdminController],
  providers: [UserAdminService],
})
export class UserAdminModule {}
