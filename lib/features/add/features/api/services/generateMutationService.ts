import Logger from 'utils/logger';
import ServerlessConfigService from 'services/serverlessConfigService';
import CodeService from 'services/codeService';
import { AppSyncDataSource, AppSyncMappingTemplate } from 'types/index';
import * as Type from 'features/add/features/api/types/';
import AppSyncStackService from 'services/appSyncStackService';
import { AppSyncFunctionConfiguration } from 'types/index';
import path from 'path';
import _ from 'lodash';
import { addLambda, isCreateDataSource, selectDataSource } from 'features/add/features/api/utils/inquirer';

export default async (args: { appSyncStackService: AppSyncStackService; lang: string; slsConfig: ServerlessConfigService; info: Type.PromptApiInfo }): Promise<void> => {
  const { appSyncStackService, lang, slsConfig, info } = args;
  const logger = Logger.getLogger();
  logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);

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

  const functionConfigurationsProcess = (args: { dataSource: AppSyncDataSource }): Promise<AppSyncFunctionConfiguration | undefined> => {
    const { dataSource } = args;
    if (info.resolverType === 'UNIT') return Promise.resolve(undefined);
    // pipeline resolver
    const functionConfiguration: AppSyncFunctionConfiguration = {
      dataSource: dataSource.name,
      name: `${info.apiType}${_.upperFirst(info.apiName)}`,
      request: false,
      response: false,
    };
    appSyncStackService.addFunctionConfiguration({
      functionConfiguration,
    });
    logger.debug('finished functionConfigurationsProcess');
    return Promise.resolve(functionConfiguration);
  };

  const mappingTemplateProcess = async (args: { dataSource: AppSyncDataSource; functionConfigurations?: AppSyncFunctionConfiguration }): Promise<AppSyncMappingTemplate> => {
    const { dataSource, functionConfigurations } = args;
    const generateDataSource = (): AppSyncMappingTemplate => {
      if (info.resolverType === 'PIPELINE') {
        const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';
        const res = {
          type: info.apiType,
          request: `mutations/${info.apiType}.${info.apiName}.request.vtl`,
          response: `mutations/${info.apiType}.${info.apiName}.response.vtl`,
          field: info.apiName,
          kind: info.resolverType,
          functions: [functionConfigurations?.name as string],
        };
        new CodeService({ filePath: path.join(basePath, res.request), code: CodeService.templates.vtl.pipelineBefore, type: 'vtl' }).write();
        new CodeService({ filePath: path.join(basePath, res.response), code: CodeService.templates.vtl.pipelineAfter, type: 'vtl' }).write();
        return res;
      }
      // unit resolver
      return {
        dataSource: dataSource.name,
        type: info.apiType,
        field: info.apiName,
        kind: info.resolverType,
        request: false,
        response: false,
      };
    };
    const mappingTemplate = generateDataSource();
    appSyncStackService.addMappingTemplate({
      mappingTemplate,
    });
    logger.debug('finished mappingTemplateProcess');
    return mappingTemplate;
  };

  const schemaGraphqlProcess = async (): Promise<string> => {
    const graphqlEditor = appSyncStackService.graphqlEditor;
    const type = appSyncStackService.graphqlEditor.addExampleType(info.apiName);
    const input = appSyncStackService.graphqlEditor.addExampleInput(info.apiName);
    appSyncStackService.updateCustomSchemaGraphl({
      mutation: {
        apiName: info.apiName,
        type: type.getType(),
        input: input.getType(),
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
