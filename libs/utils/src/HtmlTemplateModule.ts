import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';

@Module({
  imports: [
    WinstonModule.forRoot(
      getWinstonLogger(process.env.NODE_ENV || '', 'htmlTemplate'),
    ),
  ],
  exports: [HtmlTemplate],
})
export class HtmlTemplateModule {}
