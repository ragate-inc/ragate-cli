import config from 'config';
import yargs from 'yargs';
import { chalk } from 'utils/yargonaut';
import GraphqlAnalyzer from 'utils/graphql/analyzer';

export type FeatureHandlerAbstractArgs = yargs.ArgumentsCamelCase<{ region: string }>;

export abstract class FeatureHandlerAbstract {
  private readonly _argv: FeatureHandlerAbstractArgs;
  private readonly _lang: string;
  protected constructor(argv: FeatureHandlerAbstractArgs) {
    this._argv = argv;
    this._lang = argv.lang as string;
  }
  protected get argv(): FeatureHandlerAbstractArgs {
    return this._argv;
  }
  protected get lang(): string {
    return this._lang;
  }
  public abstract run(): Promise<void>;
}

export type FeatureBuilderAbstractArgs = { lang: string; region: string };

export abstract class FeatureBuilderAbstract {
  private readonly _args: FeatureBuilderAbstractArgs;
  private readonly _npmVersion: string;
  private readonly _chalk: typeof chalk;
  protected constructor(args: FeatureBuilderAbstractArgs) {
    this._chalk = chalk;
    this._args = args;
    this._npmVersion = config.npmVersion;
  }
  protected get args() {
    return this._args;
  }
  protected get npmVersion() {
    return this._npmVersion;
  }
  protected get chalk() {
    return this._chalk;
  }
  public abstract build(yargs: yargs.Argv): yargs.Argv;
}

export type AWS_REGION =
  | 'ap-northeast-1'
  | 'us-east-2'
  | 'us-east-1'
  | 'us-west-1'
  | 'us-west-2'
  | 'af-south-1'
  | 'ap-east-1'
  | 'ap-south-2'
  | 'ap-southeast-3'
  | 'ap-southeast-3'
  | 'ap-southeast-4'
  | 'ap-south-1'
  | 'ap-northeast-3'
  | 'ap-northeast-2'
  | 'ap-southeast-1'
  | 'ap-southeast-2'
  | 'ap-northeast-1'
  | 'ca-central-1'
  | 'eu-central-1'
  | 'eu-west-1'
  | 'eu-west-2'
  | 'eu-south-1'
  | 'eu-west-3'
  | 'eu-south-2'
  | 'eu-north-1'
  | 'eu-central-2'
  | 'me-south-1'
  | 'me-central-1'
  | 'sa-east-1'
  | 'us-gov-east-1'
  | 'us-gov-west-1';

export const awsRegions: AWS_REGION[] = [
  'us-east-2',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-2',
  'ap-southeast-3',
  'ap-southeast-4',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-south-1',
  'eu-west-3',
  'eu-south-2',
  'eu-north-1',
  'eu-central-2',
  'me-south-1',
  'me-central-1',
  'sa-east-1',
  'us-gov-east-1',
  'us-gov-west-1',
];

export type AwsResource<T> = {
  Resources?: Record<string, T>;
};

export type ServerlessConfig = {
  service: string;
  resources: string[];
  useDotenv: boolean;
  provider: {
    name: 'aws';
    deploymentMethod?: 'direct';
    runtime: string;
    stage: string;
    region: AWS_REGION;
    iam: Record<string, string>;
    environment: Record<string, unknown>;
  };
  plugins: string[];
  functions: string | Record<string, unknown>;
  package: {
    individually: boolean;
    includeModules: boolean;
    patterns: string[];
  };
  custom: {
    modules?: Record<string, unknown>;
    appSync?: string;
  } & Record<string, unknown>;
};

export type ServerlessConfigInput = {
  service?: string;
  resources?: string[];
  useDotenv?: boolean;
  provider?: {
    name?: 'aws';
    deploymentMethod?: 'direct';
    runtime?: string;
    stage?: string;
    region?: AWS_REGION;
    iam?: Record<string, string>;
    environment?: Record<string, unknown>;
  };
  plugins?: string[];
  functions?: string | Record<string, unknown>;
  package?: {
    individually?: boolean;
    includeModules?: boolean;
    patterns?: string[];
  };
  custom?: {
    modules?: Record<string, unknown>;
  } & Record<string, unknown>;
};

export type ServerlessFunctionsYaml = Record<
  string,
  {
    handler: string;
    name: string;
    memorySize: number;
    timeout: number;
  }
>;

export type ServerlessFunctionsYamlInput = {
  handler?: string;
  name?: string;
  memorySize?: number;
  timeout?: number;
};
export type GraphqlApiType = 'Mutation' | 'Query' | 'Subscription';

export type AppSyncResolverType = 'UNIT' | 'PIPELINE';

export type AppSyncDataSourceType = 'AMAZON_DYNAMODB' | 'RELATIONAL_DATABASE' | 'AMAZON_ELASTICSEARCH' | 'AWS_LAMBDA' | 'HTTP';
export type AppSyncDataSource = {
  type: AppSyncDataSourceType;
  name: string;
  description: string;
  config: Record<string, unknown>;
};

export type AppSyncMappingTemplate = {
  type: GraphqlApiType;
  field: string;
  request: string;
  response: string;
  dataSource?: string;
  kind?: AppSyncResolverType;
  functions?: string[];
};

export type AppSyncFunctionConfiguration = {
  dataSource: string;
  name: string;
  request: string;
  response: string;
};

export type AppSyncStack = {
  mappingTemplatesLocation: string;
  functionConfigurationsLocation: string;
  functionConfigurations: AppSyncFunctionConfiguration[];
  dataSources: AppSyncDataSource[];
  mappingTemplates: AppSyncMappingTemplate[];
  schema: GraphqlAnalyzer;
};

export type AppSyncStackConfig = {
  mappingTemplatesLocation: string;
  functionConfigurationsLocation: string;
  functionConfigurations: string[];
  dataSources: string[];
  mappingTemplates: string[];
  schema: string | string[];
};
