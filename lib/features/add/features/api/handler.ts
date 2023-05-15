import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig, AppSyncStack } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { loadYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/api/utils/getLocale';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';
import * as Type from 'features/add/features/api/types/';
import { isFileExists } from 'utils/cli';
import Parser from 'utils/parser';
import path from 'path';
import config from 'config';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private get defaultSchemeGrapqlFilePath(): string {
    return `appsync/schema.graphql`;
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  private runMutationPrompts(appsyncStack: AppSyncStack): void {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);
    logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);
    logger.debug('TODO runMutationPrompts');

    /**
     * ### Mutationの場合
     * データソース選択または新規にLambda生成を選択
     * functions.yml更新
     * dataSource.yml更新
     * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）
     * customMappingtemplate.ymlをstack.ymlへ書き込み
     * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）
     * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
     * customScheme.graphqlをstack.ymlへ書き込み
     * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
     */
  }

  private runQueryPrompts(appsyncStack: AppSyncStack): void {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);
    logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);
    logger.debug('TODO runQueryPrompts');

    /**
     * ### Queryの場合
     * データソース選択
     * 適用するVTLテンプレートを選択 Query | QueryWithGSI | LocalResolver
     * resolver.vtl作成
     * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）
     * customMappingtemplate.ymlをstack.ymlへ書き込み
     * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）
     * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
     * customScheme.graphqlをstack.ymlへ書き込み
     * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
     */
  }

  private runGetItemPrompts(appsyncStack: AppSyncStack): void {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);
    logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);
    logger.debug('TODO runGetItemPrompts');

    /**
     * ### Getの場合
     * データソース選択
     * Getの場合、適用するVTLテンプレートを選択 GetItem | GetItemConsistentRead | LocalResolver
     * resolver.vtl作成
     * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）
     * customMappingtemplate.ymlをstack.ymlへ書き込み
     * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）
     * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
     * customScheme.graphqlをstack.ymlへ書き込み
     * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
     */
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);

    const info = (await inquirer.prompt([
      {
        type: 'input',
        name: 'apiName',
        message: 'API名を入力',
        filter: (input: string) => input.replace(/\s+/g, ''),
        transformer: (input: string) => input.replace(/\s+/g, ''),
        validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
      },
      {
        type: 'list',
        name: 'apiType',
        choices: ['Mutation', 'Query'],
        message: 'APIタイプを選択',
        validate: (value: string) => new Validator(value, this.lang).required().value(),
      },
      {
        type: 'list',
        name: 'resolverType',
        choices: ['UNIT', 'PIPELINE'],
        message: 'リゾルバータイプを選択',
        validate: (value: string) => new Validator(value, this.lang).required().value(),
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
    ])) as Type.PromptApiInfo;

    logger.debug(`input info values : ${JSON.stringify(info)}}`);

    if (!isFileExists(path.join(config.currentPath, info.serverlessConfigPath))) {
      throw new Error('serverless.ymlが存在しません');
    }

    const slsConfig = loadYaml<ServerlessConfig>(info.serverlessConfigPath);

    if ((slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {
      throw new Error('serverless-appsync-pluginがインストールされていません');
    }

    const appSyncStackPath: string = Parser.parseSlsRecursivelyReference(slsConfig.custom?.appsync as string) as string;
    if (!_.isString(appSyncStackPath) || !_.isEmpty(Parser.parseSlsRecursivelyReference(appSyncStackPath))) {
      throw new Error('serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります。\n\n${file(./appsync/stack.yml)}');
    }

    const appSyncStack = Parser.parseAppSyncStack(appSyncStackPath);

    if (appSyncStack.mappingTemplates.some((m) => m.type === info.apiType && m.field === info.apiName)) {
      throw new Error('既にマッピングテンプレートに定義が存在します');
    }

    if (info.resolverType === 'PIPELINE' && appSyncStack.functionConfigurations.some((m) => m.name === `Mutation${info.apiName}`)) {
      throw new Error('既にリゾルバー関数がAPIが存在します');
    }

    if (info.apiType === 'Mutation') {
      if (appSyncStack.schema.isExistsMutationApi(info.apiName)) throw new Error('既にschemeにAPI定義が存在します');
      return this.runMutationPrompts(appSyncStack);
    }

    if (info.apiType === 'Query') {
      if (appSyncStack.schema.isExistsQueryApi(info.apiName)) throw new Error('既にschemeにAPI定義が存在します');
      const { operation } = (await inquirer.prompt([
        {
          type: 'list',
          name: 'operation',
          choices: ['Query', 'GetItem'],
          message: 'Queryのタイプを選択',
          validate: (value: string) => new Validator(value, this.lang).required().value(),
        },
      ])) as { operation: 'Query' | 'GetItem' };
      if (operation === 'Query') return this.runQueryPrompts(appSyncStack);
      if (operation === 'GetItem') return this.runGetItemPrompts(appSyncStack);
    }
  }
}
