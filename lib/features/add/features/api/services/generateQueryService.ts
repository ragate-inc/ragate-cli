import { AppSyncStack } from 'types/index';
import Logger from 'utils/logger';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import { getLocaleLang } from 'features/add/features/api/utils/getLocale';

export default async (args: { appSyncStack: AppSyncStack; lang: string }): Promise<void> => {
  const { appSyncStack, lang } = args;
  const locale = getLocaleLang(lang);
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
   * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
   * customScheme.graphqlをstack.ymlへ書き込み
   * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
   */
};
