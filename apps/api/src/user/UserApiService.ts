import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from '@app/entity/domain/user/UserQueryRepository';
import { User } from '@app/entity/domain/user/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
