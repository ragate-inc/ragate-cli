import path from 'path';
import Logger from 'utils/logger';
import { chalk } from 'yargonaut';
import { AWS_REGION, AwsResource, ServerlessConfig, ServerlessConfigInput, ServerlessFunctionsYaml, ServerlessFunctionsYamlInput } from 'types/index';
import _ from 'lodash';
import { loadYaml, writeYaml } from 'utils/yaml';
import Parser from 'utils/parser';
import CodeService from 'services/codeService';
import { pino } from 'pino';

export default class {
  constructor(args: { serverlessConfigPath: string; region: AWS_REGION; lang: string }) {
    this.logger = Logger.getLogger();
    this._serverlessConfigPath = args.serverlessConfigPath;
    this._lang = args.lang;
    this._defaultFunctionYamlPath = `serverless/${args.region}/resources/functions.yml`;
    try {
      const doc: ServerlessConfig = loadYaml(this.serverlessConfigPath);
      this._serverlessConfig = doc;
      if (_.isString(doc.functions)) {
        const functionsFilePath = Parser.parseSlsRecursivelyReference(doc.functions) as string;
        this._functionsYamlPath = functionsFilePath;
      }
      this._region = doc.provider.region ?? args.region;
    } catch (e) {
      this._region = args.region;
    }
    this._isExistsServelessConfig = this.getIsExistsServelessConfig(this.serverlessConfigPath);
  }

  private readonly defaultLambdaTimeOut: number = 30;
  private readonly defaultMemorySize: number = 1024;
  private readonly logger: pino.Logger;

  private readonly _isExistsServelessConfig: boolean;
  public get isExistsServelessConfig() {
    return this._isExistsServelessConfig;
  }

  private readonly _lang: string;
  private get lang() {
    return this._lang;
  }

  private readonly _defaultFunctionYamlPath: string;
  private get defaultFunctionYamlPath() {
    return this._defaultFunctionYamlPath;
  }

  private readonly _region?: AWS_REGION;
  public get region() {
    return this._region;
  }

  private readonly _serverlessConfigPath: string;
  public get serverlessConfigPath() {
    return this._serverlessConfigPath;
  }

  private readonly _functionsYamlPath?: string;
  private get functionsYamlPath() {
    return this._functionsYamlPath;
  }

  private readonly _serverlessConfig?: ServerlessConfig;
  public get serverlessConfig() {
    return this._serverlessConfig;
  }

  /**
   * Whether or not the serverlessConfigService process can be executed
   * @returns boolean
   */
  private cannotProces(): boolean {
    const logger = this.logger;
    if (!this.isExistsServelessConfig) {
      logger.warn('not found serverless config file, skip update');
      logger.warn(`please check a input path : ${this.serverlessConfigPath}`);
      return true;
    }
    if (_.isEmpty(this.region)) {
      logger.warn('not found region property, skip update');
      logger.warn(`please check a input path : ${this.serverlessConfigPath}`);
      return true;
    }
    return false;
  }

  /**
   * Adding Cloudformation Resources
   * @param args
   * @returns
   */
  public addResource = (args: { filePath: string; resourceName: string; cf: Record<string, unknown> }): void => {
    if (this.cannotProces()) return;
    const logger = this.logger;
    const { filePath, resourceName, cf } = args;
    // update serverless.yml
    const updateServerlessYaml = () => {
      const doc: ServerlessConfig = loadYaml(this.serverlessConfigPath) ?? {};
      const destinationPath = path.join('./', filePath);
      const resources = doc.resources ?? [];
      if (resources.some((v) => v.includes(destinationPath))) {
        logger.warn(`already exists resource file path : ${destinationPath}`);
      } else {
        resources.push(`\${file(./${destinationPath})}`);
        const yamlText = writeYaml(this.serverlessConfigPath, {
          ...doc,
          resources,
        });
        logger.info(destinationPath);
        logger.info(chalk().green(yamlText));
      }
    };
    // update cloudformation yaml
    const updateCloudFormationYaml = () => {
      try {
        const doc = loadYaml<AwsResource<Record<string, unknown>>>(filePath) ?? {};
        if (_.has(doc, `Resources.${resourceName}`)) {
          logger.warn(`resource name : ${resourceName}`);
          logger.warn(`already exists resource file path : ${filePath}`);
        } else {
          const yamlText = writeYaml(filePath, {
            ...doc,
            Resources: {
              ...doc.Resources,
              ...cf,
            },
          });
          logger.info(filePath);
          logger.info(`over right : ${filePath}`);
          logger.info(chalk().green(yamlText));
        }
      } catch (e) {
        const yamlText = writeYaml(filePath, {
          Resources: {
            ...cf,
          },
        });
        logger.info(`created yaml file : ${filePath}`);
        logger.info(chalk().green(yamlText));
      }
    };
    updateServerlessYaml();
    updateCloudFormationYaml();
  };

