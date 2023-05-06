import getLogger from 'utils/logger';
import yargs from 'yargs/yargs';
import { getLocaleLang } from 'locale/index';
import { Locale, LocaleLang } from 'types/index';
import yargonaut from 'yargonaut';
import p from 'package.json';
import _ from 'lodash';

/**
 * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md
 * yargs api reference : https://yargs.js.org/docs/
 */

class App {
  constructor() {
    yargonaut.font('SansSerif').helpStyle('grey').errorsStyle('red');
    this.chalk = yargonaut.chalk();
    this.locale = (process.env.LOCALE ?? 'en') as Locale;
    this.lang = getLocaleLang(this.locale);
    this.npmVersion = (p as { version: string }).version;
  }

  private chalk: YargonautChalk;
  private locale: Locale;
  private lang: LocaleLang;
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
    return (
      yargs(process.argv.slice(2))
        .scriptName('')
        .default('processed', false)
        .hide('processed')
        .options({
          verbose: {
            describe: chalk.grey(lang.describe.verbose),
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
        // .command('add', chalk.grey(lang.command.description.add), (yargs) => {
        //   return yargs
        //     .usage(`${chalk.grey(lang.usage)}: ${chalk.green('add <sub_commands>')}`)
        //     .command(
        //       'example1',
        //       chalk.grey('Add example1'),
        //       (yargs) => {
        //         return yargs
        //           .usage(`${chalk.grey(lang.usage)}: ${chalk.green('add example1 <options>')}`)
        //           .options({
        //             opt1: {
        //               describe: chalk.grey('It is opt1.'),
        //               default: false,
        //               type: 'boolean',
        //             },
        //           })
        //           .version(false);
        //       },
        //       (argv) => {
        //         this.logger.debug('example1 handler : ', argv);
        //         argv.processed = true;
        //       }
        //     )
        //     .version(false);
        // })
        .command(
          'create',
          chalk.grey(lang.command.description.create),
          (yargs) => {
            return yargs.version(false);
          },
          (argv) => {
            this.logger.debug('create hander : ', argv);
            // TODO: create project
            argv.processed = true;
          }
        )
        .wrap(Math.max(yargs().terminalWidth() - 5, 60))
        .locale(locale)
    );
  }

  public listFonts(): string[] {
    return yargonaut.listFonts();
  }

  public async run() {
    const argv = await this.cli.parseAsync();
    console.log(argv);
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

void (async () => {
  const app = new App();
  await app.run();
})();
