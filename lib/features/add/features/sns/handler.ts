import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    logger.info('Coming soon');
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
