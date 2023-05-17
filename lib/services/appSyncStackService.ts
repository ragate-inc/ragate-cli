import path from 'path';
import Logger from 'utils/logger';
import { loadYaml, writeYaml } from 'utils/yaml';
import GraphqlAnalyzer from 'utils/graphql/analyzer';
import _ from 'lodash';
import * as Type from 'types/index';
import fs from 'fs';
import config from 'config';
import Parser from 'utils/parser';
import ServerlessConfigService from 'services/serverlessConfigService';
import CfService from 'services/cloudformationService';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { pino } from 'pino';
import { chalk } from 'yargonaut';
import GraphqlEditor, { AddQueryFiledInput, AddMutationFieldInput } from 'utils/graphql/editor';

export default class {
  constructor(args: { stackFilePath: string; lang: string; region: string }) {
    this.logger = Logger.getLogger();
    this._stackFilePath = args.stackFilePath;
    this._lang = args.lang;
    this._region = args.region;
    this._defaultIamRolePath = `serverless/${args.region}/resources/iamrole/appsync.yml`;
    this._graphqlEditor = new GraphqlEditor();
    this.setAppSyncStackObject();
  }

  public _graphqlEditor: GraphqlEditor;
  public get graphqlEditor(): GraphqlEditor {
    return this._graphqlEditor;
  }

  public readonly appSyncDynamoDBRoleName: string = 'AppSyncDynamoDBRole';
  public readonly appSyncRDSRoleName: string = 'AppSyncRDSRole';
  public readonly appSyncOpenSearchRoleName: string = 'AppSyncOpenSearchRole';
  public readonly appSyncLambdaRoleName: string = 'AppSyncLambdaRole';

  private readonly defaultCustomDataSourcePath: string = 'appsync/custom_datasources.yml';
  private readonly defaultCustomMappingtemplatePath: string = 'appsync/custom_mappingtemplate.yml';
  private readonly defaultCustomFunctionConfigurationsPath: string = 'appsync/custom_functionConfigurations.yml';
  private readonly logger: pino.Logger;

  private readonly _defaultIamRolePath: string;
  private get defaultIamRolePath(): string {
    return this._defaultIamRolePath;
  }

  private _appSyncStack?: Type.AppSyncStack;
  public get appSyncStack(): Type.AppSyncStack | undefined {
    return this._appSyncStack;
  }

  private readonly _stackFilePath: string;
  private get stackFilePath(): string {
    return this._stackFilePath;
  }

  private readonly _lang: string;
  private get lang(): string {
    return this._lang;
  }

  private readonly _region: string;
  private get region(): string {
    return this._region;
  }

  private getAppSyncStackConfig(): Type.AppSyncStackConfig {
    const stackDoc = loadYaml<Type.AppSyncStackConfig>(this.stackFilePath);
    return {
      ...stackDoc,
      functionConfigurations: stackDoc.functionConfigurations ?? [],
      dataSources: stackDoc.dataSources ?? [],
      mappingTemplates: stackDoc.mappingTemplates ?? [],
      schema: stackDoc.schema ?? [],
    };
  }

