import yargs from 'yargs';
import { Logger } from 'pino';
export type Lang = 'ja' | 'en';

export abstract class FeatureHandlerAbstract {
  protected readonly argv: Record<string, unknown>;
  protected readonly logger: Logger;
  protected constructor(args: { argv: Record<string, unknown>; logger: Logger }) {
    const { argv, logger } = args;
    this.argv = argv;
    this.logger = logger;
  }
  public abstract run(): Promise<void>;
}

export abstract class FeatureBuilderAbstract {
  public static readonly build: (yargs: yargs.Argv, logger: Logger) => yargs.Argv;
}
