import { ConsoleLogger } from '@nestjs/common';

export class PlainTextLogger extends ConsoleLogger {
  constructor() {
    super();
  }
}
