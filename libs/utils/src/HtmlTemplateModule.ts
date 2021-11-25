import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/logger/getWinstonLogger';
import { HtmlTemplate } from '@app/template-html/HtmlTemplate';

@Module({
  imports: [
    WinstonModule.forRoot(
      getWinstonLogger(process.env.NODE_ENV || '', 'htmlTemplate'),
    ),
  ],
  exports: [HtmlTemplate],
})
export class HtmlTemplateModule {}