  private setAppSyncStackObject(): void {
    const res = this.getAppSyncStackConfig();
    const { schema, dataSources, mappingTemplates, mappingTemplatesLocation, functionConfigurationsLocation, functionConfigurations } = res;
    this._appSyncStack = {
      mappingTemplatesLocation,
      functionConfigurationsLocation,
      functionConfigurations:
        _.chain(functionConfigurations)
          .map((p) => loadYaml<Type.AppSyncFunctionConfiguration>(Parser.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      dataSources:
        _.chain(dataSources)
          .map((p) => loadYaml<Type.AppSyncDataSource>(Parser.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      mappingTemplates:
        _.chain(mappingTemplates)
          .map((p) => loadYaml<Type.AppSyncMappingTemplate>(Parser.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      schema: _.chain(schema)
        .thru((value): string[] => {
          if (_.isString(value) && !_.isEmpty(value)) {
            const _schema: string = fs.readFileSync(path.join(config.currentPath, value), 'utf8');
            if (_.isEmpty(_schema)) return [];
            return [_schema];
          }
          if (_.isArray(value) && !_.isEmpty(value)) {
            return value
              .map((v): string => {
                const _schema: string = fs.readFileSync(path.join(config.currentPath, v), 'utf8');
                if (_.isEmpty(_schema)) return '';
                return _schema;
              })
              .filter((v) => !_.isEmpty(v));
          }
          return [];
        })
        .thru((schemas: string[]) => new GraphqlAnalyzer(schemas))
        .value(),
    };
  }

  public addDataSource(dataSource: Type.AppSyncDataSource) {
    // update custom_datasources.yml
    let isWrite = false;
    if (this.appSyncStack?.dataSources.some((p) => p.name === dataSource.name)) {
      this.logger.warn(`DataSource ${dataSource.name} is already exists.`);
      isWrite = false;
    } else {
      try {
        const dataSourceDoc: Type.AppSyncDataSource[] = loadYaml(this.defaultCustomDataSourcePath);
        const newDataSources: Type.AppSyncDataSource[] = [...dataSourceDoc, dataSource];
        const yamlText = writeYaml(this.defaultCustomDataSourcePath, newDataSources);
        this.logger.info(chalk().green(yamlText));
      } catch (e) {
        const yamlText = writeYaml(this.defaultCustomDataSourcePath, [dataSource]);
        this.logger.info(chalk().green(yamlText));
      }
      isWrite = true;
    }
    // update appsync stack yml
    if (isWrite) {
      const stackDoc = this.getAppSyncStackConfig();
      if (stackDoc.dataSources.every((str) => !str.includes(this.defaultCustomDataSourcePath))) {
        const yamlText = writeYaml(this.stackFilePath, {
          ...stackDoc,
          dataSources: [...stackDoc.dataSources, `\${file(./${this.defaultCustomDataSourcePath})}`],
        });
        this.logger.info(chalk().green(yamlText));
      }
    }
    this.setAppSyncStackObject();
  }

  public addMappingTemplate(args: { mappingTemplate: Type.AppSyncMappingTemplate }) {
    const { mappingTemplate } = args;
    // update custom_datasources.yml
    let isWrite = false;
    if (this.appSyncStack?.mappingTemplates.some((p) => p.type === mappingTemplate.type && p.field === mappingTemplate.field)) {
      this.logger.warn(`MappingTemplate ${mappingTemplate.type}.${mappingTemplate.field} is already exists.`);
      isWrite = false;
    } else {
      try {
        const mappingTemplateDoc: Type.AppSyncMappingTemplate[] = loadYaml(this.defaultCustomMappingtemplatePath);
        const newMappingTemplates: Type.AppSyncMappingTemplate[] = [...mappingTemplateDoc, mappingTemplate];
        const yamlText = writeYaml(this.defaultCustomMappingtemplatePath, newMappingTemplates);
        this.logger.info(chalk().green(yamlText));
      } catch (e) {
        const yamlText = writeYaml(this.defaultCustomMappingtemplatePath, [mappingTemplate]);
        this.logger.info(chalk().green(yamlText));
      }
      isWrite = true;
    }

    // TODO: VTLを生成すること
    console.log({
      request: mappingTemplate.request,
      response: mappingTemplate.response,
    });

    // update appsync stack yml
    if (isWrite) {
      const stackDoc = this.getAppSyncStackConfig();
      if (stackDoc.mappingTemplates.every((str) => !str.includes(this.defaultCustomMappingtemplatePath))) {
        const yamlText = writeYaml(this.stackFilePath, {
          ...stackDoc,
          mappingTemplates: [...stackDoc.mappingTemplates, `\${file(./${this.defaultCustomMappingtemplatePath})}`],
        });
        this.logger.info(chalk().green(yamlText));
      }
    }
    this.setAppSyncStackObject();
  }

  public addFunctionConfiguration(args: { functionConfiguration: Type.AppSyncFunctionConfiguration }) {
    const { functionConfiguration } = args;

    // update custom_datasources.yml
    let isWrite = false;

    if (this.appSyncStack?.functionConfigurations.some((p) => p.name === functionConfiguration.name)) {
      this.logger.warn(`FunctionConfiguration ${functionConfiguration.name} is already exists.`);
      isWrite = false;
    } else {
      try {
        const functionConfigurationDoc: Type.AppSyncFunctionConfiguration[] = loadYaml(this.defaultCustomFunctionConfigurationsPath);
        const newFunctionConfigurationDoc: Type.AppSyncFunctionConfiguration[] = [...functionConfigurationDoc, functionConfiguration];
        const yamlText = writeYaml(this.defaultCustomFunctionConfigurationsPath, newFunctionConfigurationDoc);
        this.logger.info(chalk().green(yamlText));
      } catch (e) {
        const yamlText = writeYaml(this.defaultCustomFunctionConfigurationsPath, [functionConfiguration]);
        this.logger.info(chalk().green(yamlText));
      }
      isWrite = true;
    }

    // TODO: VTLを生成すること
    console.log({
      request: functionConfiguration.request,
      response: functionConfiguration.response,
    });

    // update appsync stack yml
    if (isWrite) {
      const stackDoc = this.getAppSyncStackConfig();
      if (stackDoc.functionConfigurations.every((str) => !str.includes(this.defaultCustomFunctionConfigurationsPath))) {
        const yamlText = writeYaml(this.stackFilePath, {
          ...stackDoc,
          functionConfigurations: [...stackDoc.functionConfigurations, `\${file(./${this.defaultCustomFunctionConfigurationsPath})}`],
        });
        this.logger.info(chalk().green(yamlText));
      }
    }
    this.setAppSyncStackObject();
  }

  public updateCustomSchemeGraphl(args: { query?: AddQueryFiledInput; mutation?: AddMutationFieldInput }) {
    // update custom_scheme.graphql
    const callback = (updated: boolean, opt: { schemePath: string }): void => {
      if (updated) {
        // update appsync stack yml
        const { schemePath } = opt;
        const stackDoc = this.getAppSyncStackConfig();
        if (_.isString(stackDoc.schema) && !stackDoc.schema.includes(schemePath)) {
          const yamlText = writeYaml(this.stackFilePath, {
            ...stackDoc,
            schema: [stackDoc.schema, schemePath],
          });
          this.logger.info(chalk().green(yamlText));
        } else if (_.isArray(stackDoc.schema) && !stackDoc.schema.includes(schemePath)) {
          const yamlText = writeYaml(this.stackFilePath, {
            ...stackDoc,
            schema: [...stackDoc.schema, schemePath],
          });
          this.logger.info(chalk().green(yamlText));
        }
        this.setAppSyncStackObject();
      } else {
        this.logger.warn('skip update custom_scheme.graphql.');
      }
    };
    this.graphqlEditor.updateCustomSchemeGraphl({ ...args, callback });
  }

  public addIamRoleByDataSource(args: { dataSource: Type.AppSyncDataSourceType; sls: ServerlessConfigService }): void {
    const { dataSource, sls } = args;
    switch (dataSource) {
      case 'AMAZON_DYNAMODB':
        sls.addResource({
          resourceName: this.appSyncDynamoDBRoleName,
          filePath: this.defaultIamRolePath,
          cf: CfService.generateCloudFormation(this.appSyncDynamoDBRoleName, (c) => {
            const role = new iam.Role(c, this.appSyncDynamoDBRoleName, {
              assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            });
            role.addToPolicy(
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [cdk.Fn.join(':', ['arn:aws:dynamodb', this.region, cdk.Fn.ref('AWS::AccountId'), 'table/*'])],
                actions: ['dynamodb:*'],
              })
            );
            return role;
          }),
        });
        break;
      case 'RELATIONAL_DATABASE':
        sls.addResource({
          resourceName: this.appSyncRDSRoleName,
          filePath: this.defaultIamRolePath,
          cf: CfService.generateCloudFormation(this.appSyncRDSRoleName, (c) => {
            const role = new iam.Role(c, this.appSyncRDSRoleName, {
              assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            });
            role.addToPolicy(
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [cdk.Fn.join(':', ['arn:aws:rds', this.region, cdk.Fn.ref('AWS::AccountId'), 'secret:*'])],
                actions: ['rds-data:DeleteItems', 'rds-data:ExecuteSql', 'rds-data:ExecuteStatement', 'rds-data:GetItems', 'rds-data:InsertItems', 'rds-data:UpdateItems'],
              })
            );
            role.addToPolicy(
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [cdk.Fn.join(':', ['arn:aws:secretsmanager', this.region, cdk.Fn.ref('AWS::AccountId'), 'table/*'])],
                actions: ['secretsmanager:GetSecretValue'],
              })
            );
            return role;
          }),
        });
        break;
      case 'AMAZON_ELASTICSEARCH':
        sls.addResource({
          resourceName: this.appSyncOpenSearchRoleName,
          filePath: this.defaultIamRolePath,
          cf: CfService.generateCloudFormation(this.appSyncOpenSearchRoleName, (c) => {
            const role = new iam.Role(c, this.appSyncOpenSearchRoleName, {
              assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            });
            return role;
          }),
        });
        break;
      case 'AWS_LAMBDA':
        sls.addResource({
          resourceName: this.appSyncLambdaRoleName,
          filePath: this.defaultIamRolePath,
          cf: CfService.generateCloudFormation(this.appSyncLambdaRoleName, (c) => {
            const role = new iam.Role(c, this.appSyncLambdaRoleName, {
              assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            });
            role.addToPolicy(
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [cdk.Fn.join(':', ['arn:aws:lambda', this.region, cdk.Fn.ref('AWS::AccountId'), 'function:*'])],
                actions: ['lambda:invokeFunction'],
              })
            );
            return role;
          }),
        });
        break;
      case 'HTTP':
        sls.addResource({
          resourceName: 'AppSyncHttpRole',
          filePath: this.defaultIamRolePath,
          cf: CfService.generateCloudFormation('AppSyncHttpRole', (c) => {
            const role = new iam.Role(c, 'AppSyncHttpRole', {
              assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            });
            return role;
          }),
        });
        break;
      default:
        break;
    }
  }
}
