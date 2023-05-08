import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
});

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export default class {
  private constructor() {
    throw new Error('singleton cannot be instantiated');
  }

  private static logger: pino.Logger;

  public static getLogger(logLevel?: LogLevel): pino.Logger {
    if (logLevel) {
      this.logger = pino(
        {
          level: logLevel,
        },
        stream
      );
      return this.logger;
    }

    if (this.logger) {
      return this.logger;
    }

    this.logger = pino(
      {
        level: logLevel,
      },
      stream
    );
    return this.logger;
  }
}
