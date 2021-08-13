import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { EntityService } from '@app/entity';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly entityService: EntityService,
  ) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('/entity')
  getEntity(): string {
    return this.entityService.getHello();
  }
}
