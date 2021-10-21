import { Module } from '@nestjs/common';
import { UserApiModule } from './user/UserApiModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { getPgRealTypeOrmModule } from '../../../libs/entity/getPgRealTypeOrmModule';

@Module({
  imports: [
    getPgRealTypeOrmModule(),
    UserApiModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
})
export class ApiAppModule {}
