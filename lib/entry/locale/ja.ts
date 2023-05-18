import { Locale } from 'entry/types/index';

const locale: Locale = {
  help: 'ヘルプを表示',
  version: 'バージョンを表示',
  yourInput: '入力されたコマンド',
  command: {
    description: {
      create: 'プロジェクトを作成',
      add: 'AWSリソースの追加',
      codegen: 'ソースコード自動生成',
    },
  },
  options: {
    describe: {
      verbose: '詳細なログを出力',
      region: 'AWSリージョン',
      lang: '表示言語',
    },
  },
  unProcessed: {
    required: '指定のコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
    notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
  },
};

export default locale;
