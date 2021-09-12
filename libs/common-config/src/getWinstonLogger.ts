import { format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export function getWinstonLogger(nodeEnv, moduleName) {
  const isLocalEnv = ['local', 'test'].includes(nodeEnv);
  const level = isLocalEnv ? 'debug' : 'info';

  return {
    transports: [
      new transports.Console({
        level: level,
        format: isLocalEnv
          ? getTextFormat(moduleName)
          : getJsonFormat(moduleName),
      }),
    ],
  };
}

function getTextFormat(moduleName) {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.colorize(),
    nestWinstonModuleUtilities.format.nestLike(),
  );
}

function getJsonFormat(moduleName) {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.colorize(),
    format.json(),
  );
}
