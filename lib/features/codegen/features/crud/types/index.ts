export * as AppSyncV2 from 'types/appSyncV2';

export type Locale = {
  error: {
    notFoundServerlessConfig: string;
    notInstalledAppSyncPlugin: string;
    invalidServerlessCustomAppSync: string;
    alreadyExistsMappingTemplate: string;
    alreadyExistsResolver: string;
    alreadyExistsAPI: string;
    required: string;
  };
  inquirer: {
    apiName: string;
    apiType: string;
    apiInfo: string;
    resolverType: string;
    serverlessConfigPath: string;
    schemaGraphqlFilePath: string;
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
    generateQueryService: {
      inquirer: {
        gsiName: string;
      };
    };
  };
};

export type Argument = { name: string; type: string; nonnull: boolean };
export type ApiInfo = { type: string; name: string; arguments: Argument[]; returnValue: string };
export type SchemaGraphqlInfo = { apiInfo: ApiInfo[] };
export type TablePromptAnswer = { apiInfo: string[] };
export type ApiTypeMapping = { [key: string]: string };

export type ServerlessConfigPathPromptAnswer = {
  serverlessConfigPath: string;
};
