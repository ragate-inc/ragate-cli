import Logger from 'utils/logger';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import ServerlessConfigService from 'services/serverlessConfigService';
import CodeService from 'services/codeService';
import { AppSyncDataSource, AppSyncMappingTemplate } from 'types/index';
import * as Type from 'features/add/features/api/types/';
import AppSyncStackService from 'services/appSyncStackService';
import { AppSyncFunctionConfiguration } from 'types/index';
import path from 'path';
import _ from 'lodash';
import { GraphQLString } from 'graphql';
import { getLocaleLang } from 'features/add/features/api/utils/getLocale';
import { isCreateDataSource, addLambda, selectDataSource } from 'features/add/features/api/utils/inquirer';

export default async (args: { appSyncStackService: AppSyncStackService; lang: string; slsConfig: ServerlessConfigService; info: Type.PromptApiInfo }): Promise<void> => {
  const { appSyncStackService, lang, slsConfig, info } = args;
  const logger = Logger.getLogger();
  logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);
  const locale = getLocaleLang(lang);

  const createDataSource = await isCreateDataSource({
    lang,
    dataSource: appSyncStackService.appSyncStack?.dataSources ?? [],
  });

  const dataSourceProcess = async (): Promise<AppSyncDataSource> => {
    if (createDataSource) {
      return await addLambda({
        appSyncStackService,
        lang,
        slsConfig,
        info,
      });
    }
    return await selectDataSource({
      lang,
      appSyncStackService,
      slsConfig,
    });
  };

  const getTemplate = async (dataSource: AppSyncDataSource): Promise<{ before: string; after: string }> => {
    if (dataSource.type === 'AMAZON_DYNAMODB') {
      const { template, primaryKeyName, sortKeyName } = (await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          choices: ['query', 'queryWithGsi', 'scan'],
          message: locale.services.common.inquirer.template,
          validate: (value: string) => new Validator(value, lang).required().value(),
        },
        {
          type: 'input',
          name: 'primaryKeyName',
          message: locale.services.common.inquirer.primaryKeyName,
          default: () => 'Id',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
        },
        {
          type: 'input',
          name: 'sortKeyName',
          message: locale.services.common.inquirer.sortKeyName,
          default: () => 'Sk',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
        },
      ])) as { template: 'query' | 'queryWithGsi' | 'scan'; primaryKeyName: string; sortKeyName: string };
      if (template === 'query') {
        return {
          before: CodeService.templates.vtl.addDynamoQueryRequest({ primaryKeyName, sortKeyName }),
          after: CodeService.templates.vtl.addDynamoGetItemResponse,
        };
      }
      if (template === 'queryWithGsi') {
        const { gsiName } = (await inquirer.prompt([
          {
            type: 'input',
            name: 'gsiName',
            message: locale.services.generateQueryService.inquirer.gsiName,
            default: () => 'ExampleIndex',
            filter: (input: string) => input.replace(/\s+/g, ''),
            transformer: (input: string) => input.replace(/\s+/g, ''),
            validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
          },
        ])) as { gsiName: string };
        return {
          before: CodeService.templates.vtl.addDynamoQueryRequest({ gsiName, primaryKeyName, sortKeyName }),
          after: CodeService.templates.vtl.addDynamoGetItemResponse,
        };
      }
      if (template === 'scan') {
        return {
          before: CodeService.templates.vtl.dynamoScanRequest,
          after: CodeService.templates.vtl.dynamoScanResponse,
        };
      }
    } else if (dataSource.type === 'AMAZON_ELASTICSEARCH') {
      const { indexName } = (await inquirer.prompt([
        {
          type: 'input',
          name: 'indexName',
          message: locale.services.common.inquirer.indexName,
          default: () => info.apiName,
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
        },
      ])) as { indexName: string };
      return {
        before: CodeService.templates.vtl.openSearchQueryRequest({ indexName }),
        after: CodeService.templates.vtl.openSearchQueryResponse,
      };
    } else if (dataSource.type === 'RELATIONAL_DATABASE') {
      return {
        before: CodeService.templates.vtl.rdbQueryRequest,
        after: CodeService.templates.vtl.rdbQueryResponse,
      };
    } else if (dataSource.type === 'HTTP') {
      return {
        before: CodeService.templates.vtl.httpQueryRequest,
        after: CodeService.templates.vtl.httpQueryResponse,
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
      const { before, after } = await getTemplate(dataSource);
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
        const { before, after } = await getTemplate(dataSource);
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
