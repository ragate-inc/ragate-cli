import config from 'config';
import yargs from 'yargs';
import { Logger } from 'pino';
import { getLocaleLang } from 'entry/utils/getLocale';
import { chalk } from 'utils/yargonaut';

export type Lang = 'ja' | 'en';

export abstract class FeatureHandlerAbstract {
  private readonly _argv: Record<string, unknown>;
  private readonly _logger: Logger;
  protected constructor(args: { argv: Record<string, unknown>; logger: Logger }) {
    const { argv, logger } = args;
    this._argv = argv;
    this._logger = logger;
  }
  protected get argv(): Record<string, unknown> {
    return this._argv;
  }
  protected get logger(): Logger {
    return this._logger;
  }
  public abstract run(): Promise<void>;
}

export abstract class FeatureBuilderAbstract {
  private readonly _lang;
  private readonly _locale;
  private readonly _npmVersion;
  private readonly _chalk;
  protected constructor() {
    this._chalk = chalk;
    this._lang = config.lang;
    this._locale = getLocaleLang(this.lang);
    this._npmVersion = config.npmVersion;
  }
  protected get lang() {
    return this._lang;
  }
  protected get locale() {
    return this._locale;
  }
  protected get npmVersion() {
    return this._npmVersion;
  }
  protected get chalk() {
    return this._chalk;
  }
  public abstract build(args: { yargs: yargs.Argv; logger: Logger }): yargs.Argv;
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
