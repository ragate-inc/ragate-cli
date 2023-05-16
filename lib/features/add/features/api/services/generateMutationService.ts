import Logger from 'utils/logger';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Transformer from 'utils/inquirer/transformer';
import ServerlessConfigService from 'services/serverlessConfigService';
import Filter from 'utils/inquirer/filter';
import CodeService from 'services/codeService';
import { AppSyncDataSource, AppSyncMappingTemplate } from 'types/index';
import * as Type from 'features/add/features/api/types/';
import { chalk } from 'utils/yargonaut';
import AppSyncStackService from 'services/appSyncStackService';
import { AppSyncFunctionConfiguration } from 'types/index';

export default async (args: { appSyncStackService: AppSyncStackService; lang: string; slsConfig: ServerlessConfigService; info: Type.PromptApiInfo }): Promise<void> => {
  const { appSyncStackService, lang, slsConfig, info } = args;
  const logger = Logger.getLogger();
  logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);

  const isCreateDataSource = async (): Promise<boolean> => {
    const { createDataSource } = (await inquirer.prompt([
      {
        type: 'expand',
        name: 'createDataSource',
        message: 'データソースを新しく作成しますか？',
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
        filter: (input: string) => input.replace(/\s+/g, ''),
        transformer: (input: string) => input.replace(/\s+/g, ''),
        validate: (value: string) => new Validator(value, lang).required().value(),
      },
    ])) as { createDataSource: boolean };
    if (createDataSource) {
      return createDataSource;
    } else if (appSyncStackService.appSyncStack.dataSources.length === 0) {
      console.log(chalk.red('データソースが存在しません、データソースを作成する必要があります'));
      return isCreateDataSource();
    } else {
      return false;
    }
  };

  const createDataSource = await isCreateDataSource();

  const dataSourceProcess = async (): Promise<AppSyncDataSource> => {
    if (createDataSource) {
      const { lambdaFunctionName, lambdaHandler } = (await inquirer.prompt([
        {
          type: 'input',
          name: 'lambdaFunctionName',
          message: 'Lambda関数名を入力',
          default: () => info.apiName,
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
        },
        {
          type: 'input',
          name: 'lambdaHandler',
          message: 'input a lambda handler path',
          default: () => `src/functions/appsync/${info.apiName}.handler`,
          validate: (value: string) => new Validator(value, lang).required().mustBeExtension().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
      ])) as { lambdaFunctionName: string; lambdaHandler: string };
      slsConfig.addFunction({
        lambdaFunctionName,
        lambdaHandler,
        code: CodeService.templates.skeleton,
      });
      const dataSource = {
        type: 'AWS_LAMBDA',
        name: lambdaFunctionName,
        description: `It is for ${info.apiType}.${info.apiName}`,
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
    }
    const { dataSource } = (await inquirer.prompt([
      {
        type: 'list',
        name: 'dataSource',
        choices: appSyncStackService.appSyncStack.dataSources.map((d) => d.name),
        message: 'データソースを選択',
        validate: (value: string) => new Validator(value, lang).required().value(),
      },
    ])) as { dataSource: string };
    const selectedDataSource = appSyncStackService.appSyncStack.dataSources.find((d) => d.name === dataSource) as AppSyncDataSource;
    appSyncStackService.addIamRoleByDataSource({
      dataSource: selectedDataSource.type,
      sls: slsConfig,
    });
    return selectedDataSource;
  };

  const functionConfigurationsProcess = (args: { dataSource: AppSyncDataSource }): Promise<AppSyncFunctionConfiguration | undefined> => {
    const { dataSource } = args;
    if (info.resolverType === 'UNIT') return Promise.resolve(undefined);
    // pipeline resolver
    const functionConfiguration: AppSyncFunctionConfiguration = {
      dataSource: dataSource.name,
      name: `${info.apiType}${info.apiName}`,
      request: `functions/${info.apiType}${info.apiName}.request.vtl`,
      response: `functions/${info.apiType}${info.apiName}.response.vtl`,
    };
    appSyncStackService.addFunctionConfiguration({
      functionConfiguration,
    });
    return Promise.resolve(functionConfigurations);
  };

  const mappingTemplateProcess = async (args: { dataSource: AppSyncDataSource; functionConfigurations?: AppSyncFunctionConfiguration }): Promise<AppSyncMappingTemplate> => {
    const { dataSource } = args;
    const generateDataSource = (): AppSyncMappingTemplate => {
      if (info.resolverType === 'PIPELINE') {
        return {
          type: info.apiType,
          request: `queries/${info.apiType}.${info.apiName}.request.vtl`,
          response: `queries/${info.apiType}.${info.apiName}.response.vtl`,
          field: info.apiName,
          kind: info.resolverType,
          functions: [functionConfigurations?.name as string],
        };
      }
      // unit resolver
      return {
        dataSource: dataSource.name,
        type: info.apiType,
        field: info.apiName,
        kind: info.resolverType,
        request: `queries/${info.apiType}.${info.apiName}.request.vtl`,
        response: `queries/${info.apiType}.${info.apiName}.response.vtl`,
      };
    };
    const mappingTemplate = generateDataSource();
    appSyncStackService.addMappingTemplate({
      mappingTemplate,
    });
    return mappingTemplate;
  };

  const dataSource: AppSyncDataSource = await dataSourceProcess();
  const functionConfigurations = await functionConfigurationsProcess({ dataSource });
  const mappingTemplate: AppSyncMappingTemplate = await mappingTemplateProcess({ dataSource, functionConfigurations });

  /**
   * TODO: scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
   * TODO: customScheme.graphqlをstack.ymlへ書き込み
   * TODO: レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
   */
};
