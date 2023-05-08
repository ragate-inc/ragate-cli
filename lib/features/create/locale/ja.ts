import { Locale } from 'features/create/types/index';

const locale: Locale = {
  error: {
    alreadyExistsDirectory: '既にディレクトリが存在します',
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
