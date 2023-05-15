import { Locale } from 'features/add/types/index';

const locale: Locale = {
  command: {
    description: {
      sns: 'AWS SQSを追加',
      sqs: 'AWS SQSを追加',
      basicAuthLambda: 'us-east-1リージョンにBasic認証用のLambdaを追加',
    },
  },
  unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
};

export default locale;
