import { LogLevel, getLogger } from 'utils/logger';
import yargs from 'yargs/yargs';

/**
 * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md
 * yargs api reference : https://yargs.js.org/docs/
 */

void (() => {
  const argv = yargs(process.argv.slice(2))
    .scriptName('ragate')
    .options({
      loglevel: {
        alias: 'l',
        describe: 'choose a log level',
        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as LogLevel[],
        default: 'debug',
        type: 'string',
      },
    })
    .command('sing', 'a classic yargs command without prompting', () => {
      console.log('🎵 Oy oy oy');
    })
    .example('sing', 'count the lines in the given file')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .parseSync();

  const logger = getLogger({ logLevel: argv.loglevel as LogLevel });

  logger.info(argv);

  // TODO: process here
})();
