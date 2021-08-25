import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdminService {
  getHello(): string {
    return 'Hello World!!';
  }
}
