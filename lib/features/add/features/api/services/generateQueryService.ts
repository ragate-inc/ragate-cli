import Logger from 'utils/logger';
import ServerlessConfigService from 'services/serverlessConfigService';
import * as Type from 'features/add/features/api/types/';
import AppSyncStackService from 'services/appSyncStackService';

export default async (args: { appSyncStackService: AppSyncStackService; lang: string; slsConfig: ServerlessConfigService; info: Type.PromptApiInfo }): Promise<void> => {
  const { appSyncStackService: appSyncStack } = args;
  const logger = Logger.getLogger();
  logger.debug(`appsyncStack : ${JSON.stringify(appSyncStack)}`);

  /**
   * ### Queryの場合
   * データソース選択
   * 適用するVTLテンプレートを選択 Query | QueryWithGSI | LocalResolver
   * resolver.vtl作成
   * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）
   * customMappingtemplate.ymlをstack.ymlへ書き込み
   * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）
   * schema.graphqlは、customSchema.graphqlを指定すること（存在しない場合は新規作成）
   * customSchema.graphqlをstack.ymlへ書き込み
   * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
   */
};
