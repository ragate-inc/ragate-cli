import { LocaleLang } from 'types/index';

const locale: LocaleLang = {
  usage: '使い方',
  help: 'ヘルプを表示',
  version: 'バージョンを表示',
  yourInput: '入力されたコマンド',
  command: {
    description: {
      create: 'プロジェクトを作成',
      add: 'AWSリソースの追加',
    },
  },
  describe: {
    verbose: '詳細なログを出力',
    template: 'プロジェクトの雛形',
  },
  unProcessed: {
    required: 'コマンドを入力してください。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
    notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
  },
};
export default locale;
