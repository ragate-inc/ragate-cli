import getLogger from 'utils/logger';
import yargs from 'yargs/yargs';
import yargonaut from 'yargonaut';
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
    yargonaut.font('SansSerif').helpStyle('grey').errorsStyle('red');
    this.chalk = yargonaut.chalk();
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
    return getLogger({ logLevel: this.verbose ? 'debug' : 'info' });
  }

  private get cli() {
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
        (yargs) => createFeature.builder(yargs),
        (argv) =>
          createFeature
            .handler({
              argv: argv,
              logger: this.logger,
            })
            .finally(() => (argv.processed = true))
      )
      .command(
        'add',
        chalk.grey(lang.command.description.add),
        (yargs) => addFeature.builder(yargs),
        (argv) =>
          addFeature
            .handler({
              argv: argv,
              logger: this.logger,
            })
            .finally(() => (argv.processed = true))
      )
      .wrap(Math.max(yargs().terminalWidth() - 5, 60))
      .locale(locale);
  }

  public listFonts(): string[] {
    return yargonaut.listFonts();
  }

  public async run() {
    const argv = await this.cli.parseAsync();
    this.logger.debug(argv);
    if (!argv.processed) {
      // this.cli.showHelp();
      console.error('\n', this.chalk.red(`Error:`));
      if (_.isEmpty(argv._)) {
        console.error(` ${this.lang.unProcessed.required}}`);
      } else {
        console.error(` ${this.lang.unProcessed.notFound}}`);
        console.error(this.chalk.grey(` ${this.lang.yourInput}: ${argv._.join(' ')}`));
      }
    }
  }
}
