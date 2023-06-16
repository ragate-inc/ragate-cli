import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig, ServerlessFunctionsYaml } from 'types/index';
import yargs from 'yargs';
import inquirer from 'inquirer';
import * as Type from 'features/codegen/features/crud/types/';
import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import fs from 'fs';
import * as graphql from 'graphql';
import _ from 'lodash';
import ServerlessConfigService from 'services/serverlessConfigService';
import Parser from 'utils/parser';
import { loadYaml, writeYaml } from 'utils/yaml';
import TablePrompt from 'utils/inquirer/tablePrompt';
import { isFileExists } from 'utils/cli';
import CodeService from 'services/codeService';
import questions from 'features/codegen/features/crud/utils/questions/';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
    inquirer.registerPrompt('table', TablePrompt as unknown as inquirer.prompts.PromptConstructor);
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  private getSchemaGraphql(schema: string | string[]): string {
    return _.chain(schema)
      .thru((schema) => {
        if (_.isString(schema)) {
          return [schema];
        }
        return schema;
      })
      .map((schema) => {
        return fs.readFileSync(schema).toString();
      })
      .join('\n')
      .value();
  }

  private buildSchemaGraphqlInfo(schemaGraphql: string): Type.SchemaGraphqlInfo {
    const schemaGraphqlInfo: Type.SchemaGraphqlInfo = [];
    const parsedData = graphql.parse(schemaGraphql);
    graphql.visit(parsedData, {
      enter(node) {
        if (node.kind === 'ObjectTypeDefinition' && (node.name.value === 'Query' || node.name.value === 'Mutation')) {
          _.each(node.fields, (field) => {
            schemaGraphqlInfo.push({
              type: node.name.value,
              name: field.name.value,
              arguments: _.map(field.arguments, (argument) => {
                return {
                  name: argument.name.value,
                  type: _.get(argument, 'type.type.name.value', _.get(argument, 'type.name.value', 'other')),
                  nonnull: argument.type.kind === graphql.Kind.NON_NULL_TYPE,
                };
              }),
              returnValue: _.get(field, 'type.type.name.value', _.get(field, 'type.name.value', 'other')),
            });
          });
        }
      },
    });
    return schemaGraphqlInfo;
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

    const schemaGraphql = this.getSchemaGraphql(appSyncStackConfig.schema);
    const schemaGraphqlInfo = this.buildSchemaGraphqlInfo(schemaGraphql);

    const resolverMappings = await inquirer
      .prompt([questions.resolverInfo(this.lang, schemaGraphqlInfo)])
      .then((tablePromptAnswer: Type.TablePromptAnswer) => {
        return _.reduce(
          tablePromptAnswer.resolverInfo,
          (acc, cur, idx) => {
            const [resolver, type] = _.split(cur, ',');
            acc[resolver as 'vtl' | 'lambda'].push({
              resolver,
              type,
              name: schemaGraphqlInfo[idx].name,
              returnValue: schemaGraphqlInfo[idx].returnValue,
            });
            return acc;
          },
          { vtl: [], lambda: [] } as Type.ResolverMappings
        );
      })
      .then(async (resolverMappings: Type.ResolverMappings) => {
        const vtlGetters = _.filter(resolverMappings.vtl, (vtl) => vtl.type === 'get');
        // 一つずつ質問するのでfor文を使う
        for (let i = 0; i < vtlGetters.length; i++) {
          const answer = (await inquirer.prompt([questions.type])) as { type: string };
          vtlGetters[i].type = answer.type;
        }
        return resolverMappings;
      });

    if (_.isArray(appSyncStackConfig.dataSources))
      _.each(appSyncStackConfig.dataSources, (dataSource) => {
        if (!_.includes(dataSource, 'datasources.yml')) return;
        const filePath = Parser.parseSlsRecursivelyReference(dataSource) as string;
        const yml = loadYaml<Record<string, Type.AppSyncV2.DataSource>>(filePath);
        _.each(resolverMappings.lambda, (api) => {
          const functionName = _.upperFirst(api.name);
          const lambdaFunctionName = `${functionName}LambdaFunction`;
          yml[lambdaFunctionName] = {
            ...yml[lambdaFunctionName],
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
        const yml = loadYaml<Record<string, Type.AppSyncV2.PipelineFunction>>(filePath);
        // vtl
        _.each(resolverMappings.vtl, (vtl) => {
          const functionName = _.upperFirst(vtl.name);
          const dataSourceName = yml[functionName]?.dataSource || 'YourDataSourceName';
          const filePath = `appsync/resolvers/functions/Query.${functionName}.request`;
          if (!isFileExists(`${filePath}.vtl`)) {
            const code = (() => {
              switch (vtl.type) {
                case 'get':
                  return CodeService.templates.vtl.codegenDynamoGetItemRequest;
                case 'none':
                  return CodeService.templates.vtl.localResolverRequest;
                case 'query':
                  return CodeService.templates.vtl.codegenDynamoQueryRequest;
                default:
                  return '';
              }
            })();
            new CodeService({ filePath, code, type: 'vtl' }).write();
          }
          yml[functionName] = {
            ...yml[functionName],
            dataSource: dataSourceName,
            request: `${filePath}.vtl`,
            response: `appsync/resolvers/common/resolver.response.vtl`,
          };
        });
        // lambda
        _.each(resolverMappings.lambda, (lambda) => {
          const functionName = _.upperFirst(lambda.name);
          const lambdaFunctionName = `${functionName}LambdaFunction`;
          yml[functionName] = {
            ...yml[functionName],
            dataSource: lambdaFunctionName,
          };
        });
        writeYaml(filePath, yml);
      });

    if (_.isArray(appSyncStackConfig.resolvers))
      _.each(appSyncStackConfig.resolvers, (resolver) => {
        if (!_.includes(resolver, 'resolvers.yml')) return;
        const filePath = Parser.parseSlsRecursivelyReference(resolver) as string;
        const yml = loadYaml<Record<string, Type.AppSyncV2.Resolver>>(filePath);
        // vtl
        _.each(resolverMappings.vtl, (vtl) => {
          const keyName = `Query.${vtl.name}`;
          const filePath = `appsync/resolvers/queries/${vtl.name}.request`;
          const responseVtlFilename = `appsync/resolvers/common/pipeline.after.vtl`;
          const functionName = _.upperFirst(vtl.name);
          new CodeService({ filePath, code: CodeService.templates.vtl.pipelineBefore, type: 'vtl' }).write();
          yml[keyName] = {
            ...yml[keyName],
            request: `${filePath}.vtl`,
            response: responseVtlFilename,
            functions: [functionName],
          };
        });
        // lambda
        _.each(resolverMappings.lambda, (lambda) => {
          const keyName = `Mutation.${lambda.name}`;
          const functionName = _.upperFirst(lambda.name);
          yml[keyName] = {
            ...yml[keyName],
            functions: [functionName],
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

    const functionsConfig = loadYaml<ServerlessFunctionsYaml>(functionsPath);
    _.each(resolverMappings.lambda, (lambda) => {
      const functionName = _.upperFirst(lambda.name);
      const filePath = `src/functions/appsync/${lambda.name}`;
      const handler = `${filePath}.handler`;
      const name = `\${self:custom.awsResourcePrefix}${functionName}`;
      const code = (() => {
        if (!_.includes(['create', 'update', 'delete'], lambda.type)) return CodeService.templates.typescript.skeleton;
        else return CodeService.templates.typescript[lambda.type as 'create' | 'update' | 'delete'](`${functionName}MutationVariables`, lambda.returnValue as string);
      })();
      new CodeService({ filePath, code, type: 'typescript' }).write();
      functionsConfig[functionName] = {
        ...functionsConfig[functionName],
        handler,
        name,
      };
    });
    writeYaml(functionsPath, functionsConfig);
  }
}
