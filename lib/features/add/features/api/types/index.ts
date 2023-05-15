import * as GlobalType from 'types/index';

export type Locale = {
  error: {
    mustByYamlFilePath: string;
    alreadyExistResource: string;
  };
  overrightFile: string;
  outputFile: string;
};

export type PromptApiInfo = {
  apiName: string;
  apiType: GlobalType.GraphqlApiType;
  resolverType: GlobalType.AppSyncResolverType;
  serverlessConfigPath: string;
};
