import inquirer from 'inquirer';
import config from 'config';
import { getLocaleLang } from 'features/create/utils/getLocale';
import _ from 'lodash';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { cleanUpTmpDirectory, gitClone, isExistsDirectory, copyDirectory, processCurrent, tmpPath } from 'utils/cli';
import { Logger } from 'pino';
import { FeatureHandlerAbstract } from 'types/index';

export default class extends FeatureHandlerAbstract {
  constructor(args: { argv: Record<string, unknown>; logger: Logger }) {
    super(args);
    inquirer.registerPrompt('autocomplete', inquirerPrompt as inquirer.prompts.PromptConstructor);
  }

  public async run(): Promise<void> {
    const { argv, logger } = this;
    logger.debug('create hander : ', argv);
    const locale = getLocaleLang(config.lang);
    const res = (await inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'template',
          emptyText: locale.inquirer.template.autocomplete.emptyText,
          message: locale.inquirer.template.choiceTemplate,
          source: (answersSoFar: string, input: string) => (_.isEmpty(input) ? config.templates : config.templates.filter((item) => item.name.includes(input))),
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'input a project name',
          default: (answers: Record<string, string>) => answers.template,
          validate: (value) => {
            if (_.isEmpty(value)) return 'required input a project name';
            return true;
          },
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as Record<string, string>;
    logger.debug(`input values : ${JSON.stringify(res)}}`);
    const { template, projectName } = res;
    logger.info(`template : ${template}`);
    logger.info(`projectName : ${projectName}`);

    if (isExistsDirectory(`${processCurrent}/${projectName}`)) {
      throw new Error(`${locale.error.alreadyExistsDirectory} : ${processCurrent}/${projectName}`);
    }

    if (isExistsDirectory(tmpPath)) {
      cleanUpTmpDirectory();
    }

    gitClone(config.repositoyUrl, tmpPath);
    copyDirectory(`${tmpPath}/${template}`, `${processCurrent}/${projectName}`);
  }
}
