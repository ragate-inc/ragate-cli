import { Locale } from 'features/add/features/api/types/index';

const locale: Locale = {
  error: {
    notFoundServerlessConfig: 'serverless.ymlが存在しません',
    notInstalledAppSyncPlugin: 'serverless-appsync-pluginがインストールされていません',
    invalidServerlessCustomAppSync: 'serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります',
    alreadyExistsMappingTemplate: '既にマッピングテンプレートに定義が存在します',
    alreadyExistsResolver: '既にリゾルバーに定義が存在します',
    alreadyExistsAPI: '既にAPIに定義が存在します',
  },
  inquirer: {
    apiName: 'API名を入力',
    apiType: 'APIタイプを選択',
    resolverType: 'リゾルバータイプを選択',
    serverlessConfigPath: 'serverless.ymlのパスを入力',
    queryOperation: 'Queryのタイプを選択',
  },
  services: {
    common: {
      inquirer: {
        createDataSource: 'データソースを新しく作成しますか？',
        lambdaFunctionName: 'Lambda関数名を入力',
        lambdaHandler: 'Lambdaハンドラーのパスを入力',
        dataSource: 'データソースを選択',
        template: 'テンプレートを選択',
        primaryKeyName: 'プライマリーキー名を入力',
        sortKeyName: 'ソートキー名を入力',
        indexName: 'インデックス名を入力',
      },
      error: {
        notFoundDataSource: 'データソースが存在しません、データソースを作成する必要があります',
      },
    },
    generateQueryService: {
      inquirer: {
        gsiName: 'GSI名を入力',
      },
    },
  },
};

export default locale;
