import { Locale } from 'features/create/types/index';

const locale: Locale = {
  error: {
    alreadyExistsDirectory: 'already exists directory',
    unProcessed: 'The command entered does not exist. Run "ragate create help" for a list of all available commands.',
  },
  inquirer: {
    template: {
      choiceTemplate: 'Choose a project template',
      autocomplete: {
        emptyText: 'No result',
      },
    },
  },
};

export default locale;
