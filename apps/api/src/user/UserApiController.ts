import { Controller, Get, Inject } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { User } from '@app/entity/domain/user/User.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('>>>>>>>>>>> Test');
    return this.userApiService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userApiService.findAll();
  }
}
