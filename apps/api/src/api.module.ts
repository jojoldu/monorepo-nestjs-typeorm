import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { EntityService } from '@app/entity';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, EntityService],
})
export class ApiModule {}
