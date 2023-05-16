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
  const { createDataSource } = (await inquirer.prompt([
    {
      type: 'expand',
      name: 'createDataSource',
      message: 'データソースを新しく作成しますか？',
      choices: [
        {
          key: 'y',
          name: 'yes',
          value: true,
        },
        {
          key: 'n',
          name: 'no',
          value: false,
        },
      ],
      filter: (input: string) => input.replace(/\s+/g, ''),
      transformer: (input: string) => input.replace(/\s+/g, ''),
      validate: (value: string) => new Validator(value, lang).required().value(),
    },
  ])) as { createDataSource: boolean };
  if (createDataSource) {
    const { lambdaFunctionName } = (await inquirer.prompt([
      {
        type: 'input',
        name: 'lambdaFunctionName',
        message: 'Lambda関数名を入力',
        filter: (input: string) => input.replace(/\s+/g, ''),
        transformer: (input: string) => input.replace(/\s+/g, ''),
        validate: (value: string) => new Validator(value, lang).required().mustNoIncludeZenkaku().value(),
      },
    ])) as { lambdaFunctionName: string };
  }

  /**
   * ### Mutationの場合
   * データソース選択または新規にLambda生成を選択
   * データソースがLambdaのとき、ロールがアタッチされていない場合は作成
   * functions.yml更新
   * dataSource.yml更新
   * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）
   * customMappingtemplate.ymlをstack.ymlへ書き込み
   * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）
   * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）
   * customScheme.graphqlをstack.ymlへ書き込み
   * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）
   */
};
