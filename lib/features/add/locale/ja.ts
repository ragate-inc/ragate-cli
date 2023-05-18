import { Locale } from 'features/add/types/index';

const locale: Locale = {
  command: {
    description: {
      sns: 'AWS SQS を追加',
      sqs: 'AWS SQS を追加',
      basicAuthLambda: 'us-east-1 リージョンに Basic 認証用の Lambda を追加',
      api: 'Graphql API を追加',
    },
  },
  unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
};

export default locale;
