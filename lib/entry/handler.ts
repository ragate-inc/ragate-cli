import Logger from 'utils/logger';
import yargs from 'yargs/yargs';
import { init as yargonautInit, chalk } from 'utils/yargonaut';
import _ from 'lodash';
import config from 'config';
import { getLocaleLang } from 'entry/utils/getLocale';
import { Locale } from 'entry/types';
import { Lang } from 'types/index';
import createFeature from 'features/create/index';
import addFeature from 'features/add/index';

/**
 * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md
 * yargs api reference : https://yargs.js.org/docs/
 * Inquirer : https://github.com/SBoudrias/Inquirer.js/tree/master
 */

export default class App {
  constructor() {
    yargonautInit();
    this.chalk = chalk;
    this.locale = config.lang;
    this.lang = getLocaleLang(this.locale);
    this.npmVersion = config.npmVersion;
  }

  private chalk: YargonautChalk;
  private locale: Lang;
  private lang: Locale;
  private npmVersion: string;
  private verbose = false;

  private get version(): string {
    return `ragate-cli v${this.npmVersion}`;
  }

  private get logger() {
    return Logger.getLogger(this.verbose ? 'debug' : 'info');
  }

  private outputResultError = (messages: string[]) => {
    messages.forEach((msg) => {
      this.logger.error(` ${msg}`);
    });
    // this.cli.showHelp();
  };

  private cli() {
    const { lang, version, chalk, locale } = this;
    return yargs(process.argv.slice(2))
      .scriptName('')
      .default('processed', false)
      .hide('processed')
      .options({
        verbose: {
          describe: chalk.grey(lang.options.describe.verbose),
          default: false,
          type: 'boolean',
        },
        region: {
          alias: 'r',
          describe: chalk.grey(lang.options.describe.region),
          default: 'ap-northeast-1',
          type: 'string',
          choices: [
            'ap-northeast-1',
            'us-east-2',
            'us-east-1',
            'us-west-1',
            'us-west-2',
            'af-south-1',
            'ap-east-1',
            'ap-south-2',
            'ap-southeast-3',
            'ap-southeast-3',
            'ap-southeast-4',
            'ap-south-1',
            'ap-northeast-3',
            'ap-northeast-2',
            'ap-southeast-1',
            'ap-southeast-2',
            'ap-northeast-1',
            'ca-central-1',
            'eu-central-1',
            'eu-west-1',
            'eu-west-2',
            'eu-south-1',
            'eu-west-3',
            'eu-south-2',
            'eu-north-1',
            'eu-central-2',
            'me-south-1',
            'me-central-1',
            'sa-east-1',
            'us-gov-east-1',
            'us-gov-west-1',
          ],
        },
      })
      .middleware((argv) => {
        this.verbose = argv.verbose || false;
      })
      .usage(version)
      .help('help', chalk.grey(lang.help))
      .alias('h', 'help')
      .version('version', chalk.grey(lang.version), version)
      .alias('v', 'version')
      .command(
        'create',
        chalk.grey(lang.command.description.create),
        (yargs) => createFeature.builder.build(yargs, this.logger),
        (argv) =>
          new createFeature.handler({
            argv: argv,
            logger: this.logger,
          })
            .run()
            .finally(() => (argv.processed = true))
      )
      .command('add', chalk.grey(lang.command.description.add), (yargs) => addFeature.builder.build(yargs, this.logger))
      .wrap(Math.max(yargs().terminalWidth() - 5, 60))
      .locale(locale);
  }

  public async run() {
    try {
      const argv = await this.cli().parseAsync();
      if (!argv.processed) {
        if (_.isEmpty(argv._)) {
          this.outputResultError([this.lang.unProcessed.required]);
        } else {
          this.outputResultError([this.lang.unProcessed.notFound, `${this.lang.yourInput}: ${argv._.join(' ')}`]);
        }
      }
    } catch (error) {
      const err = error as Error;
      this.outputResultError([err.message]);
    }
  }
}
