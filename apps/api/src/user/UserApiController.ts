import { Controller, Get, Inject } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { User } from '@app/entity/domain/user/User.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@app/common-config/res/ResponseEntity';

@Controller('/user')
@ApiTags('유저 API')
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/hello')
  @ApiOperation({
    summary: '테스트 API',
  })
  @ApiOkResponse({
    description: '테스트 API.',
    type: ResponseEntity,
  })
  getHello(): ResponseEntity<string> {
    this.logger.info('>>>>>>>>>>> Test');
    return ResponseEntity.OK_WITH(this.userApiService.getHello());
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userApiService.findAll();
  }
}
