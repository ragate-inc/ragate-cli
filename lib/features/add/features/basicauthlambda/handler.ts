import Logger from 'utils/logger';
import { AWS_REGION, AwsResource, FeatureHandlerAbstract, ServerlessConfig, ServerlessFunctionsYaml } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { loadYaml, generateCloudFormation, writeYaml, generateServerlessConfig, generateFunctionYamlProperty } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/basicauthlambda/utils/getLocale';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import transformer from 'utils/inquirer/transformer';
import filter from 'utils/inquirer/filter';
import { chalk } from 'yargonaut';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from 'aws-cdk-lib';
import parser from 'utils/parser';
import Code from 'utils/code';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  // lambda edge must be in us-east-1
  private readonly defaultServerlessConfigPath: string = `serverless/us-east-1/serverless.yml`;
  private readonly defaultFunctionYamlPath: string = `serverless/us-east-1/resources/functions.yml`;
  private readonly defaultIamRolePath: string = `serverless/us-east-1/resources/iam-role.yml`;
  private readonly defaultBasicLambdaPath: string = `src/functions/events/lambdaedge/basicAuth.handler`;
  private readonly defaultLambdaRoleName = 'DefaultLambdaRole';
  private readonly lambdaEdgeTimeout = 5;
  private readonly lambdaEdgeMemorySize = 128;

  private generateLambdaIamRoleCf(region: string) {
    return generateCloudFormation(this.defaultLambdaRoleName, (c) => {
      const role = new iam.Role(c, this.defaultLambdaRoleName, {
        assumedBy: new iam.ServicePrincipal('edgelambda.amazonaws.com'),
      });
      role.addToPolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [cdk.Fn.join(':', ['arn:aws:logs', cdk.Fn.ref('AWS::Region'), cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
          actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        })
      );
      role.addToPolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [cdk.Fn.join(':', ['arn:aws:logs', region, cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
          actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        })
      );
      return role;
    });
  }

  private get defaultServerlessConfig(): ServerlessConfig {
    return generateServerlessConfig({
      service: 'basic-lambda-auth',
      provider: {
        region: 'us-east-1',
        environment: {
          LOG_LEVEL: 'WARN',
        },
        iam: { role: this.defaultLambdaRoleName },
      },
      custom: {
        awsResourcePrefix: '${self:service}-${self:provider.region}-${self:provider.stage}-',
      },
      functions: `\${file(./${this.defaultFunctionYamlPath})}`,
      resources: [`\${file(./${this.defaultIamRolePath})}`],
    });
  }

  private writeIamRoleCf(roleCfPath: string, lamndaRoleName: string): void {
    const locale = getLocaleLang(this.lang);
    const logger = Logger.getLogger();
    try {
      const doc = loadYaml<AwsResource<Record<string, unknown>>>(roleCfPath) ?? {};
      if (_.hasIn(doc, `Resources.${lamndaRoleName}`)) {
        logger.info(`resource name : ${lamndaRoleName}`);
        logger.info(`already exists resource file path : ${roleCfPath}`);
        return;
      }
      const yamlText = writeYaml(roleCfPath, {
        ...doc,
        Resources: {
          ...doc.Resources,
          ...this.generateLambdaIamRoleCf(this.argv.region),
        },
      });
      logger.info(roleCfPath);
      logger.info(`${locale.overrightFile} : ${roleCfPath}`);
      logger.info(chalk().green(yamlText));
    } catch (e) {
      const yamlText = writeYaml(roleCfPath, this.generateLambdaIamRoleCf(this.argv.region));
      logger.info(`${locale.outputFile} : ${roleCfPath}`);
      logger.info(chalk().green(yamlText));
    }
  }

  private writeFunctionsYaml = (resourceName: string, yamlPath: string, lambdaHandler: string) => {
    const logger = Logger.getLogger();
    try {
      const doc = loadYaml<ServerlessFunctionsYaml>(yamlPath) ?? {};
      if (_.has(doc, resourceName)) return;
      const yamlText = writeYaml(yamlPath, {
        ...doc,
        ...generateFunctionYamlProperty(resourceName, {
          handler: lambdaHandler,
          memorySize: this.lambdaEdgeMemorySize,
          timeout: this.lambdaEdgeTimeout,
        }),
      });
      logger.info('write functions property');
      logger.info(chalk().green(yamlText));
    } catch (e) {
      const yamlText = writeYaml(yamlPath, {
        ...generateFunctionYamlProperty(resourceName, {
          handler: lambdaHandler,
          memorySize: this.lambdaEdgeMemorySize,
          timeout: this.lambdaEdgeTimeout,
        }),
      });
      logger.info('write functions property');
      logger.info(chalk().green(yamlText));
    }
  };

  private async prompt(): Promise<{ functionName: string; serverlessConfigPath: string; lamndaRoleCfPath: string; lamndaRoleName: string; lambdaHandler: string }> {
    const res = (await inquirer
      .prompt([
        {
          type: 'input',
          name: 'functionName',
          message: 'input a functions name',
          default: 'BasicAuth',
          validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
        {
          type: 'input',
          name: 'lamndaRoleCfPath',
          message: 'input a lambda iam role cloudformation path',
          default: () => this.defaultIamRolePath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
        {
          type: 'input',
          name: 'lambdaHandler',
          message: 'input a lambda handler path',
          default: () => this.defaultBasicLambdaPath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeExtension().value(),
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
        {
          type: 'input',
          name: 'lamndaRoleName',
          message: 'input a lambda iam role name',
          default: () => this.defaultLambdaRoleName,
          validate: (value: string) => new Validator(value, this.lang).required().value(),
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: 'input a serverless config file path',
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as { functionName: string; serverlessConfigPath: string; lamndaRoleCfPath: string; lamndaRoleName: string; lambdaHandler: string };
    return res;
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);

    const res = await this.prompt();
    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { functionName, serverlessConfigPath, lamndaRoleCfPath, lamndaRoleName, lambdaHandler } = res;

    try {
      const doc = loadYaml<ServerlessConfig>(serverlessConfigPath) ?? {};

      let functionsYamlPath = this.defaultFunctionYamlPath;

      if (doc.provider.region !== 'us-east-1') throw new Error('lambda edge must be in us-east-1');

      if (_.isEmpty(doc.functions)) {
        const yamlText = writeYaml(serverlessConfigPath, {
          ...doc,
          functions: `\${./file(${functionsYamlPath})}`,
        });
        logger.info('write functions property');
        logger.info(chalk().green(yamlText));
      } else if (_.isString(doc.functions)) {
        const filePath = parser.parseSlsRecursivelyReference(doc.functions);
        if (filePath) functionsYamlPath = filePath;
      } else if (_.isObject(doc.functions)) {
        if (Object.keys(doc.functions).every((k) => !k.includes(functionsYamlPath))) {
          const yamlText = writeYaml(serverlessConfigPath, {
            ...doc,
            functions: {
              ...doc.functions,
              ...generateFunctionYamlProperty(functionName, {
                handler: lambdaHandler,
                memorySize: this.lambdaEdgeMemorySize,
                timeout: this.lambdaEdgeTimeout,
              }),
            },
          });
          logger.info('write functions property');
          logger.info(chalk().green(yamlText));
        }
      }
      this.writeFunctionsYaml(functionName, functionsYamlPath, lambdaHandler);
      this.writeIamRoleCf(lamndaRoleCfPath, lamndaRoleName);
    } catch (e) {
      const yamlText = writeYaml(serverlessConfigPath, this.defaultServerlessConfig);
      logger.info(`${locale.outputFile} : ${serverlessConfigPath}`);
      logger.info(chalk().green(yamlText));
      this.writeFunctionsYaml(functionName, this.defaultFunctionYamlPath, lambdaHandler);
      this.writeIamRoleCf(lamndaRoleCfPath, lamndaRoleName);
    }

    new Code({ handlerPath: lambdaHandler, code: Code.templates.basicauthlambda }).write();
  }
}
