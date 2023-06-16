import { AWS_REGION, AppSyncDataSourceType, AppSyncResolverType } from '.';

export type AppSyncStackConfig = {
  name: string;
  authentication: Record<string, unknown>;
  additionalAuthentications: Record<string, unknown>[];
  apiKeys: Record<string, unknown>[];
  schema: string | string[];
  logging: Record<string, unknown>;
  pipelineFunctions: string[] | Record<string, unknown>;
  resolvers: string[] | Record<string, unknown>;
  dataSources: string[] | Record<string, unknown>;
};

export enum AuthenticationType {
  API_KEY = 'API_KEY',
  AWS_IAM = 'AWS_IAM',
  AMAZON_COGNITO_USER_POOLS = 'AMAZON_COGNITO_USER_POOLS',
  AWS_LAMBDA = 'AWS_LAMBDA',
  OPENID_CONNECT = 'OPENID_CONNECT',
}

export type CognitoConfig = {
  userPoolId: string;
  awsRegion?: AWS_REGION;
  appIdClientRegex?: string;
  defaultAction?: 'ALLOW' | 'DENY';
};

export type OIDCConfig = {
  issuer: string;
  clientId?: string;
  iatTTL?: number;
  authTTL?: number;
};

export type FunctionConfig = {
  handler: string;
  timeout: number;
};

export type LambdaConfig = {
  indentityValidationExpression?: string;
  authorizerResultTtlInSeconds?: number;
  function: FunctionConfig;
  functionName: string;
  functionAlias: string;
  functionArn: string;
  lambdaFunctionArn: string;
};

export type Authentication = {
  type: AuthenticationType;
  config?: CognitoConfig | OIDCConfig | LambdaConfig;
};

export type ApiKey = {
  name: string;
  description?: string;
  expiresAfter?: string; // e.g. 24h, 30d, 3M, 1y
  expiresAt?: string; // e.g. 2021-01-01T00:00:00
};

export type Logging = {
  loggingRoleArn: string;
  level: string;
  excludeVerboseContent: boolean;
};

export type PipelineFunction = {
  dataSource: string;
  request?: string;
  response?: string;
};

export type Resolver = {
  type?: string;
  field?: string;
  kind?: AppSyncResolverType;
  dataSource?: string;
  functions?: string[];
  request?: string;
  response?: string;
};

export type DataSource = {
  type: AppSyncDataSourceType;
  description?: string;
  config: Record<string, unknown>;
};

export type AppSyncStack = {
  name: string;
  authentication: Authentication;
  additionalAuthentications?: Authentication[];
  apiKeys?: string | ApiKey[];
  schema: string | string[];
  logging: Logging;
  pipelineFunctions: Record<string, PipelineFunction> | Record<string, PipelineFunction>[];
  resolvers: Record<string, Resolver> | Record<string, Resolver>[];
  dataSources: Record<string, DataSource> | Record<string, DataSource>[];
};
