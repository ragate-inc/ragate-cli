import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
});

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export default (args: { logLevel: LogLevel }) => {
  return pino(
    {
      level: args.logLevel,
    },
    stream
  );
};
