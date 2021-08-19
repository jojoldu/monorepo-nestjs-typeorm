import { Injectable } from '@nestjs/common';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';

@Injectable()
export class UserApiService {
  constructor(private readonly userRepository: UserEntityRepository) {}

  getHello(): string {
    return 'Hello World!';
  }
}
