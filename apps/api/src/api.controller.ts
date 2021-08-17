import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { EntityService } from '@app/entity';
import { UserRepository } from '@app/entity/user/UserRepository';
import { User } from '@app/entity/user/User';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly entityService: EntityService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
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
