export * as AppSyncV2 from 'types/appSyncV2';

export type Locale = {
  error: {
    notFoundServerlessConfig: string;
    notInstalledAppSyncPlugin: string;
    notFoundFunctionsConfig: string;
    invalidServerlessCustomAppSync: string;
    alreadyExistsMappingTemplate: string;
    alreadyExistsResolver: string;
    alreadyExistsAPI: string;
    required: string;
  };
  inquirer: {
    apiName: string;
    apiType: string;
    resolverInfo: string;
    relationInfo: string;
    resolverType: string;
    serverlessConfigPath: string;
    schemaGraphqlFilePath: string;
    queryOperation: string;
    dataSource: string;
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
export type RelationInfo = { type: string; field: string; resolver: string };
export type SchemaGraphqlInfo = {
  apiInfo: ApiInfo[];
  relationInfo: RelationInfo[];
};
export type TablePromptAnswer = { resolverInfo: string[]; relationInfo: string[] };
export type ResolverMapping = {
  resolver: string;
  type: string;
  name: string;
  returnValue?: string;
};
export type ResolverMappings = {
  vtl: ResolverMapping[];
  lambda: ResolverMapping[];
};
export type RelationMappings = RelationInfo[];

export type ServerlessConfigPathPromptAnswer = {
  serverlessConfigPath: string;
};
