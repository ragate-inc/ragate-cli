import { Locale } from 'lib/entry/types/index';

const locale: Locale = {
  usage: 'Usage',
  help: 'Show help',
  version: 'Show version',
  yourInput: 'your input',
  command: {
    description: {
      create: 'Create a new project',
      add: 'Add aws resouces',
    },
  },
  options: {
    describe: {
      verbose: 'Show verbose logs',
    },
  },
  unProcessed: {
    required: 'please input a command. Run "ragate help" for a list of all available commands.',
    notFound: 'The command entered does not exist. Run "ragate help" for a list of all available commands.',
  },
};

export default locale;
