import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig } from 'types/index';
import yargs from 'yargs';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Transformer from 'utils/inquirer/transformer';
import Filter from 'utils/inquirer/filter';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from 'aws-cdk-lib';
import CodeService from 'services/codeService';
import YamlService from 'services/serverlessConfigService';
import CfService from 'services/cloudformationService';
import ServerlessConfigService from 'services/serverlessConfigService';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  // lambda edge must be in us-east-1
  private readonly defaultServerlessConfigPath: string = `serverless/us-east-1/serverless.yml`;
  private readonly defaultFunctionYamlPath: string = `serverless/us-east-1/resources/functions.yml`;
  private readonly defaultIamRolePath: string = `serverless/us-east-1/resources/iamrole/defaultLambdarole.yml`;
  private readonly defaultBasicLambdaPath: string = `src/functions/lambdaedge/basicAuth.handler`;
  private readonly defaultLambdaRoleName = 'DefaultLambdaRole';
  private readonly lambdaEdgeTimeout = 5;
  private readonly lambdaEdgeMemorySize = 128;

  private generateLambdaIamRoleCf(): Record<string, unknown> {
    return CfService.generateCloudFormation(this.defaultLambdaRoleName, (c) => {
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
          resources: [cdk.Fn.join(':', ['arn:aws:logs', this.argv.region, cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
          actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        })
      );
      return role;
    });
  }

  private get defaultServerlessConfig(): ServerlessConfig {
    return YamlService.generateServerlessConfig({
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

  private async prompt(): Promise<{ functionName: string; serverlessConfigPath: string; lamndaRoleCfPath: string; lamndaRoleName: string; lambdaHandler: string }> {
    const res = (await inquirer
      .prompt([
        {
          type: 'input',
          name: 'functionName',
          message: 'input a functions name',
          default: 'BasicAuth',
          validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
        {
          type: 'input',
          name: 'lamndaRoleCfPath',
          message: 'input a lambda iam role cloudformation path',
          default: () => this.defaultIamRolePath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
        {
          type: 'input',
          name: 'lambdaHandler',
          message: 'input a lambda handler path',
          default: () => this.defaultBasicLambdaPath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeExtension().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
        {
          type: 'input',
          name: 'lamndaRoleName',
          message: 'input a lambda iam role name',
          default: () => this.defaultLambdaRoleName,
          validate: (value: string) => new Validator(value, this.lang).required().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: 'input a serverless config file path',
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as { functionName: string; serverlessConfigPath: string; lamndaRoleCfPath: string; lamndaRoleName: string; lambdaHandler: string };
    return res;
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();

    const res = await this.prompt();
    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { functionName, serverlessConfigPath, lamndaRoleCfPath, lamndaRoleName, lambdaHandler } = res;

    const sls = new ServerlessConfigService({ region: this.argv.region as AWS_REGION, serverlessConfigPath, lang: this.lang });

    if (sls.region !== 'us-east-1') throw new Error('lambda edge must be in us-east-1');

    sls.addFunction({
      lambdaFunctionName: functionName,
      lambdaHandler: lambdaHandler,
      memorySize: this.lambdaEdgeMemorySize,
      timeout: this.lambdaEdgeTimeout,
      code: CodeService.templates.basicauthlambda,
    });

    sls.addResource({
      filePath: lamndaRoleCfPath,
      resourceName: lamndaRoleName,
      cf: this.generateLambdaIamRoleCf(),
    });
  }
}
