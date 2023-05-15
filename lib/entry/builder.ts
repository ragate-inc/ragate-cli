import Logger from 'utils/logger';
import pino from 'pino';
import yargs from 'yargs/yargs';
import { init as yargonautInit, chalk } from 'utils/yargonaut';
import config from 'config';
import { getLocaleLang } from 'entry/utils/getLocale';
import { Locale } from 'entry/types';
import createFeature from 'features/create/index';
import addFeature from 'features/add/index';
import { FeatureBuilderAbstractArgs, FeatureHandlerAbstractArgs, awsRegions } from 'types/index';
import _ from 'lodash';
import { cleanUpTmpDirectory } from 'utils/cli';

/**
 * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md
 * yargs api reference : https://yargs.js.org/docs/
 * Inquirer : https://github.com/SBoudrias/Inquirer.js/tree/master
 */

export default class {
  constructor() {
    try {
      yargonautInit();
      this.chalk = chalk;
      const argv = yargs(process.argv.slice(2))
        .options({
          lang: {
            default: this.langRef.default,
            type: this.langRef.type,
          },
          verbose: {
            type: this.verboseRef.type,
          },
          region: {
            default: this.regionRef.default,
            type: this.regionRef.type,
          },
        })
        .check((argv) => {
          argv.verbose = _.hasIn(argv, 'verbose');
          return true;
        })
        .help(false)
        .version(false)
        .parseSync();
      this.lang = argv.lang;
      this.verbose = argv.verbose as boolean;
      this.region = argv.region;
      this.locale = getLocaleLang(argv.lang);
      this.logger = Logger.getLogger(this.verbose ? 'debug' : 'info');
      this.npmVersion = config.npmVersion;
    } finally {
      cleanUpTmpDirectory();
    }
  }

  private readonly chalk: YargonautChalk;
  private readonly logger: pino.Logger;
  private readonly locale: Locale;

  private readonly lang: string;
  private readonly langRef = {
    default: process.env.LANG ?? 'en',
    type: 'string' as 'boolean' | 'string' | 'array' | 'count' | undefined,
  };

  private readonly verbose: boolean;
  private readonly verboseRef = {
    type: 'flag' as 'boolean' | 'string' | 'array' | 'count' | undefined,
  };

  private readonly npmVersion: string;
  private get version(): string {
    return `ragate-cli v${this.npmVersion}`;
  }

  private readonly region: string;
  private readonly regionRef = {
    default: 'ap-northeast-1',
    type: 'string' as 'boolean' | 'string' | 'array' | 'count' | undefined,
  };

  private handleError(err: Error): void {
    const logger = Logger.getLogger();
    if (err.name) logger.debug(err.name);
    if (err.stack) logger.debug(err.stack);
    console.error('\n', chalk.red(err.message));
    process.exit(1);
  }

  private cli() {
    const { version, chalk, locale, lang } = this;
    return yargs(process.argv.slice(2))
      .scriptName('')
      .options({
        verbose: {
          describe: chalk.grey(locale.options.describe.verbose),
          type: this.verboseRef.type,
        },
        lang: {
          describe: chalk.grey(locale.options.describe.lang),
          default: this.langRef.default,
          type: this.langRef.type,
        },
        region: {
          alias: 'r',
          describe: chalk.grey(locale.options.describe.region),
          default: this.regionRef.default,
          type: this.regionRef.type,
          choices: awsRegions,
        },
      })
      .usage(version)
      .help('help', chalk.grey(locale.help))
      .alias('h', 'help')
      .version('version', chalk.grey(locale.version), version)
      .alias('v', 'version')
      .check((argv) => {
        if (argv._.length === 0) throw new Error(this.locale.unProcessed.required);
        return true;
      })
      .command(
        'create',
        chalk.grey(locale.command.description.create),
        (_yargs) => {
          const args: FeatureBuilderAbstractArgs = { lang: this.lang, region: this.region };
          return new createFeature.builder(args).build(_yargs);
        },
        (argv) => new createFeature.handler(argv as FeatureHandlerAbstractArgs).run()
      )
      .command('add', chalk.grey(locale.command.description.add), (_yargs) => {
        const args: FeatureBuilderAbstractArgs = { lang: this.lang, region: this.region };
        return new addFeature.builder(args).build(_yargs);
      })
      .command(
        '*',
        '',
        () => ({}),
        () => {
          throw new Error(this.locale.unProcessed.notFound);
        }
      )
      .wrap(Math.max(yargs().terminalWidth() - 5, 60))
      .locale(lang)
      .fail((msg, err) => this.handleError(err));
  }

  public async run() {
    try {
      await this.cli().parseAsync();
    } catch (e) {
      this.handleError(e as Error);
    }
  }
}
