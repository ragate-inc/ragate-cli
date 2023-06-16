import { AWS_REGION, FeatureBuilderAbstract, FeatureBuilderAbstractArgs, FeatureHandlerAbstractArgs } from 'types/index';
import yargs from 'yargs';
import { chalk } from 'utils/yargonaut';
import createFeature from 'features/create/index';
import { getLocaleLang } from 'features/codegen/utils/getLocale';
import Logger from 'utils/logger';
import crudFeature from 'features/codegen/features/crud';

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
      .usage('Usage: codegen <command> <options>')
      .command(
        'crud',
        chalk.grey(locale.command.description.crud),
        (_yargs) => new crudFeature.builder(this.args).build(_yargs),
        (argv) => new crudFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
      )
      .command(
        '*',
        chalk.grey('<command> <options>'),
        () => ({}),
        (argv) => {
          if (argv._.length === 1) return new createFeature.handler(argv as FeatureHandlerAbstractArgs).run();
          throw new Error('locale.error.unProcessed');
        }
      );
  }
}
