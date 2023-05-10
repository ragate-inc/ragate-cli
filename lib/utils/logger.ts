import pino from 'pino';
import pretty from 'pino-pretty';
import { chalk } from 'utils/yargonaut';

const stream = pretty({
  colorize: true,
});

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export default class {
  private constructor() {
    throw new Error('singleton cannot be instantiated');
  }

  private static logger: pino.Logger;

  public static getLogger(logLevel: LogLevel = 'info'): pino.Logger {
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

  public static handleFaildLog(args: { msg: string; err: Error }): void {
    const { msg, err } = args;
    const logger = this.getLogger();
    if (msg) logger.error(chalk.red(msg));
    if (err) {
      if (err.stack) logger.error(chalk.red(err.stack));
      else logger.error(chalk.red(err.message));
    }
    process.exit(1);
  }
}
