import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityService {
  getHello(): string {
    return 'Hello Entity3';
  }
}
