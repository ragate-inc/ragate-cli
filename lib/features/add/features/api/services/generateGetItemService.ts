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
import path from 'path';
import _ from 'lodash';
import { GraphQLString } from 'graphql';

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
        validate: (value: string) => new Validator(value, lang).required().value(),
      },
    ])) as { createDataSource: boolean };
    if (createDataSource) {
      return createDataSource;
    } else if (appSyncStackService.appSyncStack?.dataSources.length === 0) {
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
        code: CodeService.templates.typescript.skeleton,
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
        choices: appSyncStackService.appSyncStack?.dataSources.map((d) => d.name),
        message: 'データソースを選択',
        validate: (value: string) => new Validator(value, lang).required().value(),
      },
    ])) as { dataSource: string };
    const selectedDataSource = appSyncStackService.appSyncStack?.dataSources.find((d) => d.name === dataSource) as AppSyncDataSource;
    appSyncStackService.addIamRoleByDataSource({
      dataSource: selectedDataSource.type,
      sls: slsConfig,
    });
    logger.debug('finished dataSourceProcess');
    return selectedDataSource;
  };

  const getTemplate = async (): Promise<{ before: string; after: string }> => {
    const { template } = (await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        choices: ['getItem', 'getItemConsistentRead', 'localResolver'],
        message: 'テンプレートを選択',
        validate: (value: string) => new Validator(value, lang).required().value(),
      },
    ])) as { template: 'getItem' | 'getItemConsistentRead' | 'localResolver' };
    if (template === 'getItem') {
      return {
        before: CodeService.templates.vtl.getItemRequest(false),
        after: CodeService.templates.vtl.getItemResponse,
      };
    }
    if (template === 'getItemConsistentRead') {
      return {
        before: CodeService.templates.vtl.getItemRequest(true),
        after: CodeService.templates.vtl.getItemResponse,
      };
    }
    if (template === 'localResolver') {
      return {
        before: CodeService.templates.vtl.localResolverRequest,
        after: CodeService.templates.vtl.localResolverResponse,
      };
    }
    return {
      before: '{}',
      after: '{}',
    };
  };

  const functionConfigurationsProcess = async (args: { dataSource: AppSyncDataSource }): Promise<AppSyncFunctionConfiguration | undefined> => {
    const { dataSource } = args;
    if (info.resolverType === 'UNIT') return Promise.resolve(undefined);
    // pipeline resolver
    const basePath = appSyncStackService.appSyncStack?.functionConfigurationsLocation ?? './';
    const functionConfiguration: AppSyncFunctionConfiguration = {
      dataSource: dataSource.name,
      name: `${info.apiType}${_.upperFirst(info.apiName)}`,
      request: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.request.vtl`,
      response: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.response.vtl`,
    };
    if (dataSource.type !== 'AWS_LAMBDA') {
      const { before, after } = await getTemplate();
      if (_.isString(functionConfiguration.request)) {
        new CodeService({
          filePath: path.join(basePath, functionConfiguration.request),
          code: before,
          type: 'vtl',
        }).write();
      }
      if (_.isString(functionConfiguration.response)) {
        new CodeService({
          filePath: path.join(basePath, functionConfiguration.response),
          code: after,
          type: 'vtl',
        }).write();
      }
    }
    appSyncStackService.addFunctionConfiguration({
      functionConfiguration,
    });
    logger.debug('finished functionConfigurationsProcess');
    return Promise.resolve(functionConfiguration);
  };

  const mappingTemplateProcess = async (args: { dataSource: AppSyncDataSource; functionConfigurations?: AppSyncFunctionConfiguration }): Promise<AppSyncMappingTemplate> => {
    const { dataSource, functionConfigurations } = args;
    const generateDataSource = async (): Promise<AppSyncMappingTemplate> => {
      if (info.resolverType === 'PIPELINE') {
        const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';
        const res = {
          type: info.apiType,
          request: `queries/${info.apiType}.${info.apiName}.request.vtl`,
          response: `queries/${info.apiType}.${info.apiName}.response.vtl`,
          field: info.apiName,
          kind: info.resolverType,
          functions: [functionConfigurations?.name as string],
        };
        new CodeService({ filePath: path.join(basePath, res.request), code: CodeService.templates.vtl.pipelineBefore, type: 'vtl' }).write();
        new CodeService({ filePath: path.join(basePath, res.response), code: CodeService.templates.vtl.pipelineAfter, type: 'vtl' }).write();
        return res;
      }
      // unit resolver
      const mappingTemplate = {
        dataSource: dataSource.name,
        type: info.apiType,
        field: info.apiName,
        kind: info.resolverType,
        request: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.request.vtl`,
        response: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.response.vtl`,
      };
      if (dataSource.type !== 'AWS_LAMBDA') {
        const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';
        const { before, after } = await getTemplate();
        if (_.isString(mappingTemplate.request)) {
          new CodeService({
            filePath: path.join(basePath, mappingTemplate.request),
            code: before,
            type: 'vtl',
          }).write();
        }
        if (_.isString(mappingTemplate.response)) {
          new CodeService({
            filePath: path.join(basePath, mappingTemplate.response),
            code: after,
            type: 'vtl',
          }).write();
        }
      }
      return mappingTemplate;
    };
    const mappingTemplate = await generateDataSource();
    appSyncStackService.addMappingTemplate({
      mappingTemplate,
    });
    logger.debug('finished mappingTemplateProcess');
    return mappingTemplate;
  };

  const schemaGraphqlProcess = async (): Promise<string> => {
    const graphqlEditor = appSyncStackService.graphqlEditor;
    const type = appSyncStackService.graphqlEditor.addExampleType(info.apiName);
    appSyncStackService.updateCustomSchemaGraphl({
      query: {
        apiName: info.apiName,
        type: type.getType(),
        args: {
          example: {
            type: GraphQLString,
          },
        },
      },
    });
    logger.debug('finished scheneGraphqlProcess');
    return Promise.resolve(graphqlEditor.customSchema as string);
  };

  const resDataSource: AppSyncDataSource = await dataSourceProcess();
  const resFunctionConfigurations = await functionConfigurationsProcess({ dataSource: resDataSource });
  const resMappingTemplate: AppSyncMappingTemplate = await mappingTemplateProcess({ dataSource: resDataSource, functionConfigurations: resFunctionConfigurations });
  const resSchemaGraphql: string = await schemaGraphqlProcess();

  logger.debug({
    dataSource: resDataSource,
    functionConfigurations: resFunctionConfigurations,
    mappingTemplate: resMappingTemplate,
    schemaGraphql: resSchemaGraphql,
  });
};
