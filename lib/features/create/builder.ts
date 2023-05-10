import { FeatureBuilderAbstract, FeatureBuilderAbstractArgs } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';
import { chalk } from 'utils/yargonaut';
import { getLocaleLang } from 'features/create/utils/getLocale';
import createFeature from 'features/create/index';

export default class extends FeatureBuilderAbstract {
  constructor(args: FeatureBuilderAbstractArgs) {
    super(args);
  }
  public build(yargs: yargs.Argv): yargs.Argv {
    const lang = this.args.lang;
    const locale = getLocaleLang(lang);
    const logger = Logger.getLogger();
    return yargs
      .version(false)
      .usage('Usage: create <options>')
      .command(
        '*',
        chalk.grey('<command> <options>'),
        () => ({}),
        (argv) => {
          if (argv._.length === 1) return new createFeature.handler(argv).run();
          logger.error(chalk.red(locale.error.unProcessed));
        }
      );
  }
}
