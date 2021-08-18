import { Module } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';
import { EntityService } from '@app/entity';
import { UserModule } from '@app/entity/user/UserModule';
import { UserAdminController } from './UserAdminController';
import { UserAdminService } from './UserAdminService';

@Module({
  imports: [UserModule],
  controllers: [UserAdminController],
  providers: [UserAdminService, EntityService, UserEntityRepository],
})
export class UserAdminModule {}
