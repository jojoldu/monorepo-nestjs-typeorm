import { PlainTextLogger } from './PlainTextLogger';
import { JsonLogger } from './JsonLogger';

export function createLogger(nodeEnv) {
  if (nodeEnv === 'local') {
    return new PlainTextLogger();
  }

  return new JsonLogger();
}
