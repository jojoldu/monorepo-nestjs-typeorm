import { Controller, Get } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { User } from '@app/entity/domain/user/User.entity';

@Controller()
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Get()
  getHello(): string {
    return this.userApiService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userApiService.findAll();
  }
}
