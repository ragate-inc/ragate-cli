import { Logger } from 'pino';
import { FeatureHandlerAbstract } from 'types/index';

export default class extends FeatureHandlerAbstract {
  constructor(args: { argv: Record<string, unknown>; logger: Logger }) {
    super(args);
  }

  public async run(): Promise<void> {
    const { argv, logger } = this;
    logger.info('Coming soon');
    // logger.info('in progress...');
    await new Promise((resolve) => setTimeout(resolve, 0));
    // logger.info('done.');
  }
}
