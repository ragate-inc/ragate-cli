import Logger from 'utils/logger';
// import inquirer from 'inquirer';
// import config from 'config';
// import { getLocaleLang } from 'features/create/utils/getLocale';
// import _ from 'lodash';
// import inquirerPrompt from 'inquirer-autocomplete-prompt';
// import { cleanUpTmpDirectory, gitClone, isExistsDirectory, copyDirectory, processCurrent, tmpPath } from 'utils/cli';

export default async (args: { argv: Record<string, unknown> }): Promise<void> => {
  const { argv } = args;
  const logger = Logger.getLogger();
  logger.info('Coming soon');
  await new Promise((resolve) => setTimeout(resolve, 0));
  // logger.info('in progress...');
  // logger.info('done.');
};