  /**
   * Adding Lambda Functions
   * @param input
   * @returns
   */
  public addFunction = (input: { lambdaFunctionName: string; lambdaHandler: string; memorySize?: number; timeout?: number; code: string }) => {
    if (this.cannotProces()) return;
    const { lambdaFunctionName, lambdaHandler, memorySize, timeout, code } = input;
    const logger = this.logger;
    logger.debug(`functionsYamlPath', functionsYamlPath`);
    // update serverless.yml
    const updateServerlessYaml = () => {
      const serverlessConfig: ServerlessConfig = loadYaml(this.serverlessConfigPath) ?? {};
      if (_.isEmpty(serverlessConfig.functions)) {
        const yamlText = writeYaml(this.serverlessConfigPath, {
          ...serverlessConfig,
          functions: `\${file(./${this.defaultFunctionYamlPath})}`,
        });
        logger.info('write functions property');
        logger.info(chalk().green(yamlText));
      }
    };
    // update functions.yml
    const updateCloudFormationYaml = () => {
      const functionsYamlPath: string = this.functionsYamlPath ?? this.defaultFunctionYamlPath;
      try {
        const doc = loadYaml<ServerlessFunctionsYaml>(functionsYamlPath) ?? {};
        if (_.has(doc, lambdaFunctionName)) {
          logger.warn(`already exists lambda function at, skip update : ${lambdaFunctionName}`);
        } else {
          const yamlText = writeYaml(functionsYamlPath, {
            ...doc,
            ...this.generateFunctionYamlProperty(lambdaFunctionName, {
              handler: lambdaHandler,
              memorySize: memorySize ?? this.defaultMemorySize,
              timeout: timeout ?? this.defaultLambdaTimeOut,
            }),
          });
          logger.info('write functions property');
          logger.info(chalk().green(yamlText));
        }
      } catch (e) {
        const yamlText = writeYaml(functionsYamlPath, {
          ...this.generateFunctionYamlProperty(lambdaFunctionName, {
            handler: lambdaHandler,
            memorySize: memorySize ?? this.defaultMemorySize,
            timeout: timeout ?? this.defaultLambdaTimeOut,
          }),
        });
        logger.info('write functions property');
        logger.info(chalk().green(yamlText));
      }
    };
    // write a function handler file (typescript)
    const createHandlerFile = () => {
      new CodeService({ handlerPath: lambdaHandler, code }).write();
    };
    updateServerlessYaml();
    updateCloudFormationYaml();
    createHandlerFile();
  };

  private generateFunctionYamlProperty = (resourceName: string, input?: ServerlessFunctionsYamlInput): ServerlessFunctionsYaml => {
    return {
      [resourceName]: {
        handler: input?.handler ?? 'index.handler',
        name: input?.name ?? resourceName,
        memorySize: input?.memorySize ?? this.defaultMemorySize,
        timeout: input?.timeout ?? this.defaultLambdaTimeOut,
      },
    };
  };

  private getIsExistsServelessConfig(filePath: string): boolean {
    if (_.isEmpty(filePath)) {
      this.logger.warn('not found serverless config file, skip update');
      this.logger.warn(`please check a input path : ${filePath}`);
      return false;
    }
    try {
      loadYaml<ServerlessConfig>(filePath) ?? {};
      return true;
    } catch (e) {
      this.logger.warn('not found serverless config file, skip update');
      this.logger.warn(`please check a input path : ${filePath}`);
      return false;
    }
  }

  public static generateServerlessConfig = (config?: ServerlessConfigInput) => {
    return {
      service: config?.service ?? 'starter',
      useDotenv: config?.useDotenv ?? true,
      provider: {
        name: config?.provider?.name ?? 'aws',
        runtime: config?.provider?.runtime ?? 'nodejs18.x',
        stage: config?.provider?.stage ?? '${opt:stage}',
        region: config?.provider?.region ?? 'ap-northeast-1',
        iam: {
          role: config?.provider?.iam?.role ?? 'DefaultLambdaRole',
        },
        environment: {
          STAGE: config?.provider?.environment?.STAGE ?? '${self:provider.stage}',
          REGION: config?.provider?.environment?.REGION ?? '${self:provider.region}',
          AWS_RESOURCE_PRIFIX: config?.provider?.environment?.AWS_RESOURCE_PRIFIX ?? '${self:custom.awsResourcePrefix}',
          LOG_LEVEL: config?.provider?.environment?.LOG_LEVEL ?? 'INFO',
        },
      },
      plugins: config?.plugins ?? ['serverless-webpack', 'serverless-prune-plugin'],
      functions: config?.functions ?? '${file(./serverless/ap-northeast-1/resources/functions.yml)}',
      resources: config?.resources ?? [],
      package: {
        individually: config?.package?.individually ?? true,
        includeModules: config?.package?.includeModules ?? true,
        patterns: config?.package?.patterns ?? ['!appsync/*,*', '!node_modules/**', '!resources/**', '!__tests__/**', '!.git/**', '!tmp/**'],
      },
      custom: {
        awsResourcePrefix: config?.custom?.awsResourcePrefix ?? '${self:service}-${self:provider.stage}-',
        webpack: config?.custom?.webpack ?? {
          includeModules: true,
          packager: 'npm',
        },
        prune: config?.custom?.prune ?? {
          automatic: true,
          number: 3,
        },
      },
    };
  };
}
