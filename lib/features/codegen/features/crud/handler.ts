import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig, ServerlessFunctionsYaml } from 'types/index';
import yargs from 'yargs';
import inquirer from 'inquirer';
import * as Type from 'features/codegen/features/crud/types/';
import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import _ from 'lodash';
import ServerlessConfigService from 'services/serverlessConfigService';
import Parser from 'utils/parser';
import { loadYaml, writeYaml } from 'utils/yaml';
import TablePrompt from 'utils/inquirer/tablePrompt';
import CodeService from 'services/codeService';
import questions from 'features/codegen/features/crud/utils/questions/';
import buildSchemaGraphqlInfo from './utils/buildSchemaGraphqlInfo';
import logger from 'utils/logger';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
    inquirer.registerPrompt('table', TablePrompt as unknown as inquirer.prompts.PromptConstructor);
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  public async run(): Promise<void> {
    const locale = getLocaleLang(this.lang);

    const serverlessConfigPath = await inquirer
      .prompt([questions.serverlessConfigPath(this.lang, this.defaultServerlessConfigPath)])
      .then(({ serverlessConfigPath }) => serverlessConfigPath as string);

    const sls = new ServerlessConfigService({
      region: this.argv.region as AWS_REGION,
      serverlessConfigPath: serverlessConfigPath,
      lang: this.lang,
    });
    if (!sls.isExistsServelessConfig) {
      throw new Error(locale.error.notFoundServerlessConfig);
    }

    const slsConfig = sls.serverlessConfig as ServerlessConfig;

    if (!(slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {
      throw new Error(locale.error.notInstalledAppSyncPlugin);
    }

    const appSyncStackPath: string = Parser.parseSlsRecursivelyReference(slsConfig.appSync as string) as string;

    if (_.isEmpty(appSyncStackPath)) {
      throw new Error(`${locale.error.invalidServerlessCustomAppSync} : \${file(./appsync/stack.yml)}`);
    }

    const appSyncStackConfig = loadYaml<Type.AppSyncV2.AppSyncStackConfig>(appSyncStackPath);
    if (_.isEmpty(appSyncStackConfig)) {
      throw new Error(`${locale.error.invalidServerlessCustomAppSync} : ${appSyncStackPath}`);
    }

    const schemaGraphqlInfo = buildSchemaGraphqlInfo(appSyncStackConfig.schema);

    const resolverMappings = await inquirer.prompt([questions.resolverInfo(this.lang, schemaGraphqlInfo.apiInfo)]).then((tablePromptAnswer: Type.TablePromptAnswer) => {
      return _.reduce(
        tablePromptAnswer.resolverInfo,
        (acc, cur, idx) => {
          const [resolver, type] = _.split(cur, ',');
          acc[resolver as 'vtl' | 'lambda'].push({
            resolver,
            type,
            name: schemaGraphqlInfo.apiInfo[idx].name,
            returnValue: schemaGraphqlInfo.apiInfo[idx].returnValue,
          });
          return acc;
        },
        { vtl: [], lambda: [] } as Type.ResolverMappings
      );
    });

    const relationMappings = await inquirer.prompt([questions.relationInfo(this.lang, schemaGraphqlInfo.relationInfo)]).then((tablePromptAnswer: Type.TablePromptAnswer) => {
      return _.reduce(
        tablePromptAnswer.relationInfo,
        (acc, cur, idx) => {
          acc.push({
            type: schemaGraphqlInfo.relationInfo[idx].type,
            field: schemaGraphqlInfo.relationInfo[idx].field,
            resolver: cur,
          });
          return acc;
        },
        [] as Type.RelationMappings
      );
    });

    if (_.isArray(appSyncStackConfig.dataSources))
      _.each(appSyncStackConfig.dataSources, (dataSource) => {
        if (!_.includes(dataSource, 'datasources.yml')) return;
        const filePath = Parser.parseSlsRecursivelyReference(dataSource) as string;
        const yml = loadYaml<Record<string, Type.AppSyncV2.DataSource>>(filePath) || {};
        _.each(resolverMappings.lambda, (lambda) => {
          const functionName = _.upperFirst(lambda.name);
          const lambdaFunctionName = `${functionName}LambdaFunction`;
          if (yml[lambdaFunctionName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          yml[lambdaFunctionName] = {
            type: 'AWS_LAMBDA',
            description: lambdaFunctionName,
            config: {
              functionName: functionName,
              lambdaFunctionArn: {
                'Fn::GetAtt': ['UpdatePostLambdaFunction', 'Arn'],
              },
              serviceRoleArn: {
                'Fn::GetAtt': ['AppSyncLambdaServiceRole', 'Arn'],
              },
            },
          };
        });
        writeYaml(filePath, yml);
      });

    if (_.isArray(appSyncStackConfig.pipelineFunctions))
      _.each(appSyncStackConfig.pipelineFunctions, (pipelineFunction) => {
        if (!_.includes(pipelineFunction, 'pipelineFunctions.yml')) return;
        const filePath = Parser.parseSlsRecursivelyReference(pipelineFunction) as string;
        const yml = loadYaml<Record<string, Type.AppSyncV2.PipelineFunction>>(filePath) || {};
        // vtl
        _.each(resolverMappings.vtl, (vtl) => {
          const functionName = _.upperFirst(vtl.name);
          if (yml[functionName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          const dataSourceName = yml[functionName]?.dataSource || 'YourDataSourceName';
          const filePath = `appsync/resolvers/functions/Query.${functionName}.request`;
          const code = (() => {
            switch (vtl.type) {
              case 'GetItem':
                return CodeService.templates.vtl.codegenDynamoGetItemRequest;
              case 'LocalResolver':
                return CodeService.templates.vtl.localResolverRequest;
              case 'Query':
                return CodeService.templates.vtl.codegenDynamoQueryRequest;
              default:
                return '';
            }
          })();
          new CodeService({ filePath, code, type: 'vtl' }).write();
          yml[functionName] = {
            dataSource: dataSourceName,
            request: `${filePath}.vtl`,
            response: `appsync/resolvers/common/resolver.response.vtl`,
          };
        });
        // lambda
        _.each(resolverMappings.lambda, (lambda) => {
          const functionName = _.upperFirst(lambda.name);
          if (yml[functionName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          const lambdaFunctionName = `${functionName}LambdaFunction`;
          console.log(`Add Lambda Function: ${lambdaFunctionName}`);
          yml[functionName] = {
            dataSource: lambdaFunctionName,
          };
        });
        writeYaml(filePath, yml);
      });

    if (_.isArray(appSyncStackConfig.resolvers))
      _.each(appSyncStackConfig.resolvers, (resolver) => {
        if (!_.includes(resolver, 'resolvers.yml')) return;
        const filePath = Parser.parseSlsRecursivelyReference(resolver) as string;
        const yml = loadYaml<Record<string, Type.AppSyncV2.Resolver>>(filePath) || {};
        // vtl
        _.each(resolverMappings.vtl, (vtl) => {
          const keyName = `Query.${vtl.name}`;
          if (yml[keyName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          const filePath = `appsync/resolvers/queries/${vtl.name}.request`;
          const responseVtlFilename = `appsync/resolvers/common/pipeline.after.vtl`;
          const functionName = _.upperFirst(vtl.name);
          new CodeService({ filePath, code: CodeService.templates.vtl.pipelineBefore, type: 'vtl' }).write();
          yml[keyName] = {
            request: `${filePath}.vtl`,
            response: responseVtlFilename,
            functions: [functionName],
          };
        });

        // lambda
        _.each(resolverMappings.lambda, (lambda) => {
          const keyName = `Mutation.${lambda.name}`;
          if (yml[keyName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          const functionName = _.upperFirst(lambda.name);
          const filePath = `appsync/resolvers/mutations/${lambda.name}.request`;
          const responseVtlFilename = `appsync/resolvers/common/pipeline.after.vtl`;
          new CodeService({ filePath, code: CodeService.templates.vtl.pipelineBefore, type: 'vtl' }).write();
          yml[keyName] = {
            request: `${filePath}.vtl`,
            response: responseVtlFilename,
            functions: [functionName],
          };
        });

        // relation
        _.each(relationMappings, (relation) => {
          const keyName = `${relation.type}.${relation.field}`;
          if (yml[keyName]) {
            logger.getLogger().warn('already exists *** ');
            return;
          }
          const filePath = `appsync/resolvers/relations/${relation.type}.${relation.field}.request`;
          const responseVtlFilename = `appsync/resolvers/common/resolver.response.vtl`;
          const code = (() => {
            switch (relation.resolver) {
              case 'GetItem':
                return CodeService.templates.vtl.codegenDynamoGetItemRequest;
              case 'LocalResolver':
                return CodeService.templates.vtl.localResolverRequest;
              case 'Query':
                return CodeService.templates.vtl.codegenDynamoQueryRequest;
              default:
                return '';
            }
          })();
          new CodeService({ filePath, code, type: 'vtl' }).write();
          yml[keyName] = {
            kind: 'UNIT',
            dataSource: 'YourDataSourceName',
            request: `${filePath}.vtl`,
            response: responseVtlFilename,
          };
        });
        writeYaml(filePath, yml);
      });

    // Lambda Functions
    if (!_.isString(slsConfig.functions)) {
      throw new Error(locale.error.notFoundFunctionsConfig);
    }

    const functionsPath: string = Parser.parseSlsRecursivelyReference(slsConfig.functions) as string;
    if (_.isEmpty(functionsPath)) {
      throw new Error(`${locale.error.notFoundFunctionsConfig} : \${file(./serverless/ap-northeast-1/resources/functions.yml)}`);
    }

    const functionsConfig = loadYaml<ServerlessFunctionsYaml>(functionsPath) || {};
    _.each(resolverMappings.lambda, (lambda) => {
      const functionName = _.upperFirst(lambda.name);
      if (functionsConfig[functionName]) {
        logger.getLogger().warn('already exists *** ');
        return;
      }
      const filePath = `src/functions/appsync/${lambda.name}`;
      const handler = `${filePath}.handler`;
      const name = `\${self:custom.awsResourcePrefix}${functionName}`;
      const code = (() => {
        if (!_.includes(['create', 'update', 'delete'], lambda.type)) return CodeService.templates.typescript.skeleton;
        else return CodeService.templates.typescript[lambda.type as 'create' | 'update' | 'delete'](`${functionName}MutationVariables`, lambda.returnValue as string);
      })();
      new CodeService({ filePath, code, type: 'typescript' }).write();
      functionsConfig[functionName] = {
        handler,
        name,
        memorySize: 1024,
        timeout: 30,
      };
    });
    writeYaml(functionsPath, functionsConfig);
  }
}
