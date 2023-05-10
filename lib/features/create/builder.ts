import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import { Logger } from 'pino';
import { chalk } from 'utils/yargonaut';

export default class extends FeatureBuilderAbstract {
  public static build(yargs: yargs.Argv, logger: Logger): yargs.Argv {
    return yargs.version(false).fail((msg, err, yargs) => {
      if (msg) logger.error(chalk.red(msg));
      if (err) {
        if (err.stack) logger.error(chalk.red(err.stack));
        else logger.error(chalk.red(err.message));
      }
      process.exit(1);
    });
  }
}
