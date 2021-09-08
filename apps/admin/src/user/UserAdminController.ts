import { Controller, Get } from '@nestjs/common';
import { UserAdminService } from './UserAdminService';
import { User } from '@app/entity/domain/user/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class UserAdminController {
  constructor(
    private readonly adminService: UserAdminService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
