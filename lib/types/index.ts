import config from 'config';
import yargs from 'yargs';
import { chalk } from 'utils/yargonaut';

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
