import { Controller, Get } from '@nestjs/common';
import { UserAdminService } from './UserAdminService';
import { User } from '@app/entity/user/User.entity';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';

@Controller()
export class UserAdminController {
  constructor(
    private readonly adminService: UserAdminService,
    private readonly userRepository: UserEntityRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
