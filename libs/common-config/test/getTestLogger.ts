import { createLogger, transports } from 'winston';

export function getTestLogger() {
  return createLogger({
    transports: [new transports.Console()],
  });
}
