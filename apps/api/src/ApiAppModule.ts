import { Module } from '@nestjs/common';
import { UserApiModule } from './user/UserApiModule';
import { getPgTestTypeOrmModule } from '@app/entity/config/getPgRealTypeOrmModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';

@Module({
  imports: [
    getPgTestTypeOrmModule(),
    UserApiModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
})
export class ApiAppModule {}
