import { Controller, Get } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { EntityService } from '@app/entity';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';
import { User } from '@app/entity/user/User.entity';

@Controller()
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    private readonly entityService: EntityService,
    private readonly userRepository: UserEntityRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.userApiService.getHello();
  }

  @Get('/entity')
  getEntity(): string {
    return this.entityService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
