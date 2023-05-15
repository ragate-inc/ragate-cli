import { Locale } from 'features/add/types/index';

const locale: Locale = {
  command: {
    description: {
      sns: 'add AWS SQS',
      sqs: 'add AWS SQS',
      basicAuthLambda: 'add AWS Basic lambda auth in us-east-1',
    },
  },
  unProcessed: 'The command entered does not exist. Run "ragate add help" for a list of all available commands.',
};

export default locale;
