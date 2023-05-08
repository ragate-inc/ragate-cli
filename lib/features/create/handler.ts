import inquirer from 'inquirer';
import { Logger } from 'pino';
import config from 'config';
import { getLocaleLang } from 'features/create/utils/getLocale';

export default async (args: { argv: Record<string, unknown>; logger: Logger }): Promise<void> => {
  const { argv, logger } = args;
  logger.debug('create hander : ', argv);
  const locale = getLocaleLang(config.lang);
  const res = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: locale.inquirer.choiceTemplate,
        choices: config.templates,
      },
    ])
    .then((answers) => {
      logger.debug(answers);
      return answers as Record<string, unknown>;
    })
    .catch((error) => {
      logger.error(error);
    });
  logger.info(res);
};
