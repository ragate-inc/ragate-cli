import { Locale } from 'features/create/types/index';

const locale: Locale = {
  error: {
    alreadyExistsDirectory: '既にディレクトリが存在します',
    unProcessed: '入力されたコマンドは存在しません。「ragate create help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
  },
  inquirer: {
    template: {
      choiceTemplate: 'プロジェクトの雛形を選択してください。',
      autocomplete: {
        emptyText: '該当するテンプレートが見つかりません',
      },
    },
  },
};

export default locale;
