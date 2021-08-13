import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';

@Module({
  providers: [EntityService],
  exports: [EntityService],
})
export class EntityModule {}
