import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserName } from '@app/entity/domain/user/UserName';
import { UserApiQueryRepository } from './UserApiQueryRepository';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userApiQueryRepository: UserApiQueryRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserName(userId: number): Promise<UserName> {
    return await this.userApiQueryRepository.findUserName(userId);
  }
}
