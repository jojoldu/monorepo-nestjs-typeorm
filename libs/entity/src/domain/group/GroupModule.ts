import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Group } from '@app/entity/domain/group/Group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class GroupModule {}
