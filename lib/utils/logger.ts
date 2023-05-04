import pino from 'pino';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export const getLogger = (args: { logLevel: LogLevel }) => {
  return pino({
    level: args.logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
};
