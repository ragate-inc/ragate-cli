import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig } from 'types/index';
import yargs from 'yargs';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';
import * as Type from 'features/codegen/features/crud/types/';
import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import * as fs from 'fs';
import * as graphql from 'graphql';
import _ from 'lodash';
import ServerlessConfigService from 'services/serverlessConfigService';
import Parser from 'utils/parser';
import { loadYaml, writeYaml } from 'utils/yaml';
import TablePrompt from 'utils/inquirer/tablePrompt';

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
    const schemaGraphqlInfo: Type.SchemaGraphqlInfo = {
      apiInfo: [],
    };
    const parsedData = graphql.parse(schemaGraphql);
    graphql.visit(parsedData, {
      enter(node) {
        if (node.kind === 'ObjectTypeDefinition' && (node.name.value === 'Query' || node.name.value === 'Mutation')) {
          _.each(node.fields, (field) => {
            schemaGraphqlInfo.apiInfo.push({
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

    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: locale.inquirer.serverlessConfigPath,
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => {
            return new Validator(value, this.lang).required().mustBeYamlFilePath().value();
          },
          transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
          filter: (input: string) => new Filter(input).removeAllSpace().value(),
        },
      ])
      .then(async (info: Type.ServerlessConfigPathPromptAnswer) => {
        const sls = new ServerlessConfigService({ region: this.argv.region as AWS_REGION, serverlessConfigPath: info.serverlessConfigPath, lang: this.lang });
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
        const apiTypeMapping = (
          (await inquirer.prompt([
            {
              type: 'table',
              name: 'apiInfo',
              message: locale.inquirer.apiInfo,
              columns: [
                { name: 'VTL(Get)', value: 'vtl,get' },
                { name: 'VTL(Query)', value: 'vtl,query' },
                { name: 'Lambda(Create)', value: 'lambda,create' },
                { name: 'Lambda(Update)', value: 'lambda,update' },
                { name: 'Lambda(Delete)', value: 'lambda,delete' },
              ],
              rows: _.map(schemaGraphqlInfo.apiInfo, (api) => {
                return {
                  name: api.name,
                  value: _.chain(api.name)
                    .thru((name) => {
                      const type = [
                        { name: 'get', value: 'vtl,get' },
                        { name: 'list', value: 'vtl,query' },
                        { name: 'create', value: 'lambda,create' },
                        { name: 'update', value: 'lambda,update' },
                        { name: 'delete', value: 'lambda,delete' },
                      ].find((type) => name.startsWith(type.name));
                      return type?.value;
                    })
                    .value(),
                };
              }),
              validate: (values: string[]) => new Validator(values, this.lang).required().value(),
            },
          ])) as Type.TablePromptAnswer
        ).apiInfo.reduce(
          (acc, cur, idx) => {
            const [resolver, type] = _.split(cur, ',');
            if (resolver === 'vtl') {
              acc.vtl.push({
                resolver,
                type,
                apiName: schemaGraphqlInfo.apiInfo[idx].name,
              });
            } else if (resolver === 'lambda') {
              acc.lambda.push({
                resolver,
                type,
                apiName: schemaGraphqlInfo.apiInfo[idx].name,
              });
            }
            return acc;
          },
          { vtl: [], lambda: [] } as { vtl: { resolver: string; type: string; apiName: string }[]; lambda: { resolver: string; type: string; apiName: string }[] }
        );

        if (_.isArray(appSyncStackConfig.dataSources))
          _.each(appSyncStackConfig.dataSources, (dataSource) => {
            if (!_.includes(dataSource, 'datasources.yml')) return;
            const filePath = Parser.parseSlsRecursivelyReference(dataSource) as string;
            const yml = loadYaml<Record<string, Type.AppSyncV2.DataSource>>(filePath);
            _.each(apiTypeMapping.lambda, (api) => {
              const functionName = api.apiName[0].toUpperCase() + api.apiName.slice(1);
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

        //saveYaml(appSyncStackPath, appSyncStackConfig);

        // _.each(mapping.apiInfo, (api) => {
        //   const [resolver, type] = _.split(api.type, ',');
        //   console.log(`${api.name} : ${resolver} - ${type}`);
        // });
        return apiTypeMapping;
      });

    // TODO: 自動生成処理を実装
    console.log('coming soon...');
  }
}
