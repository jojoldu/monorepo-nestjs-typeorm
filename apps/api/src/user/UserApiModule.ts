import { Module } from '@nestjs/common';
import { UserApiController } from './UserApiController';
import { UserApiService } from './UserApiService';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { GroupModule } from '@app/entity/domain/group/GroupModule';
import { UserApiQueryRepository } from './UserApiQueryRepository';
import { HtmlTemplateModule } from '@app/utils/HtmlTemplateModule';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';

@Module({
  imports: [UserModule, GroupModule, HtmlTemplateModule],
  controllers: [UserApiController],
  providers: [UserApiService, UserApiQueryRepository, HtmlTemplate],
})
export class UserApiModule {}
