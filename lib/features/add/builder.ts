import { AWS_REGION, FeatureBuilderAbstract, FeatureBuilderAbstractArgs } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';
import addSnsFeature from 'features/add/features/sns';
import addSqsFeature from 'features/add/features/sqs';
import addBasicauthlambdaFeature from 'features/add/features/basicauthlambda';
import { chalk } from 'utils/yargonaut';
import { getLocaleLang } from 'features/add/utils/getLocale';

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
      .usage('Usage: add <command> <options>')
      .command(
        'sns',
        chalk.grey(locale.command.description.sns),
        (_yargs) => new addSnsFeature.builder(this.args).build(_yargs),
        (argv) => new addSnsFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
      )
      .command(
        'sqs',
        chalk.grey(locale.command.description.sns),
        (_yargs) => new addSqsFeature.builder(this.args).build(_yargs),
        (argv) => new addSqsFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
      )
      .command(
        'basicauthlambda',
        chalk.grey(locale.command.description.basicAuthLambda),
        (_yargs) => new addBasicauthlambdaFeature.builder(this.args).build(_yargs),
        (argv) => new addBasicauthlambdaFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
      )
      .command(
        '*',
        chalk.grey('<command> <options>'),
        () => ({}),
        () => {
          logger.error(chalk.red(locale.unProcessed));
        }
      );
  }
}
