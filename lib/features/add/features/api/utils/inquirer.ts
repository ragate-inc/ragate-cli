import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Transformer from 'utils/inquirer/transformer';
import ServerlessConfigService from 'services/serverlessConfigService';
import Filter from 'utils/inquirer/filter';
import CodeService from 'services/codeService';
import { AppSyncDataSource } from 'types/index';
import * as Type from 'features/add/features/api/types/';
import { chalk } from 'utils/yargonaut';
import AppSyncStackService from 'services/appSyncStackService';
import { getLocaleLang } from 'features/add/features/api/utils/getLocale';

export const isCreateDataSource = async (args: { lang: string; dataSource: AppSyncDataSource[] }): Promise<boolean> => {
  const { lang, dataSource } = args;
  const locale = getLocaleLang(lang);
  const { createDataSource } = (await inquirer.prompt([
    {
      type: 'expand',
      name: 'createDataSource',
      message: locale.services.common.inquirer.createDataSource,
      choices: [
        {
          key: 'y',
          name: 'yes',
          value: true,
        },
        {
          key: 'n',
          name: 'no',
          value: false,
        },
      ],
      validate: (value: string) => new Validator(value, lang).required().value(),
    },
  ])) as { createDataSource: boolean };
  if (createDataSource) {
    return createDataSource;
  } else if (dataSource.length === 0) {
    console.log(chalk.red(locale.services.common.error.notFoundDataSource));
    return isCreateDataSource(args);
  } else {
    return false;
  }
};

export const addLambda = async (args: {
  appSyncStackService: AppSyncStackService;
  lang: string;
  slsConfig: ServerlessConfigService;
  info: Type.PromptApiInfo;
}): Promise<AppSyncDataSource> => {
  const { lang, slsConfig, info, appSyncStackService } = args;
  const { apiName, apiType } = info;
  const locale = getLocaleLang(lang);
  const { lambdaFunctionName, lambdaHandler } = (await inquirer.prompt([
    {
      type: 'input',
      name: 'lambdaFunctionName',
      message: locale.services.common.inquirer.lambdaFunctionName,
      default: () => apiName,
      filter: (input: string) => input.replace(/\s+/g, ''),
      transformer: (input: string) => input.replace(/\s+/g, ''),
      validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
    },
    {
      type: 'input',
      name: 'lambdaHandler',
      message: locale.services.common.inquirer.lambdaHandler,
      default: () => `src/functions/appsync/${apiName}.handler`,
      validate: (value: string) => new Validator(value, lang).required().mustBeExtension().value(),
      transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
      filter: (input: string) => new Filter(input).removeAllSpace().value(),
    },
  ])) as { lambdaFunctionName: string; lambdaHandler: string };
  slsConfig.addFunction({
    lambdaFunctionName,
    lambdaHandler,
    code: CodeService.templates.typescript.skeleton,
  });
  const dataSource = {
    type: 'AWS_LAMBDA',
    name: lambdaFunctionName,
    description: `It is for ${apiType}.${apiName}`,
    config: {
      functionName: { Ref: `${lambdaFunctionName}LambdaFunction` },
      lambdaFunctionArn: { 'Fn::GetAtt': [`${lambdaFunctionName}LambdaFunction`, 'Arn'] },
      serviceRoleArn: { 'Fn::GetAtt': [appSyncStackService.appSyncLambdaRoleName, 'Arn'] },
    },
  } as AppSyncDataSource;
  appSyncStackService.addIamRoleByDataSource({
    dataSource: 'AWS_LAMBDA',
    sls: slsConfig,
  });
  appSyncStackService.addDataSource(dataSource);
  return dataSource;
};

export const selectDataSource = async (args: { appSyncStackService: AppSyncStackService; slsConfig: ServerlessConfigService; lang: string }): Promise<AppSyncDataSource> => {
  const { appSyncStackService, lang, slsConfig } = args;
  const locale = getLocaleLang(lang);
  const { dataSource } = (await inquirer.prompt([
    {
      type: 'list',
      name: 'dataSource',
      choices: appSyncStackService.appSyncStack?.dataSources.map((d) => d.name),
      message: locale.services.common.inquirer.dataSource,
      validate: (value: string) => new Validator(value, lang).required().value(),
    },
  ])) as { dataSource: string };
  const selectedDataSource = appSyncStackService.appSyncStack?.dataSources.find((d) => d.name === dataSource) as AppSyncDataSource;
  appSyncStackService.addIamRoleByDataSource({
    dataSource: selectedDataSource.type,
    sls: slsConfig,
  });
  return selectedDataSource;
};
