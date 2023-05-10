import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';
import { chalk } from 'utils/yargonaut';

export default class extends FeatureBuilderAbstract {
  public static build(yargs: yargs.Argv): yargs.Argv {
    return yargs.version(false).fail((msg, err, yargs) => {
      const logger = Logger.getLogger('info');
      if (msg) logger.error(chalk.red(msg));
      if (err) {
        if (err.stack) logger.error(chalk.red(err.stack));
        else logger.error(chalk.red(err.message));
      }
      process.exit(1);
    });
  }
}
