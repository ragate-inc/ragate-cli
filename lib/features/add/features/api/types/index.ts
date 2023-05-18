import * as GlobalType from 'types/index';

export type Locale = {
  //
};

export type PromptApiInfo = {
  apiName: string;
  apiType: GlobalType.GraphqlApiType;
  resolverType: GlobalType.AppSyncResolverType;
  serverlessConfigPath: string;
};
