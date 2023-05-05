import { LogLevel, getLogger } from 'utils/logger';
import yargs from 'yargs/yargs';
import { getLocaleLang } from 'locale/index';
import { Locale } from 'types/index';
import yargonaut from 'yargonaut';

yargonaut.font('SansSerif').helpStyle('grey').errorsStyle('red');

const chalk = yargonaut.chalk();

// ouput yargonaut fonts
// console.log(JSON.stringify(yargonaut.listFonts(), null, 2));

/**
 * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md
 * yargs api reference : https://yargs.js.org/docs/
 */

void (() => {
  const locale = (process.env.LOCALE ?? 'en') as Locale;
  const lang = getLocaleLang(locale);

  const argv = yargs(process.argv.slice(2))
    .scriptName('ragate')
    .usage(['', chalk.grey(`${lang.usage}:`), 'ragate-cli <command> <options>', ' ragate <command> <options>'].join('\n'))
    .option('log', {
      alias: 'l',
      describe: lang.describe.logLevel,
      choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as LogLevel[],
      default: 'debug',
      type: 'string',
    })
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .command('$0', 'create project', (yargs) => {
      return yargs
        .option('template', {
          alias: 't',
          type: 'string',
          choices: ['aws-node-appsync'],
          default: 'aws-node-appsync',
          describe: lang.describe.template,
        })
        .version(false);
    })
    .command('add', 'Add file contents to the index', (yargs) => {
      return yargs
        .usage(`${lang.usage}: $0 add <options>`)
        .option('A', {
          alias: 'all',
          type: 'boolean',
          describe: 'Update the index not only where the working tree',
        })
        .version(false);
    })
    .locale(locale)
    .parseSync();

  const logger = getLogger({ logLevel: argv.log as LogLevel });

  logger.debug(argv);

  switch (argv._[0]) {
    case 'add':
      logger.debug('command: add!');
      break;
    case 'commit':
      logger.debug('command: commit!');
      break;
    default:
      logger.debug('command: default!');
  }
})();
