import { Injectable } from '@nestjs/common';

@Injectable()
export class UserApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
