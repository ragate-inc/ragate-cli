import { AWS_REGION, FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';
import addSnsFeature from 'features/add/features/sns';
import addSqsFeature from 'features/add/features/sqs';
import { chalk } from 'utils/yargonaut';
import { getLocaleLang } from 'features/add/utils/getLocale';

export default class extends FeatureBuilderAbstract {
  constructor(args?: { lang: string }) {
    super(args);
  }
  public build(yargs: yargs.Argv): yargs.Argv {
    const locale = getLocaleLang(this.lang);
    const logger = Logger.getLogger();
    return yargs
      .version(false)
      .usage('Usage: add <command> <options>')
      .command(
        'sns',
        chalk.grey(locale.command.description.sns),
        (yargs) =>
          new addSnsFeature.builder({
            lang: this.lang,
          }).build(yargs),
        (argv) => new addSnsFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
      )
      .command(
        'sqs',
        chalk.grey(locale.command.description.sns),
        (yargs) =>
          new addSqsFeature.builder({
            lang: this.lang,
          }).build(yargs),
        (argv) => new addSqsFeature.handler(argv as yargs.ArgumentsCamelCase<{ region: AWS_REGION }>).run()
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
