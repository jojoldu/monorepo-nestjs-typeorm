import { createLogger, format, Logger, transports } from 'winston';
import { ConsoleLogger } from '@nestjs/common';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

export class JsonLogger extends ConsoleLogger {
  private logger: Logger;
  constructor() {
    super();
    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(
            format.label({ label: '[my-server]' }),
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.colorize(),
            format.printf(
              (info: TransformableInfo) =>
                `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
            ),
          ),
        }),
      ],
    });
  }

  log(message: any, ...optionalParams) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams) {
    super.error(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams) {
    super.debug(message, ...optionalParams);
  }
}
