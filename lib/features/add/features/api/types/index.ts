import * as GlobalType from 'types/index';

export type Locale = {
  error: {
    notFoundServerlessConfig: string;
    notInstalledAppSyncPlugin: string;
    invalidServerlessCustomAppSync: string;
    alreadyExistsMappingTemplate: string;
    alreadyExistsResolver: string;
    alreadyExistsAPI: string;
  };
  inquirer: {
    apiName: string;
    apiType: string;
    resolverType: string;
    serverlessConfigPath: string;
    queryOperation: string;
  };
  services: {
    common: {
      inquirer: {
        createDataSource: string;
        lambdaFunctionName: string;
        lambdaHandler: string;
        dataSource: string;
        template: string;
        primaryKeyName: string;
        sortKeyName: string;
        indexName: string;
      };
      error: {
        notFoundDataSource: string;
      };
    };
    // generateMutationService: {
    //   error: {};
    //   inquirer: {};
    // };
    // generateGetItemService: {
    //   error: {};
    //   inquirer: {};
    // };
    generateQueryService: {
      // error: {};
      inquirer: {
        gsiName: string;
      };
    };
  };
};

export type PromptApiInfo = {
  apiName: string;
  apiType: GlobalType.GraphqlApiType;
  resolverType: GlobalType.AppSyncResolverType;
  serverlessConfigPath: string;
};
