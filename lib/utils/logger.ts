import pino from 'pino';
import pretty from 'pino-pretty';
import { chalk } from 'utils/yargonaut';
import _ from 'lodash';

const stream = pretty({
  colorize: true, // --colorize
  messageFormat: (log: pino.LogDescriptor, messageKey: string): string => {
    const adjust = (msg: string): string => {
      if (log.level <= 30) return chalk.grey(msg);
      if (log.level === 40) return chalk.yellow(msg);
      if (log.level >= 50) return chalk.red(msg);
      return msg;
    };
    const message = log[messageKey] as string;
    if (_.isEmpty(message)) {
      return _.chain(log)
        .omit(['level', 'time', 'pid', 'hostname'])
        .thru((v) => JSON.stringify(v, null, 2))
        .thru((v) => adjust(v))
        .value();
    }
    if (log.requestId) return `[${log.requestId as string}] ${adjust(message)}`;
    return adjust(message);
  }, // --messageFormat
  timestampKey: 'time', // --timestampKey
  ignore: 'pid,hostname', // --ignore
  include: 'level,time', // --include
  singleLine: false, // --singleLine
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  sync: true, // by default we write asynchronously
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
