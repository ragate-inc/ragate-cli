import inquirer from 'inquirer';
import config from 'config';
import { getLocaleLang } from 'features/create/utils/getLocale';
import _ from 'lodash';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { gitClone, isExistsDirectory, moveDirectory } from 'utils/cli';
import Logger from 'utils/logger';
import { FeatureHandlerAbstract, FeatureHandlerAbstractArgs } from 'types/index';
import path from 'path';

export default class extends FeatureHandlerAbstract {
  constructor(argv: FeatureHandlerAbstractArgs) {
    super(argv);
    inquirer.registerPrompt('autocomplete', inquirerPrompt as inquirer.prompts.PromptConstructor);
  }

  public async run(): Promise<void> {
    const { argv } = this;
    const logger = Logger.getLogger();
    logger.debug('create hander : ', argv);
    const locale = getLocaleLang(this.lang);
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

    logger.debug(`check exists directory : ${path.join(config.currentPath, projectName)}`);
    if (isExistsDirectory(path.join(config.currentPath, projectName))) {
      throw new Error(`${locale.error.alreadyExistsDirectory} : ${path.join(config.currentPath, projectName)}`);
    }

    await gitClone(config.repositoyUrl, config.tmpPath);
    moveDirectory(path.join(config.tmpPath, template), path.join(config.currentPath, projectName));
  }
}
